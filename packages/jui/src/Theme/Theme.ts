import {
  IconResolver,
  KnownThemePropertyPath,
  OS,
  OsDependentValue,
  ThemeJson,
  ThemePropertyValue,
} from "./types";
import { GithubIconResolver } from "./GithubIconResolver";
import { isMac } from "@react-aria/utils";
import { cache } from "./cache.decorator";

/**
 * Just to be able to locate all keys that are not yet typed and maybe fix them later at some point.
 */
export type UnknownThemeProp<T> = T extends KnownThemePropertyPath
  ? unknown
  : KnownThemePropertyPath;

const defaultValues: { [key in KnownThemePropertyPath]?: string } = {
  "*.disabledForeground": "#8C8C8C",
};
/**
 * TODO: flattening the map once seems like a reasonable refactoring.
 */
export class Theme<P extends string = string> {
  // using property initializer causes an error. the property initialization is run before
  // constructor, and therefore this.themeJson is undefined. Could be a babel misconfiguration, but
  // this workaround is used for now
  commonColors: ReturnType<Theme<P>["getCommonColors"]>;

  /**
   * Corresponds to `DEFAULT_RENDERER_*` fields in JBUI class, in the reference impl. Used as a fallback for common
   * colors, if a theme definition lacks those colors in "ui.*".
   * NOTE: These colors are used directly as a last-resort fallback **directly in each use case**. But based on how
   * they are used, it seems they could just be considered as a fallback for some "*.SOME_COLOR". So we are technically
   * deviating from how star-colors are resolved, by including this fallback mechanism, but it should work the same,
   * based on how these colors are used in the reference impl. We can reconsider this, if exceptions found.
   * @private
   */
  private readonly DEFAULTS;

  constructor(
    public readonly themeJson: ThemeJson,
    protected readonly iconResolver: IconResolver = new GithubIconResolver(),
    protected readonly os: OS | null = detectOs()
  ) {
    this.DEFAULTS = {
      background: !this.dark ? "#FFF" : "#3C3F41",
      selectionBackground: !this.dark ? "#3875D6" : "#2F65CA",
      selectionInactiveBackground: !this.dark ? "#D4D4D4" : "#0D293E",
      selectionBackgroundInactive: !this.dark ? "#D4D4D4" : "#0D293E",
      hoverBackground: !this.dark ? "#EDF5FC" : "#464A4D",
      hoverInactiveBackground: !this.dark ? "#F5F5F5" : "#464A4D",
    };
    this.commonColors = this.getCommonColors();
    Object.entries(defaultValues).forEach(([key, value]) => {
      if (value) {
        this.setDefault(key as P, value);
      }
    });
  }

  get dark(): boolean {
    return Boolean(this.themeJson.dark);
  }

  get name(): string {
    return this.themeJson.name;
  }

  private setDefault(path: P, value: string) {
    if (this.value(path) !== value) {
      this.themeJson.ui[path] = value;
    }
  }

  isUnderDarcula() {
    return this.themeJson.name.includes("Darcula");
  }

  /**
   * Converts inset value to a string that can be used as css padding or margin value.
   * @example
   * theme.inset('some.path') === "2px 4px 6px 8px" // assuming "some.path" is resolved to "2,4,6,8"
   */
  inset<T extends ThemePropertyValue>(path: P): string | null {
    const value = this.value(path);
    if (typeof value === "string") {
      const parts = value.split(",").map((num) => `${num}px`);
      // The order in awt Inset is "top,left,bottom,right", while in css it's "top,right,bottom,left".
      // It seems unlike css, inset has always the 4 components, and there are no shorthand notations, so seems safe
      // to work with exact indices.
      return `${parts[0]} ${parts[3]} ${parts[2]} ${parts[1]}`;
    }
    return null;
  }

  /**
   * Converts font size delta value to a string (or null), that can be used as css font size value.
   * @example
   * theme.inset('some.path') === "calc(1em + 2px)" // assuming "some.path" is resolved to 2
   * theme.inset('some.path') === undefined // assuming "some.path" is resolved to 0
   */
  fontSizeDelta<T extends ThemePropertyValue>(path: P): string | null {
    const value = this.value(path);
    if (typeof value === "number") {
      return `calc(1em + ${value}px)`;
    }
    return null;
  }

  /**
   * - Resolves values that are references to theme.colors
   */
  color<T extends string | undefined>(
    path: P,
    /**
     * fallback that will take precedence over *-based fallback mechanism.
     */
    fallback?: T
  ): undefined extends T ? string | undefined : string {
    // There is a fallback mechanism that uses *.prop key if some key that ends with .prop
    // doesn't exist in the theme. In Intellij Platform implementation, all such fallback keys
    // are generated in the theme initialization and added to the theme default lookup table.
    // here we read it on the fly with `getFallbackFromStar`.
    // More info: https://github.com/JetBrains/intellij-community/blob/58dbd93e9ea527987466072fa0bfbf70864cd35f/platform/platform-impl/src/com/intellij/ide/ui/UITheme.java#L371-L371
    // NOTE: Maybe this fallback to *.{prop} is something we should have for any type of property, not
    // only colors. Can be refactored if it turned out to be the case.
    const dereference = (maybeReferencedValue: string | null): string | null =>
      maybeReferencedValue &&
      (dereference(this.themeJson.colors?.[maybeReferencedValue] || null) ||
        maybeReferencedValue);

    // we could return Color object, and it works because of overridden toString. but there
    // will be ts type errors because color css properties expect the value to be string.
    // Of course, we can call .toString() on each usage but doesn't seem nice.
    return (
      dereference(this.value<string>(path)) ||
      // NOTE: fallback is intentionally prioritized over *-based fallback. It's complicated in the original impl,
      // and whether *-based fallback is used or not depends on the theme. More specifically, it depends
      // on whether "Theme.name" key exists in "defaults": https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/util/ui/src/com/intellij/ui/JBColor.java#L75
      // that in turn depends on the type and name of the theme: https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/platform-impl/src/com/intellij/ide/ui/laf/LafManagerImpl.java#L719
      // At least for now, one should use theme.color like this, if *-based fallback is to be prioritized:
      // theme.color('x.y') ?? 'fallback'
      // then priority will be: 'x.y' -> '*.y' -> 'fallback'
      (fallback as any) ||
      dereference(this.getFallbackFromStar(path) as string)
    );
  }

  /**
   * Resolves platform icon path to svg.
   * by default, it fetches the svg icon from Github, but there are other Theme implementations
   */
  @cache()
  async getSvgIcon(path: string, onSelection?: boolean): Promise<string> {
    const svgString = await this.resolveSvgIcon(path);
    if (onSelection) {
      return Object.entries(this.themeJson.iconColorsOnSelection || {}).reduce(
        (soFar, [key, value]) => {
          return soFar.replace(new RegExp(key, "ig"), value);
        },
        svgString
      );
    }
    return svgString;
  }

  /**
   * A tiny wrapper around iconResolve.resolve(), to ensure caching no matter how iconResolve is implemented
   */
  @cache({ cacheAsyncErrors: true })
  private resolveSvgIcon(path: string) {
    return this.iconResolver.resolve(
      !path.endsWith(".svg") ? `${path}.svg` : path
    );
  }

  /**
   * Given a dot separated path, returns the theme property value.
   * - Resolves OS-dependent values, which are objects with fields like "os.default", "os.mac"
   * - Supports both of these forms: {"x.y": "value"} and {x: {y: "value"}}
   * @example `theme.value("Menu.borderColor")`
   */
  @cache()
  value<T extends ThemePropertyValue>(path: P): T {
    return resolveOsDependentValue(
      resolvePath(path, this.themeJson.ui),
      this.os
    ) as T;
  }

  private getFallbackFromStar(path: P) {
    // FIXME: after refactoring about flattening themeJson.ui properties are done, this should also
    //  be changed.
    const fallbackKey = Object.keys(this.themeJson.ui["*"] || {})
      .concat(Object.keys(this.DEFAULTS))
      .find((key) => path.endsWith(`.${key}` /* strip first star*/));
    return fallbackKey
      ? this.value(`*.${fallbackKey}` as P) ||
          this.DEFAULTS[fallbackKey as keyof Theme["DEFAULTS"]]
      : null;
  }

  private getCommonColors() {
    // Rooms for improvement. e.g. common colors creator can be an input to theme constructor
    const theme = this as Theme<KnownThemePropertyPath>;
    return {
      tooltipForeground: theme.color(
        "ToolTip.foreground",
        theme.dark ? "#bfbfbf" : "#000000"
      ),
      inactiveTextColor: theme.color(
        "Component.infoForeground",
        theme.dark ? "#787878" : "#999999"
      ),
      panelBackground:
        theme.color(
          "Panel.background" as UnknownThemeProp<"Panel.background">
        ) || "#fff",
      focusBorderColor: theme.color(
        "Component.focusedBorderColor",
        !theme.dark ? "#87AFDA" : "#466D94"
      ),
      red: theme.dark ? "rgb(255,100,100)" : "rgb(255,0,0)",
      blue: theme.dark ? "#589df6" : "rgb(0,0,255)",
      green: theme.dark ? "rgb(98, 150, 85)" : "rgb(0,255,0)",
      orange: theme.dark ? "rgb(159, 107, 0)" : "rgb(255, 200, 0)",
      cyan: theme.dark ? "rgb(0, 137, 137)" : "rgb(0, 255, 255)",
      yellow: theme.dark ? "rgb(138, 138, 0)" : "rgb(255, 255, 0)",
      magenta: theme.dark ? "rgb(151, 118, 169)" : "rgb(255, 0, 255)",
      pink: theme.dark ? "rgb(255, 175, 175)" : "rgb(255, 175, 175)",
      contrastBorder: theme.color(
        "Borders.ContrastBorderColor",
        theme.dark ? "#323232" : "#c9c9c9"
      ),
      labelForeground: theme.color(
        "Label.foreground",
        theme.dark ? "#bbb" : "#000"
      ),
      labelSelectedForeground: theme.color("Label.selectedForeground", "#fff"),
      labelDisabledForeground: theme.color(
        "Label.disabledForeground",
        "rgb(128, 128, 128)"
      ),
      contextHelpForeground: theme.color(
        "Label.infoForeground",
        theme.dark ? "#8c8c8c" : "#787878"
      ),
      linkForegroundEnabled: theme.color(
        "Link.activeForeground",
        theme.color(
          "link.foreground" as UnknownThemeProp<"link.foreground">,
          "#589DF6"
        )
      ),
    };
  }
}

function detectOs(): OS | null {
  return isMac() ? "mac" : null; // TODO: seems like os detection logic is left uncompleted
}

function resolveOsDependentValue(
  value: OsDependentValue | ThemePropertyValue,
  os: OS | null
): ThemePropertyValue | undefined {
  if (isOsDependentValue(value)) {
    return value[`os.${os || "default"}` as const] ?? value["os.default"];
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
