import React from "react";
import { Tooltip } from "@intellij-platform/core/Tooltip/Tooltip";

export interface HelpTooltipProps {
  helpText: React.ReactNode;
  shortcut?: React.ReactNode;
  link?: React.ReactNode;
}

/**
 * Tooltip of type "Help"
 * @see {@link ActionTooltip} {@link ActionHelpTooltip}
 * @see https://jetbrains.github.io/ui/controls/tooltip/#02
 */
export const HelpTooltip = ({
  helpText,
  shortcut,
  link,
}: HelpTooltipProps): JSX.Element => {
  return (
    <Tooltip multiline>
      <Tooltip.Header>{helpText}</Tooltip.Header>
      <div>
        <Tooltip.Shortcut>{shortcut}</Tooltip.Shortcut>
      </div>
      {link && <Tooltip.Link>{link}</Tooltip.Link>}
    </Tooltip>
  );
};
