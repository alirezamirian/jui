import { Color } from "./Color";

describe(Color, () => {
  it("initializes from rgb hex", () => {
    expectRgba(new Color("#22FFaa"), [0x22, 0xff, 0xaa, 255]);
  });

  it("initializes from rgba hex", () => {
    expectRgba(new Color("#22FFaaDD"), [0x22, 0xff, 0xaa, 0xdd]);
  });

  it("initializes from shorthand hex", () => {
    expectRgba(new Color("#DDd"), [0xdd, 0xdd, 0xdd, 255]);
  });

  it("initializes from rgb", () => {
    expectRgba(new Color("rgb(10,20,30)"), [10, 20, 30, 255]);
    expectRgba(new Color("rgba(10,20,30,40)"), [10, 20, 30, 40]);
  });

  it("initializes from rgba components", () => {
    expectRgba(new Color(10, 20, 30), [10, 20, 30, 255]);

    expect(new Color(100, 100, 100, 20).a).toBe(20);
    expect(new Color(100, 100, 100, 0.1).a).toBe(26); // 25.5 => 26
    expect(new Color(100, 100, 100, 0.23).a).toBe(59); // 58.65 => 59
  });

  it("initializes from another Color", () => {
    const anotherColor = new Color("#22FFaa");
    const color = new Color(anotherColor);
    expect(color).not.toBe(anotherColor);
    expectRgba(color, [
      anotherColor.r,
      anotherColor.g,
      anotherColor.b,
      anotherColor.a,
    ]);
  });

  it("it correctly returns validity of the color", () => {
    expect(new Color("#22FFAA").isValid()).toBe(true);
    expect(new Color("asdas").isValid()).toBe(false);
  });

  it("overrides toString to render hex value", () => {
    expect(`${new Color("#22FFAA")}`).toBe("#22ffaa");
  });

  it("it brightens color exactly like java.awt.Color#brighter()", () => {
    expect(new Color(60, 63, 65).brighter()).toEqual(new Color(85, 90, 92));
  });
});

function expectRgba(
  color: Color,
  [r, g, b, a]: [number, number, number, number]
) {
  expect(color.r).toBe(r);
  expect(color.g).toBe(g);
  expect(color.b).toBe(b);
  expect(color.a).toBe(a);
}
