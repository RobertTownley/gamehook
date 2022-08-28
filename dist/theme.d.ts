import { ReactNode } from "react";
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
export declare const DefaultTheme: Theme;
export declare function createTheme(params: Theme): Theme;
export declare const ThemeContext: import("react").Context<Theme>;
export declare function ThemeProvider({ children, theme }: Props): JSX.Element;
export declare function useTheme(): Theme;
export {};
