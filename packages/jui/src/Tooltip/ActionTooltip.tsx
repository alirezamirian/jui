import React from "react";
import { Tooltip } from "@intellij-platform/core/Tooltip/Tooltip";

export interface ActionTooltipProps {
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
}: ActionTooltipProps): JSX.Element => {
  return (
    <Tooltip>
      <Tooltip.Header>
        {actionName}
        {shortcut && <Tooltip.Shortcut>{shortcut}</Tooltip.Shortcut>}
      </Tooltip.Header>
    </Tooltip>
  );
};
