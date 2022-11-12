import React from "react";
import { useAction, Shortcut } from "@intellij-platform/core/ActionSystem";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";
import { getActivateToolWindowActionId } from "./useToolWindowsActions";

const getToolWindowNumberFromShortcut = (shortcut: Shortcut): number | null => {
  const isNumericShortcut =
    shortcut.type === "keyboard" &&
    /^[0-9]$/.test(shortcut.firstKeyStroke.key) &&
    shortcut.firstKeyStroke.modifiers?.length === 1 &&
    ["Alt", "Meta", "Control"].includes(shortcut.firstKeyStroke.modifiers[0]);
  if (isNumericShortcut) {
    return parseInt(shortcut.firstKeyStroke.key);
  }
  return null;
};

/**
 * Default UI for the toolbar button (aka. stripe button) of the tool window.
 * - Renders the title and icon for the tool window
 * - Optionally shows the number before the title, if a numeric shortcut is set for the corresponding ActivateToolWindow
 *   action, in the currently applied keymap.
 * - Adds an Action Tooltip
 */
export const DefaultToolWindowToolbarButton = ({
  id,
  title,
  icon,
  showNumber = true,
}: {
  id: React.Key;
  title: string;
  icon: React.ReactNode;
  showNumber?: boolean;
}) => {
  const action = useAction(getActivateToolWindowActionId(`${id}`));

  const number = action?.shortcuts
    ?.map(getToolWindowNumberFromShortcut)
    .find(Number.isInteger);
  return (
    <TooltipTrigger
      tooltip={<ActionTooltip actionName={title} shortcut={action?.shortcut} />}
    >
      <span>
        {icon}
        &nbsp;
        {number != null && showNumber ? (
          <>
            <u>{number}</u>:&nbsp;
          </>
        ) : null}
        {title}
      </span>
    </TooltipTrigger>
  );
};
