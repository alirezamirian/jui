import React, { useMemo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { GlobalPluginData } from "@docusaurus/plugin-content-docs/lib/client";
import { parse } from "jsdoc-parse-plus";
import Link from "@docusaurus/Link";

function useDocs() {
  return (
    useDocusaurusContext().globalData["docusaurus-plugin-content-docs"]
      .default as GlobalPluginData
  ).versions.find((version) => version.name === "current")?.docs;
}

/**
 * Returns a mapping from component names to documentation pages. We don't have a proper API
 * Docs section now, so not all components have a corresponding page. But it's a middle ground solution
 * until a more structured API documentation page is added, and mdx files are limited to guides, introductions, etc.
 */
export function useComponentLinkMap(): { [componentName: string]: string } {
  const docs = useDocs();
  return useMemo(() => {
    const linkMap: Record<string, string> = {};
    docs?.forEach((doc) => {
      // maybe change the criteria based on sidebar later, if components are moved to a dedicated sidebar
      const componentName = doc.id.match(/components\/(.*)/)?.[1];
      if (componentName) {
        linkMap[componentName] = doc.path;
      }
    });
    return linkMap;
  }, [docs]);
}

/**
 * A replacement for `code` elements in documentation, which renders a link
 * to the corresponding page, if the code snippet exactly matches one of
 * the components.
 */
export function InlineCode({ children }: { children: string }) {
  const link = useComponentLinkMap()[children];
  if (link) {
    return <Link to={link}>{children}</Link>;
  }
  return <code>{children}</code>;
}

/**
 * Converts links in the form of "{\@link SomeComponent}" to Markdown link
 * format ("[SomeComponent](./path/to/component/page)"), which otherwise will
 * not be rendered as a link, due to missing url.
 */
export function useAutoLinkedJsDoc(content: string) {
  const componentLinkMap = useComponentLinkMap();
  const comment = toCommentBlock(content);
  return (
    parse(comment, [], (link) => {
      const path = componentLinkMap[link.url];
      if (path) {
        return `[${link.text}](${path})`;
      }
      return `\`${link.text}\``;
    }).description as any
  )?.value;
}

const toCommentBlock = (str: string) =>
  ["/**", ...str.split("\n").map((line) => `* ${line}`), "*/"].join("\n");
