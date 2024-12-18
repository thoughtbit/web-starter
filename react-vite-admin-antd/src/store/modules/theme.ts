import type { StateCreator } from "zustand";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Theme = {
  light: ThemeMode;
  dark: ThemeMode;
  radius: string;
};

export type ThemeSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  style: Object;
  setStyle: (style: Object) => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const initialState = {
  style: "default",
  mode: "dark",
  theme: {},
};

export const createThemeSlice: StateCreator<
  ThemeSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  ThemeSlice
> = (set) => ({
     ...initialState,
      setStyle: (style: Style["name"]) => set((state) => ({ ...state, style })),
      setTheme: (theme: Theme) => set((state) => ({ ...state, theme })),
      setMode: (mode: "light" | "dark") => set((state) => ({ ...state, mode })),
});

const useThemeSlice = create<ThemeSlice>()(
  devtools(
    persist(createCounterSlice, {
      name: "preview-theme",
    })
  )
);

// selector 
export const getMode = () => useThemeSlice.getState().mode;

export default useThemeSlice;
