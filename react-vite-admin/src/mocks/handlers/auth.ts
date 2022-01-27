import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { APP_BASE_URL } from '@/constants';

import { db, persistDb } from '../db';
import { authenticate, delayedResponse, hash, requireAuth } from '../utils';

type RegisterBody = {
  name: string,
  email: string,
  password: string;
  teamId?: string;
  teamName?: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  rest.post<RegisterBody>(`${APP_BASE_URL}/auth/register`, (req, res, ctx) => {
    try {
      const userObject = req.body;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        throw new Error('The user already exists');
      }

      let teamId;
      let role;

      if (!userObject.teamId) {
        const team = db.team.create({
          id: nanoid(),
          name: userObject.teamName ?? `${userObject.name} Team`,
          createdAt: Date.now(),
        });
        persistDb('team');
        teamId = team.id;
        role = 'ADMIN';
      } else {
        const existingTeam = db.team.findFirst({
          where: {
            id: {
              equals: userObject.teamId,
            },
          },
        });

        if (!existingTeam) {
          throw new Error('The team you are trying to join does not exist!');
        }
        teamId = userObject.teamId;
        role = 'USER';
      }

      db.user.create({
        ...userObject,
        id: nanoid(),
        createdAt: Date.now(),
        role,
        password: hash(userObject.password),
        teamId,
      });

      persistDb('user');

      const result = authenticate({
        email: userObject.email,
        password: userObject.password,
      });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message })
      );
    }
  }),

  rest.post<LoginBody>(`${APP_BASE_URL}/auth/login`, (req, res, ctx) => {
    try {
      const credentials = req.body;
      const result = authenticate(credentials);
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message })
      );
    }
  }),

  rest.get(`${APP_BASE_URL}/auth/me`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);

      return delayedResponse(ctx.json(user));
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message })
      );
    }
  }),
];
