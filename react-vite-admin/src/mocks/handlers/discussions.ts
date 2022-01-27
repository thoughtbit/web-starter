import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { APP_BASE_URL } from '@/constants';

import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';

type DiscussionBody = {
  title: string;
  body: string;
};

export const discussionsHandlers = [
  rest.get(`${APP_BASE_URL}/discussions`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const result = db.discussion.findMany({
        where: {
          teamId: {
            equals: user.teamId,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.get(`${APP_BASE_URL}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { discussionId } = req.params;
      const result = db.discussion.findFirst({
        where: {
          id: {
            // @ts-ignore
            equals: discussionId,
          },
          teamId: {
            equals: user.teamId,
          },
        },
      });
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.post<DiscussionBody>(`${APP_BASE_URL}/discussions`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      requireAdmin(user);
      const result = db.discussion.create({
        teamId: user.teamId,
        id: nanoid(),
        createdAt: Date.now(),
        ...data,
      });
      persistDb('discussion');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.patch<DiscussionBody>(`${APP_BASE_URL}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const data = req.body;
      const { discussionId } = req.params;
      requireAdmin(user);
      const result = db.discussion.update({
        where: {
          teamId: {
            equals: user.teamId,
          },
          id: {
            // @ts-ignore
            equals: discussionId,
          },
        },
        data,
      });
      persistDb('discussion');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),

  rest.delete(`${APP_BASE_URL}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      const { discussionId } = req.params;
      requireAdmin(user);
      const result = db.discussion.delete({
        where: {
          id: {
            // @ts-ignore
            equals: discussionId,
          },
        },
      });
      persistDb('discussion');
      return delayedResponse(ctx.json(result));
    } catch (error: any) {
      return delayedResponse(ctx.status(400), ctx.json({ message: error?.message }));
    }
  }),
];
