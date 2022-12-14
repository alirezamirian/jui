import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import { Theme } from "./Theme";
import { KnownThemePropertyPath } from "./Theme/types";

type JuiStyledComponentsModule = ThemedStyledComponentsModule<
  Theme<KnownThemePropertyPath>
>;

export const styled =
  styledComponents.default as JuiStyledComponentsModule["default"];
export const useTheme =
  styledComponents.useTheme as JuiStyledComponentsModule["useTheme"];
export const css = styledComponents.css as JuiStyledComponentsModule["css"];
export const ThemeConsumer =
  styledComponents.ThemeConsumer as JuiStyledComponentsModule["ThemeConsumer"];
