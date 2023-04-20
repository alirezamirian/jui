import { useKeymap } from "./KeymapProvider";
import { shortcutToString } from "./shortcutToString";
import { Action, useActions } from "./ActionsProvider";
import { notNull } from "@intellij-platform/core/utils/array-utils";

// TODO: support multi-level grouping
export const useActionGroup = (actionIds: string[]): Action[] => {
  const actions = useActions();
  const keymap = useKeymap();
  return actionIds
    .map((actionId) => {
      const action = actions.find(({ id }) => id === actionId);
      if (!action) {
        return null;
      }
      const shortcut = keymap?.[actionId]?.[0];
      return {
        ...action,
        id: actionId,
        shortcut: shortcut ? shortcutToString(shortcut) : undefined,
      };
    })
    .filter(notNull);
};
