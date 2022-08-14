import { createSlice, type PayloadAction, type Unsubscribe } from "@reduxjs/toolkit";
import type { AppStartListening } from "..";

export type ColorScheme = "light" | "dark";

export type ThemeState = {
  colorScheme: ColorScheme;
};

const initialState: ThemeState = {
  colorScheme: "light",
};
export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeColorScheme(state: ThemeState, action: PayloadAction<ColorScheme>) {
      state.colorScheme = action.payload;
    },
  },
});

export const { changeColorScheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;

// listeners
// -------------------------------------------------------------------------
function onChangeColorScheme(action: ReturnType<typeof changeColorScheme>) {
  console.log(action);

  document.documentElement.classList.toggle("dark", action.payload !== "light");
}

export function setupThemeListeners(startListening: AppStartListening): Unsubscribe {
  const listeners = [
    startListening({
      actionCreator: changeColorScheme,
      effect: onChangeColorScheme,
    }),
  ];

  return () => listeners.forEach((unsubscribe) => unsubscribe());
}