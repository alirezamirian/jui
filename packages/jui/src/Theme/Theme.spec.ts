import { GithubIconResolver } from "./GithubIconResolver";
import { Theme } from "./Theme";
import { ThemeJson } from "./types";

const themeJson: ThemeJson = {
  name: "test theme",
  dark: false,
  colors: {
    foreground: "#000000",
  },
  ui: {
    "*": {
      prop5: "globalValue5",
    },
    Cmp1: {
      prop1: "val1",
      prop2: {
        "os.windows": "windows",
        "os.default": "default",
      },
      prop3: {
        "os.windows": "windows",
        "os.linux": "linux",
      },
      prop4: "foreground",
      "SubCmp.prop1": "nested",
    },
    "Cmp2.prop1": 3,
    Cmp2: {
      prop2: "value2",
    },
  },
};
describe(Theme, () => {
  it("supports both forms of keys", () => {
    expect(new Theme(themeJson).value("Cmp1.prop1")).toEqual("val1");
    expect(new Theme(themeJson).value("Cmp2.prop1")).toEqual(3);
    expect(new Theme(themeJson).value("Cmp1.SubCmp.prop1")).toEqual("nested");
  });

  it("resolves os-dependent values based on os", () => {
    expect(
      new Theme(themeJson, new GithubIconResolver(), "windows").value(
        "Cmp1.prop2"
      )
    ).toEqual("windows");
  });
  it("resolves os-dependent values to default when os doesn't match", () => {
    expect(
      new Theme(themeJson, new GithubIconResolver(), "mac").value("Cmp1.prop2")
    ).toEqual("default");
  });
  it("resolves os-dependent values to first one when os doesn't match and there is no default", () => {
    expect(
      new Theme(themeJson, new GithubIconResolver(), "mac").value("Cmp1.prop3")
    ).toEqual("windows");
  });
  it("resolves os-dependent values to default or first one when os is null", () => {
    expect(new Theme(themeJson).value("Cmp1.prop2")).toEqual("default");
    expect(new Theme(themeJson).value("Cmp1.prop3")).toEqual("windows");
  });

  it("resolves color values", () => {
    expect(new Theme(themeJson).color("Cmp1.prop4")).toEqual("#000000");
  });

  it("doesn't require 'colors' field", () => {
    const { colors, ...themeJsonWithoutColors } = themeJson;
    expect(new Theme(themeJsonWithoutColors).value("Cmp1.prop1")).toEqual(
      "val1"
    );
  });

  it("should fallback to *.property if Component.property doesn't exist", () => {
    expect(new Theme(themeJson).value("Cmp2.prop2")).toEqual("value2");
    expect(new Theme(themeJson).color("Cmp2.prop5")).toEqual("globalValue5");
  });
});
