import baseStyled, { ThemedStyledInterface } from "styled-components";
import darculaTheme from "../themes/darcula.theme.json";
import intellijLaf from "../themes/intellijlaf.theme.json";
import lightTheme from "../themes/Light.theme.json";
import { Theme } from "./Theme/Theme";

// TODO: better typing?
export type ThemeJson = (
  | typeof darculaTheme
  | typeof intellijLaf
  | typeof lightTheme
) & {
  SpeedSearch?: {
    foreground?: string;
    borderColor?: string;
    background?: string;
    errorForeground?: string;
  };
};

export const styled = baseStyled as ThemedStyledInterface<Theme>;
