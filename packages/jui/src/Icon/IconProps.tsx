import React, { CSSProperties, HTMLProps } from "react";

export type IconSize = 16;

export interface IconProps
  extends Omit<HTMLProps<HTMLSpanElement>, "ref" | "as"> {
  size?: IconSize; // more options may be added here
  style?: CSSProperties;
  className?: string;
  /**
   * Additional node going into the icon wrapper. Such as indicators.
   */
  children?: React.ReactNode;
}
