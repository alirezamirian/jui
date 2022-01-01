import { Pressable, PressProps } from "@react-aria/interactions";

import React from "react";
import { PlatformIcon } from "../Icon";
import { styled } from "../styled";

const StyledIconWrapper = styled.span`
  display: inherit;
  .icon.hover {
    display: none;
  }
  &:hover {
    .icon {
      display: none;
    }
    .icon.hover {
      display: unset;
    }
  }
`;
/**
 * Close button for Tab
 */
export const TabCloseButton = (props: PressProps) => {
  // using useHover proved to be unstable.
  return (
    <Pressable {...props}>
      <StyledIconWrapper>
        <PlatformIcon icon={"actions/closeHovered"} className="icon hover" />
        <PlatformIcon icon={"actions/close"} className="icon" />
      </StyledIconWrapper>
    </Pressable>
  );
};
