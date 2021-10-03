export const FILE_ICON = "fileTypes/text";

const extensionIconMap: Record<string, string> = {
  editorconfig: "nodes/editorconfig",
  json: "fileTypes/json",
  js: "fileTypes/javaScript",
  css: "fileTypes/css",
  yaml: "fileTypes/yaml",
  java: "fileTypes/java",
  xml: "fileTypes/xml",
  html: "fileTypes/html",
  xhtml: "fileTypes/xhtml",
  gitignore: "vcs/ignore_file",
};

export const getIconForFile = (path: string) => {
  const extension = path.split(".").pop();
  return extensionIconMap[extension || ""] || FILE_ICON;
};

export const getFilename = (path: string) => path.split("/").pop();
