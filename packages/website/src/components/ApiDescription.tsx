import React from "react";
import Markdown from "markdown-to-jsx";
// @ts-expect-error ¯\_(ツ)_/¯
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

type WithDocGenInfo<T = any> = T & {
  __docgenInfo?: DocgenInfo;
};
/**
 * Renders description (aka Summary) of an exported symbol, from it's jsdoc (tsdoc) comment block.
 * The plan is to use the ApiModel created by @microsoft/api-extractor, but there are issues preventing that at the
 * moment. So we are using a fallback implementation which relies on `react-docgen` babel plugin which adds
 * `__docgetInfo` property to all exports.
 */
export const ApiDescription = ({
  of,
}: {
  of:
    | WithDocGenInfo
    | {
        render?: WithDocGenInfo /*for ref forwarding components */;
      };
}) => {
  const docgenInfo = of.render?.__docgenInfo || of.__docgenInfo;
  if (!docgenInfo?.description) {
    console.log("ApiDescription not found for:", of);
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === "development")
      return (
        <div style={{ background: "#ffd7d7" }}>
          Could not find API description for:
          <pre style={{ background: "none" }}>
            {JSON.stringify(of, null, 2)}
          </pre>
          See the console.
        </div>
      );
    throw new Error("API documentation not found.");
  }
  return (
    <Markdown options={{ overrides: MDXComponents }}>
      {deLinkify(docgenInfo.description)}
    </Markdown>
  );
};

/**
 * replaces jsdoc @link tags with inline code. Temporary hack until @microsoft/api-extractor-model is used.
 * Example: {@link something} will be converted to `something`
 */
const deLinkify = (description: string) => {
  const comment = toCommentBlock(description);
  return (parse(comment, [], (link) => `\`${link.text}\``).description as any)
    ?.value;
};

const toCommentBlock = (str: string) =>
  ["/**", ...str.split("\n").map((line) => `* ${line}`), "*/"].join("\n");
