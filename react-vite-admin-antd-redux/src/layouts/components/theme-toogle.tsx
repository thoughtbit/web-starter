import { useAppDispatch, useAppSelector } from "@/store";
import { changeColorScheme, type ThemeState, selectTheme } from "@/store/modules/theme";
import type { ChangeEvent } from "react";

function isChecked(theme: ThemeState): boolean {
  return theme.colorScheme === "light";
}

export const ThemeToggler = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeColorScheme(theme.colorScheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-toggler">
      <label htmlFor="theme-switch">
        <input
          checked={isChecked(theme)}
          id="theme-switch"
          name="theme-switch"
          onChange={handleChange}
          type="checkbox"
        />
        {theme.colorScheme === "light" ? <span>亮</span> : <span>暗</span>}
      </label>
    </div>
  );
};

export default ThemeToggler;
