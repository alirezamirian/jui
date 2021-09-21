import { parseColorString } from "./parseColorString";

describe(parseColorString, () => {
  it("parses rgba", () => {
    const components = [3, 20, 100, 255];
    expect(parseColorString("rgba(3,20,100, 1)")).toEqual(components);
    expect(parseColorString("rgba(3,20.2,100, 1)")).toEqual(components);
    expect(parseColorString("rgba(3,20.8,100, 1)")).toEqual(components);
    expect(parseColorString("rgba(3,20,100, 23)")).toEqual(components);
    expect(parseColorString("rgba( 3  , 20 , 100,   1 )")).toEqual(components);
    expect(parseColorString("rgba(3,20,100, .2)")).toEqual([3, 20, 100, 51]);
  });
  it("parses rgb", () => {
    const components = [3, 20, 100];
    expect(parseColorString("rgb(3,20,100)")).toEqual(components);
    expect(parseColorString("rgb(3,20.2,100)")).toEqual(components);
    expect(parseColorString("rgb(3,20.8,100)")).toEqual(components);
    expect(parseColorString("rgb( 3  , 20 , 100  )")).toEqual(components);
  });
});
