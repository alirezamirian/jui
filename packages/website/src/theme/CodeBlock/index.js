/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { useTheme } from "styled-components";
import Playground from "./Playground";
import ReactLiveScope from "@theme/ReactLiveScope";
import CodeBlock from "@theme-init/CodeBlock";
import clsx from "clsx";
import styles from "../Playground/style-overrides.module.css";

const withLiveEditor = (Component) => {
  function WithLiveEditor(props) {
    if (props.live) {
      // idea: We can support playground with alternative sources, where each of them will show up as a button
      // below the default playground. Clicking on buttons will switch to that example. There can be a simple syntax
      // for embedding multiple sources in one code block which then will be converted into examples here.
      return <Playground scope={ReactLiveScope} {...props} />;
    }

    return <Component {...props} />;
  }

  return WithLiveEditor;
};

const withThemeBackground = (Component) => {
  function WithThemeBackground(props) {
    const theme = useTheme();
    const content = <Component {...props} />;
    const style = {
      "--ifm-list-item-margin": 0,
    };

    if (props.themed) {
      style.color = theme.color("*.foreground");
      style["--ifm-pre-background"] = theme.color("*.background");
      style["--ifm-code-background"] = "none";
    }
    return (
      <div
        style={style}
        className={clsx(styles.playground, {
          [styles.noPadding]: props.noPadding,
        })}
      >
        {content}
      </div>
    );
  }

  return WithThemeBackground;
};

export default withThemeBackground(withLiveEditor(CodeBlock));
