import path from "path";

export const FILE_ICON = "fileTypes/text";
export const DIR_ICON = "nodes/folder";

const extensionIconMap: Record<string, string> = {
  editorconfig: "nodes/editorconfig",
  js: "fileTypes/javaScript",
  gitignore: "vcs/ignore_file",
  archive: "fileTypes/archive",
  as: "fileTypes/as",
  config: "fileTypes/config",
  css: "fileTypes/css",
  dtd: "fileTypes/dtd",
  hpr: "fileTypes/hprof",
  htaccess: "fileTypes/htaccess",
  html: "fileTypes/html",
  idl: "fileTypes/idl",
  java: "fileTypes/java",
  jfr: "fileTypes/jfr",
  json: "fileTypes/json",
  jsp: "fileTypes/jsp",
  jspx: "fileTypes/jspx",
  manifest: "fileTypes/manifest",
  properties: "fileTypes/properties",
  txt: "fileTypes/text",
  wsdl: "fileTypes/wsdlFile",
  xhtml: "fileTypes/xhtml",
  xml: "fileTypes/xml",
  xsd: "fileTypes/xsdFile",
  yaml: "fileTypes/yaml",
};

export const getIconForFile = (filepath: string) => {
  const extension = getExtension(filepath);
  return extensionIconMap[extension] || FILE_ICON;
};

/**
 * A little different from path.extname(). For ".gitignore" path.extname returns "" while this returns "gitignore".
 */
const getExtension = (filepath: string): string =>
  filepath.split(".").pop() || "";

/**
 * @example
 * "/a/b/c.ext" => ["/a/b", "/a"]
 */
export function getParentPaths(
  filepath: string,
  upperLimit: string = path.sep
): string[] {
  return getParentPathsRecursive(filepath, upperLimit);
}

function getParentPathsRecursive(
  filepath: string,
  upperLimit: string,
  previousPaths: string[] = []
): string[] {
  const dirname = path.dirname(filepath);
  if (dirname !== upperLimit) {
    return [dirname].concat(
      getParentPathsRecursive(dirname, upperLimit, previousPaths)
    );
  }
  return previousPaths;
}
