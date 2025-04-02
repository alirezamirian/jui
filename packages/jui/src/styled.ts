import * as styledComponents from "styled-components";
// import { ThemedStyledComponentsModule } from "styled-components";
import { Theme } from "./Theme";
import { KnownThemePropertyPath } from "./Theme/types";

// type JuiStyledComponentsModule = ThemedStyledComponentsModule<
//   Theme<KnownThemePropertyPath>
// >;

// (temporary 🤞 fix for https://github.com/styled-components/styled-components/issues/4062
declare module "styled-components" {
  export interface DefaultTheme extends Theme<KnownThemePropertyPath> {}
}

export const styled = styledComponents.default;
export const useTheme = styledComponents.useTheme;
export const css = styledComponents.css;
export const ThemeConsumer = styledComponents.ThemeConsumer;
