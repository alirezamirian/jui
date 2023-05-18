import { ActionGroup } from "@intellij-platform/core/ActionSystem";
import React from "react";
import { ActionMenuProps, ActionsMenu } from "./ActionsMenu";

export type ActionGroupMenuProps = Omit<ActionMenuProps, "actions"> & {
  actionGroup: ActionGroup;
};
/**
 * Renders children of an action group as a menu
 *
 * TODO: handle isPopup in children groups to render the child group as either a section or submenu
 */
export const ActionGroupMenu = ({
  actionGroup,
  ...props
}: ActionGroupMenuProps) => {
  return (
    <ActionsMenu
      aria-label={actionGroup.title}
      actions={actionGroup.children}
      {...props}
    />
  );
};
