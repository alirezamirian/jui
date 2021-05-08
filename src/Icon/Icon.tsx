import React, { CSSProperties, HTMLProps, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { styled } from "../styled";
import { Theme } from "../Theme/Theme";

interface IconProps extends Omit<HTMLProps<HTMLSpanElement>, "ref" | "as"> {
  themeIcon: string | { path: string; fallback: string };
  size?: 16; // more options may be added here
  style?: CSSProperties;
  className?: string;
}

export type IconSize = 16;

const StyledIconWrapper = styled.span<{ size: IconSize }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`;

export function Icon({ themeIcon, size = 16, ...props }: IconProps) {
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  const [svg, setSvg] = useState("");
  useEffect(() => {
    const fetchIcon = async () => {
      if (!themeIcon) {
        console.error("invalid icon src", themeIcon);
        return;
      }
      const path = typeof themeIcon === "object" ? themeIcon.path : themeIcon;
      const fallback =
        typeof themeIcon === "object" ? themeIcon.fallback : undefined;
      const svg = await theme.icon(path, fallback);

      if (svg) {
        setSvg(svg);
      } else {
        console.error("Could not resolve icon:", themeIcon);
      }
    };
    fetchIcon().catch(console.error);
  }, [themeIcon]);

  return (
    <StyledIconWrapper
      data-src={themeIcon}
      size={size}
      {...props}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
