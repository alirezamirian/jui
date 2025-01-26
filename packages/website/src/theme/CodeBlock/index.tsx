/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ComponentType } from "react";
import { useTheme } from "@intellij-platform/core";
import Playground from "./Playground";
import ReactLiveScope from "@theme/ReactLiveScope";
import type { Props as CodeBlockProps } from "@theme/CodeBlock";
import CodeBlock from "@theme-init/CodeBlock";
import clsx from "clsx";
import styles from "../Playground/style-overrides.module.css";

const withLiveEditor = <P extends CodeBlockProps & { live?: boolean }>(
  Component: ComponentType<P>
) => {
  function WithLiveEditor(props: P) {
    if (typeof props.children !== "string") {
      throw new Error(
        `unexpected non-string code block children: ${props.children}`
      );
    }
    if (props.live) {
      // idea: We can support playground with alternative sources, where each of them will show up as a button
      // below the default playground. Clicking on buttons will switch to that example. There can be a simple syntax
      // for embedding multiple sources in one code block which then will be converted into examples here.
      return (
        <Playground scope={ReactLiveScope} {...props}>
          {props.children}
        </Playground>
      );
    }

    return <Component {...props} />;
  }

  return WithLiveEditor;
};

const withThemeBackground = <P extends CodeBlockProps>(
  Component: ComponentType<P>
) => {
  function WithThemeBackground(props: P) {
    const theme = useTheme();
    const content = <Component {...props} />;
    const style: Record<string, string | number | undefined> = {
      "--ifm-list-item-margin": 0,
    };

    const flags = props.metastring?.split(" ") ?? [];
    const themed = flags.includes("themed");
    if (themed) {
      style.color = theme.color("*.foreground");
      style["--ifm-pre-background"] = theme.color("*.background");
      style["--ifm-code-background"] = "none";
    }
    return (
      <div
        style={style}
        className={clsx(styles.playground, {
          [styles.noPadding]: flags.includes("noPadding"),
        })}
      >
        {content}
      </div>
    );
  }

  return WithThemeBackground;
};

export default withThemeBackground(withLiveEditor(CodeBlock));
