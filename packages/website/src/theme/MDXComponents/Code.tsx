import React from "react";
import Code from "@theme-original/MDXComponents/Code";
import type { Props } from "@theme/CodeBlock";
import { InlineCode } from "../../components/component-linking";

/**
 * Wrapping the default Code component, to replace inline codes with links, if possible.
 * `Code` component is used only when rendering jsdoc descriptions. It's not used
 * when inline code in mdx files is rendered. For that, `inlineCode` entry is set
 * in swizzled `MDXComponents`.
 */
export default function CodeWrapper(props: Props): JSX.Element {
  // Code is used to render both `something` and ```something```.
  // There is no prop to distinguish code blocks from inline codes
  // but it seems like code blocks always have more props, like className
  const isInlineCode = Object.keys(props).length === 1;
  if (typeof props.children === "string" && isInlineCode) {
    return <InlineCode>{props.children}</InlineCode>;
  }
  return (
    <>
      <Code {...props} />
    </>
  );
}
