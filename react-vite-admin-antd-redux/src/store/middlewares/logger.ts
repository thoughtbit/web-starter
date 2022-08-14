// @ts-nocheck
import { DEBUG } from "~/constants";

export default () => (next) => (action) => {
  if (DEBUG) {
    const { type, payload, meta, error } = action;

    console.groupCollapsed(type);
    console.log("Payload:", payload);
    if (error) {
      console.log("Error:", error);
    }
    console.log("Meta:", meta);
    console.groupEnd();
  }

  return next(action);
};
