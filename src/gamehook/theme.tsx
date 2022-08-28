import { createContext, ReactNode, useContext } from "react";

interface Props {
  children: ReactNode;
  theme?: Theme;
}

interface Color {
  base: number;
  light: number;
  dark: number;
}
export interface Theme {
  colors: {
    primary: Color;
    text: Color;
  };
}

export const DefaultTheme: Theme = {
  colors: {
    primary: {
      base: 0x00aaff,
      light: 0x22ccff,
      dark: 0x0099dd,
    },
    text: {
      base: 0xe9c46a,
      light: 0xe9c46a,
      dark: 0xe9c46a,
    },
  },
};

export function createTheme(params: Theme): Theme {
  return {
    ...DefaultTheme,
    ...params,
  };
}

export const ThemeContext = createContext<Theme>(DefaultTheme);

export function ThemeProvider({ children, theme }: Props) {
  return (
    <ThemeContext.Provider value={theme ?? DefaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
