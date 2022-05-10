import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme } from 'styled-components';

interface IThemeContext {
  theme?: typeof light;
  loading: boolean;
  toggleTheme(): void;
}

interface IProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext | any>({} as IThemeContext);

export const ThemeProvider: React.FC<IProps> = ({ children }) => {
  
  // const [theme, setTheme] = useState<DefaultTheme | any>(light);
  const [theme, setTheme] = useState(light);
  const [loading, setLoading] = useState(false);

  const toggleTheme = useCallback(async () => {
    setTheme(theme?.title === 'light' ? dark : light);
    // await AsyncStorage.setItem('@BlogNeyLima:theme', JSON.stringify(theme?.title === 'light' ? dark : light));
  }, [theme]);

  // const value = useMemo(() => ({ theme, toggleTheme, loading }),
  //   [theme, toggleTheme, loading],
  // );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;

