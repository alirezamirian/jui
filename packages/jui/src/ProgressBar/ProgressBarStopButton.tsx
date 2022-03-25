import React, { useRef } from "react";
import { AutoHoverPlatformIcon } from "@intellij-platform/core/Icon";
import { useProgressBarIconButton } from "./ProgressBar";

interface ProgressBarCancelButtonProps {
  /**
   * whether small icon should be used.
   */
  small?: boolean;
  onPress: () => void;
}

/**
 * Stop (cancel) icon button for progress bar, to be used in {@link ProgressBarProps#button}.
 */
export const ProgressBarStopButton = ({
  small,
  onPress,
}: ProgressBarCancelButtonProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { buttonProps } = useProgressBarIconButton(
    { onPress, hoverTooltip: "Cancel" },
    ref
  );
  return (
    <AutoHoverPlatformIcon
      ref={ref}
      {...buttonProps}
      icon={`process/stop${small ? "Small" : ""}.svg`}
      hoverIcon={`process/stop${small ? "Small" : ""}Hovered.svg`}
    />
  );
};
