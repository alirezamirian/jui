import { Theme } from "../Theme/createTheme";
import React, { CSSProperties, HTMLProps, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { styled } from "../styled";

interface IconProps extends Omit<HTMLProps<HTMLSpanElement>, "ref" | "as"> {
  icon: string | ((theme: Theme) => string);
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

export function Icon({ icon, size = 16, ...props }: IconProps) {
  const theme = useTheme();
  const [svg, setSvg] = useState("");
  const srcValue = typeof icon === "function" ? icon(theme) : icon;
  useEffect(() => {
    const fetchIcon = async () => {
      if (!srcValue) {
        console.error("invalid icon src", srcValue);
        return;
      }
      const url = !srcValue.startsWith("http")
        ? `https://raw.githubusercontent.com/JetBrains/intellij-community/master/platform/platform-impl/src/${srcValue}`
        : srcValue;
      const response = await fetch(url);
      setSvg(await response.text());
    };
    fetchIcon().catch(console.error);
  }, [srcValue]);

  return (
    <StyledIconWrapper
      data-src={srcValue}
      size={size}
      {...props}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
