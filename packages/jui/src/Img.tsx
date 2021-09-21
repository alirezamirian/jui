import React, { ComponentProps } from "react";
import { useTheme } from "styled-components";
import { Theme } from "./Theme/Theme";

interface Props extends ComponentProps<"img"> {
  /**
   * src for when a dark theme is active. if `darkSrc` doesn't have a non-empty string value, src will be used both
   * for dark and light themes.
   */
  darkSrc?: string;
}
/**
 * Same as default `img`, but theme aware. Meaning that you can specify different sources for normal and dark mode.
 */
export const Img: React.FC<Props> = ({ darkSrc, ...props }) => {
  const theme = useTheme() as Theme;
  if (theme.dark) {
    return <img {...props} src={darkSrc || props.src} />;
  }
  return <img {...props} />;
};
