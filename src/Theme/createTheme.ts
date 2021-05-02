import { ThemeJson } from "../styled";
import { isMac } from "@react-aria/utils";

export type Theme = Record<string, any>; // FIXME

export function createTheme(themeJson: ThemeJson): Theme {
  return replaceObjectValues(themeJson, (value) => {
    if (
      typeof value === "object" &&
      (value["os.mac"] || value["os.linux"] || value["os.windows"])
    ) {
      if (isMac() && value["os.mac"]) {
        return value["os.mac"];
      }
      // FIXME
      return (
        value["os.default"] ??
        value["os.linux"] ??
        value["os.windows"] ??
        value["os.mac"]
      );
    }
    if (
      typeof value === "string" &&
      "colors" in themeJson &&
      value in themeJson.colors
    ) {
      return (themeJson.colors as any)[value];
    }
    return value;
  });
}

// quick and dirty implementation. Lots of rooms for improvement
function replaceObjectValues(
  obj: Record<string, any>,
  mapper: (value: any) => any
) {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const newValue = mapper(obj[key]);
    result[key] = newValue;
    if (newValue === obj[key] && typeof obj[key] === "object") {
      result[key] = replaceObjectValues(result[key], mapper);
    }
  });
  return result;
}
