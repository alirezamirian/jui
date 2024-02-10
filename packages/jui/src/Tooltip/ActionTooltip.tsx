import React from "react";
import { Tooltip, TooltipProps } from "@intellij-platform/core/Tooltip/Tooltip";

export interface ActionTooltipProps
  extends Omit<TooltipProps, "children" | "multiline"> {
  actionName: React.ReactNode;
  shortcut?: React.ReactNode;
}

/**
 * Tooltip of type "Action"
 * @see {@link ActionHelpTooltip} {@link HelpTooltip}
 * @see https://jetbrains.github.io/ui/controls/tooltip/#02
 */
export const ActionTooltip = ({
  actionName,
  shortcut,
  ...tooltipProps
}: ActionTooltipProps): JSX.Element => {
  return (
    <Tooltip {...tooltipProps}>
      <Tooltip.Header>
        {actionName}
        {shortcut && <Tooltip.Shortcut>{shortcut}</Tooltip.Shortcut>}
      </Tooltip.Header>
    </Tooltip>
  );
};
