import {
  IconResolver,
  OS,
  OsDependentValue,
  OsDependentValueKey,
  ThemeJson,
  ThemePropertyValue,
} from "./types";
import { GithubIconResolver } from "./GithubIconResolver";
import { isMac } from "@react-aria/utils";

/**
 * TODO: decorate accessor methods with a cache decorator
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
    const value = this.value<string>(path);
    return (
      (value && this.themeJson.colors?.[value]) || value || (fallback as any)
    );
  }

  /**
   * Retrieves the theme property value and resolves it to the svg string for the icon.
   * by default it fetches the svg icon from Github, but there are other Theme implementations
   */
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
  value<T extends ThemePropertyValue>(path: P): T {
    return resolveOsDependentValue(this.rawValue(path), this.os) as T;
  }

  private rawValue(path: P): ThemePropertyValue | OsDependentValue {
    return this.themeJson.ui[path] || resolvePath(path, this.themeJson.ui);
  }

  private getCommonColors() {
    console.log("getCommonColors");
    return {
      tooltipForeground: this.color(
        "Tooltip.foreground" as P,
        this.dark ? "#bfbfbf" : "#000000"
      ),
      red: this.dark ? "rgb(255,100,100)" : "rgb(255,0,0)",
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
function resolvePath<T extends object>(path: string, obj: T) {
  return path.split(".").reduce<any>((result, part) => result?.[part], obj);
}
