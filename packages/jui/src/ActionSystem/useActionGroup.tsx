import { useKeymap } from "./KeymapProvider";
import { shortcutToString } from "./shortcutToString";
import { Action, useActions } from "./ActionsProvider";

// TODO: support multi-level grouping
export const useActionGroup = (actionIds: string[]): Action[] => {
  const actionContext = useActions();
  const keymap = useKeymap();
  return actionIds
    .filter((actionId) => actionContext[actionId])
    .map((actionId) => {
      const action = actionContext[actionId];
      const shortcut = keymap?.[actionId]?.[0];
      return {
        ...action,
        id: actionId,
        shortcut: shortcut ? shortcutToString(shortcut) : undefined,
      };
    });
};
