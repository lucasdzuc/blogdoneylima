import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme } from 'styled-components';

interface ITheme {
  title: string;
  dark: string;
  light: string;
}

interface IThemeContext {
  theme: ITheme;
  toggleTheme(): void;
}

interface IProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext | null>(null as unknown as IThemeContext);

export const ThemeProvider: React.FC<IProps> = ({ children }) => {
  
  const [theme, setTheme] = useState<DefaultTheme>(light);
  // const [theme, setTheme] = useState<ITheme | any>(light as any);
  const [loading, setLoading] = useState(true);

  async function loadTheme(): Promise<void> {
    try {
      setLoading(true);
      const storagedTheme = await AsyncStorage.getItem('@BlogNeyLima:theme');
      // console.log(JSON.parse(storagedFavorites));

      if (storagedTheme) {
        setTheme(JSON.parse(storagedTheme));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme?.title === 'light' ? dark : light);
  }, [theme?.title]);

  const value = useMemo(() => ({ theme, toggleTheme, loading }),
    [theme, toggleTheme, loading],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;

