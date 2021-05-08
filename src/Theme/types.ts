export type ThemePropertyValue = string | number | boolean;
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

export interface IconResolver {
  resolveThemeIcon(icon: string): Promise<string>;

  resolvePlatformIcon(srcRelativeIconPath: string): Promise<string>;
}
