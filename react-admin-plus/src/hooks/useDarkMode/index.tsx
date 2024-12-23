import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import storage from '@services/storage';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

import { THEME, THEME_MODE } from './constant';

export const ThemeContext = createContext({
	theme: THEME_MODE.DARK,
	toggleTheme: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
	const [theme, setTheme] = useState(storage.get(THEME) || THEME_MODE.DARK);

	const toggleTheme = useCallback(() => {
		if (theme === THEME_MODE.LIGHT) {
			setTheme(THEME_MODE.DARK);
			storage.set(LOCALSTORAGE.THEME, THEME_MODE.DARK);
		} else {
			setTheme(THEME_MODE.LIGHT);
			storage.set(LOCALSTORAGE.THEME, THEME_MODE.LIGHT);
		}
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			toggleTheme,
		}),
		[theme, toggleTheme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

interface ThemeProviderProps {
	children: ReactNode;
}

interface ThemeMode {
	theme: string;
	toggleTheme: () => void;
}

export const useThemeMode = (): ThemeMode => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return { theme, toggleTheme };
};

export const useIsDarkMode = (): boolean => {
	const { theme } = useContext(ThemeContext);

	return theme === THEME_MODE.DARK;
};

export const useThemeConfig = (): ThemeConfig => {
	const isDarkMode = useIsDarkMode();

	return {
		algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
		token: {
			borderRadius: 2,
			borderRadiusLG: 2,
			borderRadiusSM: 2,
			borderRadiusXS: 2,
		},
	};
};

export default useThemeMode;
/*
<ThemeProvider></ThemeProvider>
*/

/*
const themeConfig = useThemeConfig();
<ConfigProvider theme={themeConfig}

</ConfigProvider>
*/