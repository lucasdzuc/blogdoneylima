import { useContext } from 'react';

import ThemeContext from '../contexts/theme';

interface ITheme {
  title: string;
  dark: string;
  light: string;
}

interface IThemeContext {
  theme: ITheme;
  toggleTheme(): void;
}

function useTheme(): IThemeContext {

  const context = useContext(ThemeContext as any);

  if (!context) {
    throw new Error('Theme must be used within a ThemeProvider');
  }

  return context as any;
}

export default useTheme;