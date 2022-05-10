import { useContext } from 'react';
import light from '../styles/themes/light';

import ThemeContext from '../contexts/theme';

interface IThemeContext {
  theme?: typeof light;
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