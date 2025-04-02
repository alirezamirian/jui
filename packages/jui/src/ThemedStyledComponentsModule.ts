import * as React from "react";
import {
  AnyComponent,
  BaseObject,
  ExecutionProps,
  Interpolation,
  KnownTarget,
  NoInfer,
  RuleSet,
  Styles,
  WebTarget,
} from "styled-components/dist/types";
import * as styledComponents from "styled-components";
import type { Styled as StyledInstance } from "styled-components/dist/constructors/constructWithOptions";

// workaround until this is fixed: https://github.com/styled-components/styled-components/issues/4062

interface ThemeProviderProps<T extends object, U extends object = T> {
  children?: React.ReactNode | undefined;
  theme: T | ((theme: U) => T);
}
type BaseThemeProviderComponent<
  T extends object,
  U extends object = T
> = React.ComponentClass<ThemeProviderProps<T, U>>;

type WithThemeComponent<C extends AnyComponent> = ReturnType<
  typeof styledComponents.withTheme<C>
>;

type WithTheme<Theme> = <T extends AnyComponent>(
  Component: T
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    JSX.LibraryManagedAttributes<
      T,
      Omit<ExecutionProps, "theme"> & { theme: Theme }
    >
  > &
    React.RefAttributes<T>
> & {
  [Key in keyof WithThemeComponent<T>]: WithThemeComponent<T>[Key];
};

export type ThemedStyledComponentsModule<Theme extends object> = {
  //missing: keyFrames
  createGlobalStyle<Props extends object>(
    strings: Styles<Props>,
    ...interpolations: Array<Interpolation<Props>>
  ): React.NamedExoticComponent<ExecutionProps & Props>;

  css(
    styles: Styles<{ theme?: Theme }>,
    ...interpolations: Interpolation<{ theme?: Theme }>[]
  ): RuleSet<{ theme?: Theme }>;
  css<Props extends object>(
    styles: Styles<NoInfer<Props> & { theme?: Theme }>,
    ...interpolations: Interpolation<NoInfer<Props> & { theme?: Theme }>[]
  ): RuleSet<NoInfer<Props> & { theme?: Theme }>;

  default: ThemedStyled<Theme>;
  isStyledComponent: typeof styledComponents.isStyledComponent;
  ServerStyleSheet: typeof styledComponents.ServerStyleSheet;
  styled: ThemedStyled<Theme>;
  StyleSheetManager: typeof styledComponents.StyleSheetManager;
  useTheme: () => Theme;
  ThemeProvider: BaseThemeProviderComponent<Theme>;
  ThemeConsumer: React.Consumer<Theme | undefined>;
  ThemeContext: React.Context<Theme>;
  withTheme: WithTheme<Theme>;
};

import * as SC from "styled-components";
const styled = SC.styled as ThemedStyled<{ a: 1 }>;

type ThemedStyledInstance<Theme extends object> = <
  Target extends WebTarget = WebTarget,
  InjectedProps extends BaseObject = BaseObject
>(
  tag: Target
) => StyledInstance<
  "web",
  Target,
  Target extends KnownTarget
    ? React.ComponentPropsWithRef<Target> & InjectedProps & { theme?: Theme }
    : InjectedProps & { theme?: Theme },
  BaseObject
>;
type ThemedStyled<Theme extends object> = ThemedStyledInstance<Theme> & {
  [Key in keyof (typeof styledComponents)["styled"]]: (typeof styledComponents)["styled"][Key] extends StyledInstance<
    any,
    any,
    any
  >
    ? StyledInstance<
        "web",
        Key,
        Key extends KnownTarget
          ? Omit<React.ComponentPropsWithRef<Key>, "theme"> & {
              theme: Theme;
            }
          : { theme: Theme },
        BaseObject
      >
    : never;
};
