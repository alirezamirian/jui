import { styled } from "../styled";

export type IconSize = 16;
const DEFAULT_ICON_SIZE: IconSize = 16;
export const StyledIconWrapper = styled.span<{
  size?: IconSize;
  useCurrentColor?: boolean;
}>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${({ size = DEFAULT_ICON_SIZE }) => `${size}px`};
  height: ${({ size = DEFAULT_ICON_SIZE }) => `${size}px`};
  position: relative; // to allow absolute positioned indicators and overlays on icon
`;
