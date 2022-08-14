import { createAction, createReducer } from "@reduxjs/toolkit";

export const updateVersion = createAction<void>("global/updateVersion");
export const updateVersionNumber = createAction<{ index: number; version: string }>("global/updateVersion");

const currentTimestamp = () => new Date().getTime();

export type VersionState = {
  timestamp: number;
  version?: string;
  index?: number;
};

const initialState: VersionState = {
  timestamp: currentTimestamp(),
  version: "",
  index: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      state.timestamp = currentTimestamp();
    })
    .addCase(updateVersionNumber, (state, { payload: { index, version } }) => {
      state.timestamp = currentTimestamp();
      state.index = index;
      state.version = version;
    })
);
