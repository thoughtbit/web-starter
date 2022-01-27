import { rest } from 'msw';

import { APP_BASE_URL } from '@/constants';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type ProfileBody = {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
};

export const usersHandlers = [
  rest.get(`${APP_BASE_URL}/users`, (req, res, ctx) => {
    try {
      const user = req;
      const result = db.user.findMany({
        where: {
          teamId: {
            // @ts-ignore
            equals: user?.teamId,
          },
        },
      });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.patch<ProfileBody>(`${APP_BASE_URL}/users/profile`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const result = db.user.update({
        where: {
          id: {
            equals: user.id,
          },
        },
        data,
      });
      persistDb('user');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.delete(`${APP_BASE_URL}/users/:userId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { userId } = req.params;
      requireAdmin(user);
      const result = db.user.delete({
        where: {
          id: {
            // @ts-ignore
            equals: userId,
          },
          teamId: {
            equals: user.teamId,
          },
        },
      });
      persistDb('user');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),
];
