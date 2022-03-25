import React, { useRef } from "react";
import { AutoHoverPlatformIcon } from "@intellij-platform/core/Icon";
import { useProgressBarPauseIconButton } from "./ProgressBar";

interface ProgressBarPauseButtonProps {
  /**
   * Whether progress is paused.
   */
  paused: boolean;
  /**
   * Called when progress is paused or resumed.
   * @param paused `true` when progress is being paused. `false` when resumed.
   */
  onPausedChange: (paused: boolean) => void | Promise<unknown>;

  /**
   * whether small icon should be used.
   */
  small?: boolean;
}

/**
 * Pause/Resume icon button for progress bar, to be used in {@link ProgressBarProps#button}.
 */
export const ProgressBarPauseButton = ({
  paused,
  onPausedChange,
  small,
}: ProgressBarPauseButtonProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { buttonProps } = useProgressBarPauseIconButton(
    {
      onPress: () => onPausedChange(!paused),
      hoverTooltip: paused ? "Resume" : "Pause",
      paused,
    },
    ref
  );
  return (
    <AutoHoverPlatformIcon
      {...buttonProps}
      icon={
        paused
          ? `process/progressResume${small ? "Small" : ""}.svg`
          : `process/progressPause${small ? "Small" : ""}.svg`
      }
    />
  );
};
