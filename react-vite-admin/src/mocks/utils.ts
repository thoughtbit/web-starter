import jwt_decode from "jwt-decode";
import omit from 'lodash/omit';
import { RestRequest, createResponseComposition, context } from 'msw';

import { JWT_TOKEN } from '@/constants';

import { db } from './db';

const isTesting = process.env.NODE_ENV === 'test' || ((window as any).Cypress as any);

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

export const sanitizeUser = (user: any) => omit(user, ['password', 'iat']);

export function authenticate({ email, password }: { email: string; password: string }) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    return { user: sanitizedUser, jwt: JWT_TOKEN };
  }

  const error = new Error('Invalid username or password');
  throw error;
}

export function requireAuth(request: RestRequest) {
  try {
    const encodedToken = request.headers.get('authorization');
    if (!encodedToken) {
      throw new Error('No authorization token provided!');
    }
    // @ts-ignore
    const decodedToken = jwt_decode(JWT_TOKEN);

    const user = db.user.findFirst({
      where: {
        id: {
          // @ts-ignore
          equals: decodedToken?.id,
        },
      },
    });

    if (!user) {
      throw Error('Unauthorized');
    }

    return sanitizeUser(user);
  } catch (err: any) {
    throw new Error(err);
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized');
  }
}
