export const FILE_ICON = "fileTypes/text";
export const DIR_ICON = "nodes/folder";

const extensionIconMap: Record<string, string> = {
  editorconfig: "nodes/editorconfig",
  js: "fileTypes/javaScript",
  gitignore: "vcs/ignore_file",
  archive: "filetypes/archive",
  as: "filetypes/as",
  config: "filetypes/config",
  css: "filetypes/css",
  dtd: "filetypes/dtd",
  hpr: "filetypes/hprof",
  htaccess: "filetypes/htaccess",
  html: "filetypes/html",
  idl: "filetypes/idl",
  java: "filetypes/java",
  jfr: "filetypes/jfr",
  json: "filetypes/json",
  jsp: "filetypes/jsp",
  jspx: "filetypes/jspx",
  manifest: "filetypes/manifest",
  properties: "filetypes/properties",
  txt: "filetypes/text",
  wsdl: "filetypes/wsdlFile",
  xhtml: "filetypes/xhtml",
  xml: "filetypes/xml",
  xsd: "filetypes/xsdFile",
  yaml: "filetypes/yaml",
};

export const getIconForFile = (filepath: string) => {
  const extension = getExtension(filepath);
  return extensionIconMap[extension || ""] || FILE_ICON;
};

export const getExtension = (filepath: string): string | undefined =>
  filepath.split(".").pop();

export const getFilename = (filepath: string): string =>
  filepath.split("/").pop() || filepath;
