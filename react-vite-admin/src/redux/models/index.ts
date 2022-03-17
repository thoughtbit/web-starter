import type { Models } from '@rematch/core';
import { app } from './app';
import { user } from './user';

export interface RootModel extends Models<RootModel> {
  app: typeof app;
  user: typeof user;
}

export const models: RootModel = { app, user };
