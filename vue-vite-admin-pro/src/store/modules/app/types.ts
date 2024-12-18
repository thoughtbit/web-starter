export type ThemeConfig = {
  primary: string;
  isDark: boolean;
};

export type colorSchemeType = '' | 'light' | 'dark';
export type State = {
  colorScheme: colorSchemeType;
  assemblySize: string;
  themeConfig: ThemeConfig;
};
