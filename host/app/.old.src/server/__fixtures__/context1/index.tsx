import * as React from 'react';

type Theme = 'main' | 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (todo: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeState, setThemeState] = React.useState<Theme>('main');

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
  };

  return <ThemeContext.Provider value={{ theme: themeState, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return React.useContext(ThemeContext) as ThemeContextType;
};
