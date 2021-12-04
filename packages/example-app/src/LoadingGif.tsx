import { Img } from "@intellij-platform/core";
import React, { ComponentProps } from "react";
import loadingGif from "./resources/loading.gif";
import loadingDarkGif from "./resources/loading_dark.gif";

export const LoadingGif: React.FC = (
  props: Omit<ComponentProps<typeof Img>, "src" | "darkSrc" | "srcSet">
) => <Img {...props} src={loadingGif} darkSrc={loadingDarkGif} />;
