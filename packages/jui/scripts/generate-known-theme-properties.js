const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const themes = [
  require("../themes/darcula.theme.json"),
  require("../themes/intellijlaf.theme.json"),
  require("../themes/Light.theme.json"),
  require("../themes/HighContrast.theme.json"),
];

const props = [
  ...new Set(
    themes
      .flatMap((theme) => Object.keys(flattenObj(theme.ui)))
      .filter((key) => !/os\.(windows|mac|linux|default)$/.test(key))
  ),
].sort();

const source = `export type GeneratedKnownThemeProps = ${props
  .map((prop) => `"${prop}"`)
  .join("|\n")}`;

const filePath = path.resolve(
  __dirname,
  "../src/Theme/GeneratedKnownThemeProps.ts"
);

prettier.resolveConfig(path.resolve(filePath)).then((config) => {
  fs.writeFileSync(
    filePath,
    prettier.format(source, config || { parser: "babel" }),
    "utf-8"
  );
  console.log(
    `Extracted ${props.length} theme property. Written in ${filePath}`
  );
});

function flattenObj(obj, parent, res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + "." + key : key;
    if (typeof obj[key] == "object") {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}
