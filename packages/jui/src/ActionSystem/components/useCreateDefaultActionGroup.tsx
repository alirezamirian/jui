import { flatten } from "ramda";
import React from "react";
import {
  ActionGroupDefinition,
  isActionGroupDefinition,
} from "@intellij-platform/core/ActionSystem/ActionGroup";
import { Popup, usePopupManager } from "@intellij-platform/core/Popup";
import {
  ActionContext,
  useGetActionShortcut,
} from "@intellij-platform/core/ActionSystem";
import { SpeedSearchMenu } from "@intellij-platform/core/Menu";
import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import { renderActionAsMenuItem } from "./ActionsMenu";

export const useCreateDefaultActionGroup = () => {
  const { show } = usePopupManager();
  const getActionShortcut = useGetActionShortcut();
  const openActionsInPopup = useEventCallback(
    (
      { children, title }: Pick<ActionGroupDefinition, "children" | "title">,
      context: ActionContext
    ) => {
      show(({ close }) => (
        <Popup.Layout
          content={
            /**
             * NOTE: It would be much nicer to use {@link ActionGroupMenu} component here. But the action group is not
             * yet provided when the group definition is being created. It seems like a sign of bad design that needs
             * to get addressed.
             */
            <SpeedSearchMenu
              aria-label={title}
              items={children}
              onAction={(key) => {
                // The need for calculating `allActions` is a consequence of the issue explained in the note above.
                const allActions = flatten(
                  children.map((item) =>
                    isActionGroupDefinition(item) ? item.children : item
                  )
                );
                const action = allActions.find((action) => action.id === key);
                if (action && !action.isDisabled) {
                  action.actionPerformed(context);
                }
              }}
              onClose={close}
              autoFocus="first"
            >
              {(item) =>
                renderActionAsMenuItem({
                  ...item,
                  // a consequence of the issue explained in the note above.
                  shortcut: getActionShortcut(item.id),
                })
              }
            </SpeedSearchMenu>
          }
          header={title}
        />
      ));
    }
  );

  return (
    groupDefinition: Omit<ActionGroupDefinition, "actionPerformed">
  ): ActionGroupDefinition => {
    return {
      isPopup: true,
      ...groupDefinition,
      actionPerformed: (context) =>
        openActionsInPopup(groupDefinition, context),
    };
  };
};
