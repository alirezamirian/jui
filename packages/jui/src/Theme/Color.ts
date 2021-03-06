import { parseColorString } from "./parseColorString";

/**
 * A Color class resembling AWT Color
 */
export class Color {
  public readonly r: number;
  public readonly g: number;
  public readonly b: number;
  public readonly a: number;

  private static readonly FACTOR = 0.7;

  constructor(r: number, g: number, b: number, a?: number);
  constructor(rgba: string);
  constructor(rgba: Color);
  constructor(
    rgba: string | number | Color,
    g?: number,
    b?: number,
    a: number = 255
  ) {
    let r: number;
    if (typeof rgba === "string") {
      [r = NaN, g = NaN, b = NaN, a = 255] = parseColorString(rgba) || [];
    } else if (rgba instanceof Color) {
      [r, g, b, a] = [rgba.r, rgba.g, rgba.b, rgba.a];
    } else {
      r = rgba;
    }
    this.r = r;
    this.g = g!;
    this.b = b!;
    this.a = a < 1 ? Math.round(a * 255) : a;
  }

  isValid() {
    return (
      Number.isInteger(this.r) &&
      Number.isInteger(this.g) &&
      Number.isInteger(this.b) &&
      Number.isInteger(this.a)
    );
  }

  /**
   * Extra method for changing transparency
   */
  withTransparency(alpha: number) {
    return new Color(this.r, this.g, this.b, alpha);
  }

  brighter() {
    let { r, g, b, a: alpha } = this;
    const int = Math.floor,
      FACTOR = Color.FACTOR;
    // The rest is copy paste of java.awt.Color (only `int i` is changed to `let i` :D)
    let i = int(1.0 / (1.0 - FACTOR));
    if (r == 0 && g == 0 && b == 0) {
      return new Color(i, i, i, alpha);
    }
    if (r > 0 && r < i) r = i;
    if (g > 0 && g < i) g = i;
    if (b > 0 && b < i) b = i;

    return new Color(
      Math.min(int(r / FACTOR), 255),
      Math.min(int(g / FACTOR), 255),
      Math.min(int(b / FACTOR), 255),
      alpha
    );
  }

  darker() {
    const FACTOR = Color.FACTOR;
    const int = Math.floor;

    return new Color(
      Math.max(int(this.r * FACTOR), 0),
      Math.max(int(this.g * FACTOR), 0),
      Math.max(int(this.b * FACTOR), 0),
      this.a
    );
  }

  static brighter(color: string): string {
    // note: we can't type args simply with ConstructorParameters<typeof Color>.
    // see more: https://github.com/microsoft/TypeScript/issues/37079
    return new Color(color).brighter().toString();
  }

  blend(colorOrColorString: Color | string) {
    const color =
      typeof colorOrColorString === "string"
        ? new Color(colorOrColorString)
        : colorOrColorString;
    const getBlendedValue = (component: "r" | "g" | "b") =>
      Math.round(
        (color.a / 255) * color[component] +
          (this.a / 255) * (1 - color.a / 255) * this[component]
      );
    return new Color(
      getBlendedValue("r"),
      getBlendedValue("g"),
      getBlendedValue("b")
    );
  }

  toString() {
    const toString = (component: number) =>
      Number.isNaN(component) ? "" : component.toString(16).padStart(2, "0");
    const r = toString(this.r);
    const g = toString(this.g);
    const b = toString(this.b);
    const a = this.a === 255 ? "" : toString(this.a);
    return `#${r}${g}${b}${a}`;
  }
}
