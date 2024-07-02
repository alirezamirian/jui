import { useMemo } from "react";
import { ActionDefinition, useActions } from "@intellij-platform/core";

/**
 * Currently, action groups are expected to **define** the child actions, instead of just referencing already defined
 * actions. In such model, where groups are not just a grouping of existing actions, this hook allows for redefining
 * existing actions to be used within a group. Kind of a temporary solution while action system evolves.
 */
export function useRedefineAction(
  actionId: string,
  newId: string
): ActionDefinition | null {
  const actions = useActions();
  const action = actions.find(({ id }) => id === actionId);

  return useMemo(() => {
    if (!action) {
      return null;
    }
    const { perform, id, ...commonProperties } = action;
    return {
      ...commonProperties,
      id: newId,
      useShortcutsOf: id,
      isSearchable: false,
      actionPerformed: (context) => {
        perform(context);
      },
    };
  }, [action]);
}
