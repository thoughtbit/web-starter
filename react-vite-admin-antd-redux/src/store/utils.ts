import type { AnyAction, SerializedError } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

/**
 * Check if the async action type is rejected
 */
export function isRejectedAction(action: AnyAction) {
  return action.type.endsWith("/rejected");
}

/**
 * Check if the async action type is pending
 */
export function isPendingAction(action: AnyAction) {
  return action.type.endsWith("/pending");
}

/**
 * Check if the async action type is completed
 */
export function isFulfilledAction(action: AnyAction) {
  return action.type.endsWith("/fulfilled");
}

const commonErrorProperties: Array<keyof SerializedError> = ["name", "message", "stack", "code"];

/**
 * serialize function used for async action errors,
 * since the default function from Redux Toolkit strips useful info from axios errors
 */
export const serializeAxiosError = (value: any): AxiosError | SerializedError => {
  if (typeof value === "object" && value !== null) {
    if (value.isAxiosError) {
      return value;
    } else {
      const simpleError: SerializedError = {};
      for (const property of commonErrorProperties) {
        if (typeof value[property] === "string") {
          simpleError[property] = value[property];
        }
      }

      return simpleError;
    }
  }
  return { message: String(value) };
};
