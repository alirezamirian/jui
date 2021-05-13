import {
  IconResolver,
  KnownThemePropertyPath,
  OS,
  OsDependentValue,
  OsDependentValueKey,
  ThemeJson,
  ThemePropertyValue,
} from "./types";
import { GithubIconResolver } from "./GithubIconResolver";
import { isMac } from "@react-aria/utils";
import { cache } from "./cache.decorator";

/**
 * TODO: flattening the map once seems like a reasonable refactoring.
 */
export class Theme<P extends string = string> {
  // using property initializer causes an error. the property initialization is run before
  // constructor, and therefore this.themeJson is undefined. Could be a babel misconfiguration, but
  // this workaround is used for now
  commonColors: ReturnType<Theme<P>["getCommonColors"]>;

  constructor(
    protected readonly themeJson: ThemeJson,
    protected readonly os: OS | null = detectOs(),
    protected readonly iconResolver: IconResolver = new GithubIconResolver()
  ) {
    this.commonColors = this.getCommonColors();
  }

  get dark(): boolean {
    return Boolean(this.themeJson.dark);
  }

  /**
   * - Resolves values that are references to theme.colors
   */
  color<T extends string | undefined>(
    path: P,
    fallback?: T
  ): undefined extends T ? string | undefined : string {
    // There is a fallback mechanism that uses *.prop key if some key that ends with .prop
    // doesn't exist in the theme. In Intellij Platform implementation, all such fallback keys
    // are generated in the theme initialization and added to the theme default lookup table.
    // here we read it on the fly with `getFallbackFromStar`.
    // More info: https://github.com/JetBrains/intellij-community/blob/58dbd93e9ea527987466072fa0bfbf70864cd35f/platform/platform-impl/src/com/intellij/ide/ui/UITheme.java#L371-L371
    // NOTE: Maybe this fallback to *.{prop} is something we should have for any type of property, not
    // only colors. Can be refactored if it turned out to be the case.
    const maybeReferencedValue =
      this.value<string>(path) || (this.getFallbackFromStar(path) as string);
    const value =
      maybeReferencedValue &&
      (this.themeJson.colors?.[maybeReferencedValue] || maybeReferencedValue);
    // we could return Color object and it works because of overridden toString. but there
    // will be ts type errors because color css properties expect the value to be string.
    // Of course we can call .toString() on each usage but doesn't seem nice.
    return value || (fallback as any);
  }

  /**
   * Retrieves the theme property value and resolves it to the svg string for the icon.
   * by default it fetches the svg icon from Github, but there are other Theme implementations
   */
  @cache
  async icon<T extends string | undefined>(
    path: P,
    fallback?: T
  ): Promise<undefined extends T ? string | undefined : string> {
    const icon = this.value(path) || fallback;
    if (typeof icon === "string") {
      // @ts-expect-error: the error doesn't seem to make sense.
      // string should be assignable to the conditional return type, which is effectively either
      // string or (undefined | string)
      return this.iconResolver.resolveThemeIcon(icon);
    }
    throw new Error(
      `Could not find the icon "${path}" on the theme, and no fallback provided`
    );
  }

  /**
   * Given a dot separated path, returns the theme property value.
   * - Resolves OS-dependent values, which are objects with fields like "os.default", "os.mac"
   * - Supports both of these forms: {"x.y": "value"} and {x: {y: "value"}}
   * @example `theme.value("Menu.borderColor")`
   */
  @cache
  value<T extends ThemePropertyValue>(path: P): T {
    return resolveOsDependentValue(
      resolvePath(path, this.themeJson.ui),
      this.os
    ) as T;
  }

  private getFallbackFromStar(path: P) {
    // FIXME: after refactoring about flattening themeJson.ui properties are done, this should also
    //  be changed.
    return Object.entries(this.themeJson.ui["*"] || {}).find(([key]) =>
      path.endsWith(`.${key}` /* strip first star*/)
    )?.[1];
  }

  private getCommonColors() {
    // Rooms for improvement. e.g. common colors creator can be an input to theme constructor
    const theme = this as Theme<KnownThemePropertyPath>;
    return {
      tooltipForeground: theme.color(
        "ToolTip.foreground",
        theme.dark ? "#bfbfbf" : "#000000"
      ),
      panelBackground: theme.color("Panel.background") || "#fff",
      red: theme.dark ? "rgb(255,100,100)" : "rgb(255,0,0)",
    };
  }
}

export function detectOs(): OS | null {
  return isMac() ? "mac" : null;
}

function resolveOsDependentValue(
  value: OsDependentValue | ThemePropertyValue,
  os: OS | null
): ThemePropertyValue {
  if (isOsDependentValue(value)) {
    return (
      value[`os.${os || "default"}` as const] ??
      value["os.default"] ??
      (value[
        Object.keys(value)[0] as OsDependentValueKey // the order is not spec-wise guaranteed, but not a biggie
      ] /* because at least one key is required*/ as ThemePropertyValue)
    );
  }
  return value;
}
function isOsDependentValue(value: any): value is OsDependentValue {
  return (
    typeof value === "object" &&
    (value["os.mac"] || value["os.linux"] || value["os.windows"])
  );
}

function resolvePath<T extends { [key: string]: any }>(
  path: string,
  obj: T
): any | undefined {
  if (!obj || !path) {
    return undefined;
  }
  if (obj[path]) {
    return obj[path];
  }
  const [firstPathPart, ...otherPathParts] = path.split(".");
  return resolvePath(otherPathParts.join("."), obj[firstPathPart]);
}
