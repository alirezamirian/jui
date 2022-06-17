import React from "react";
import Markdown from "markdown-to-jsx";
import { DocgenInfo } from "@storybook/addon-docs/dist/ts3.9/lib/docgen/types";
import MDXComponents from "@theme/MDXComponents";
import { parse } from "jsdoc-parse-plus";
// import { ApiModel, ApiPackage } from "@microsoft/api-extractor-model";

// const apiModel: ApiModel = new ApiModel();
// language=file-reference
// const apiPackage: ApiPackage = apiModel.loadPackage(
//   "../../../jui/temp/core.api.json"
// );
// console.log("apiPackage", ApiPackage);

/**
 * Renders description (aka Summary) of an exported symbol, from it's jsdoc (tsdoc) comment block.
 * The plan is to use the ApiModel created by @microsoft/api-extractor, but there are issues preventing that at the
 * moment. So we are using a fallback implementation which relies on `react-docgen` babel plugin which adds
 * `__docgetInfo` property to all exports.
 */
export const ApiDescription = ({
  of,
}: {
  of: React.ComponentType & { __docgenInfo: DocgenInfo };
}) => {
  return (
    <Markdown options={{ overrides: MDXComponents }}>
      {deLinkify(of.__docgenInfo.description)}
    </Markdown>
  );
};

/**
 * replaces jsdoc @link tags with inline code. Temporary hack until @microsoft/api-extractor-model is used.
 * Example: {@link something} will be converted to `something`
 */
const deLinkify = (description: string) => {
  const comment = toCommentBlock(description);
  return parse(comment, [], (link) => `\`${link.text}\``).description?.value;
};

const toCommentBlock = (str: string) =>
  ["/**", ...str.split("\n").map((line) => `* ${line}`), "*/"].join("\n");
