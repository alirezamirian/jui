import baseStyled, {
  css as baseCss,
  ThemedCssFunction,
  ThemedStyledInterface,
} from "styled-components";
import { Theme } from "./Theme";
import { KnownThemePropertyPath } from "./Theme/types";

export const styled = baseStyled as ThemedStyledInterface<
  Theme<KnownThemePropertyPath>
>;

export const css = baseCss as ThemedCssFunction<Theme<KnownThemePropertyPath>>;
