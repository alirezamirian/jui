import React from "react";
import Code from "@theme-original/MDXComponents/Code";
import { InlineCode } from "../../components/component-linking";

/**
 * Wrapping the default Code component, to replace inline codes with links, if possible.
 * `Code` component is used only when rendering jsdoc descriptions. It's not used
 * when inline code in mdx files is rendered. For that, `inlineCode` entry is set
 * in swizzled `MDXComponents`.
 */
export default function CodeWrapper(props: {
  children: React.ReactNode;
}): JSX.Element {
  if (typeof props.children === "string") {
    return <InlineCode>{props.children}</InlineCode>;
  }
  return (
    <>
      <Code {...props} />
    </>
  );
}
