import type { Action } from 'redux';

// Add redux action type to sentry error log for when an error happens.
const ExampleMiddleware = () => (next: any) => async (action: Action<string>) => {
  // action.type && { foo: action.type }

  return next(action);
};

export default ExampleMiddleware;
