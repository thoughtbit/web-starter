import { rest } from 'msw';

import { APP_BASE_URL } from '@/constants';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type TeamBody = {
  name: string;
  description: string;
};

export const teamsHandlers = [
  rest.get(`${APP_BASE_URL}/team`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);

      const result = db.team.findFirst({
        where: {
          id: {
            equals: user.teamId,
          },
        },
      });

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.get(`${APP_BASE_URL}/teams`, (req, res, ctx) => {
    try {
      const result = db.team.getAll();
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.patch<TeamBody>(`${APP_BASE_URL}/team/:teamId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      requireAdmin(user);
      const result = db.team.update({
        where: {
          id: user.teamId,
        },
        data,
      });
      persistDb('team');

      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),
];
