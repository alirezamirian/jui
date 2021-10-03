import { Pressable, PressProps, useHover } from "@react-aria/interactions";
import { PlatformIcon } from "jui";
import React from "react";

/**
 * Close button for Tab
 */
export const TabCloseButton = (props: PressProps) => {
  const { isHovered, hoverProps } = useHover({});
  return (
    <Pressable {...hoverProps} {...props}>
      {isHovered ? (
        <PlatformIcon icon={"actions/closeHovered"} />
      ) : (
        <PlatformIcon icon={"actions/close"} />
      )}
    </Pressable>
  );
};
