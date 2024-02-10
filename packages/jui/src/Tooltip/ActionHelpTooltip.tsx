import React from "react";
import { Tooltip, TooltipProps } from "@intellij-platform/core/Tooltip/Tooltip";

export interface ActionHelpTooltipProps
  extends Omit<TooltipProps, "children" | "multiline"> {
  actionName: React.ReactNode;
  helpText: React.ReactNode;
  shortcut?: React.ReactNode;
  link?: React.ReactNode;
}

/**
 * Tooltip of type "Action Help"
 * @see {@link ActionTooltip} {@link HelpTooltip}
 * @see https://jetbrains.github.io/ui/controls/tooltip/#02
 */
export const ActionHelpTooltip = ({
  actionName,
  helpText,
  shortcut,
  link,
  ...tooltipProps
}: ActionHelpTooltipProps): JSX.Element => {
  return (
    <Tooltip multiline {...tooltipProps}>
      <Tooltip.Header>
        {actionName}
        {shortcut && <Tooltip.Shortcut>{shortcut}</Tooltip.Shortcut>}
      </Tooltip.Header>
      <Tooltip.Description>{helpText}</Tooltip.Description>
      {link && <Tooltip.Link>{link}</Tooltip.Link>}
    </Tooltip>
  );
};
