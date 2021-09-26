import { Img } from "jui";
import React from "react";
import loadingGif from "./resources/loading.gif";
import loadingDarkGif from "./resources/loading_dark.gif";

export const LoadingGif: React.FC = () => (
  <Img src={loadingGif} darkSrc={loadingDarkGif} />
);
