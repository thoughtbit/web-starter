import { useCallback } from "react";

import { type RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { changeColorScheme } from "@/store/modules/theme";

export function useTheme(): [string, () => void] {
  const dispatch = useAppDispatch();
  const colorScheme = useSelector<RootState, RootState["theme"]["colorScheme"]>((state) => {
    return state.theme.colorScheme;
  });

    // const handleChange = useCallback(() => {
    //   dispatch(changeColorScheme(colorScheme === "light" ? "dark" : "light"));
    // }, [dispatch]);

  const handleChange = () => {
    dispatch(changeColorScheme(colorScheme === "light" ? "dark" : "light"));
  };

  return [colorScheme, handleChange];
}
