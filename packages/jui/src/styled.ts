import baseStyled, { ThemedStyledInterface } from "styled-components";
import { Theme } from "./Theme/Theme";
import { KnownThemePropertyPath } from "./Theme/types";

export const styled = baseStyled as ThemedStyledInterface<
  Theme<KnownThemePropertyPath>
>;
