import { GeneratedKnownThemeProps } from "@intellij-platform/core/Theme/GeneratedKnownThemeProps";

export type ThemePropertyValue = string | number | boolean;
export type ThemePropertyRawValue =
  | string
  | number
  | boolean
  | OsDependentValue;
export type OS = "windows" | "linux" | "mac";
export type OsDependentValueKey = `os.${OS}` | "os.default";
export type OsDependentValue = RequireAtLeastOne<
  {
    [key in OsDependentValueKey]?: ThemePropertyValue;
  }
>;
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type SvgString = string;

export interface IconResolver {
  resolve(iconPath: string): Promise<SvgString>;
}

type ThemeProperties = Record<string, ThemePropertyRawValue>;

export type ThemeJson = {
  name: string;
  dark: boolean;
  author?: string;
  editorScheme?: string;

  colors?: Record<string, string>;
  iconColorsOnSelection?: Record<string, string>;
  ui: { "*": ThemeProperties } & {
    [key: string]: ThemeProperties | ThemePropertyRawValue;
  };
};

export type KnownThemePropertyPath =
  // Added manually
  | "SpeedSearch.errorForeground"
  // Generated automatically based on a bunch of existing .theme.json files:
  | GeneratedKnownThemeProps;
