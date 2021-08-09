import { styled } from "../styled";

export type IconSize = 16;
const DEFAULT_ICON_SIZE: IconSize = 16;
export const StyledIconWrapper = styled.span<{ size?: IconSize }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({ size = DEFAULT_ICON_SIZE }) => `${size}px`};
  height: ${({ size = DEFAULT_ICON_SIZE }) => `${size}px`};

  // Perhaps not so scalable to blindly change fill like this, but they have hard coded colors that should be
  // changed to currentColor. Will look for a better approach if it started to fail for some.
  svg rect,
  svg path,
  svg polygon {
    fill: currentColor;
  }
`;
