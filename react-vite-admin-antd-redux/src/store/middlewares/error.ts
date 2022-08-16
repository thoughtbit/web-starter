import type { AnyAction } from "@reduxjs/toolkit";
import { DEBUG } from "@/constants";

const getErrorMessage = (errorData: any) => {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: any) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

export default () => (next: any) => (action: AnyAction) => {
  /**
   *
   * The error middleware serves to log error messages from dispatch
   * It need not run in production
   */
  if (DEBUG) {
    const { error } = action;
    if (error) {
      console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
      if (error.response && error.response.data) {
        const message = getErrorMessage(error.response.data);
        console.error(`Actual cause: ${message}`);
      }
    }
  }
  // Dispatch initial action
  return next(action);
};
