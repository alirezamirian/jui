import { useAction } from "./ActionsProvider";
import {
  isResolvedActionGroup,
  ResolvedActionGroup,
} from "@intellij-platform/core/ActionSystem/ActionGroup";

export const useActionGroup = (
  actionGroupId: string
): ResolvedActionGroup | null => {
  const action = useAction(actionGroupId);
  if (action) {
    if (isResolvedActionGroup(action)) {
      return action;
    }
    throw new Error(`Action with id ${actionGroupId} is not a group`);
  }
  return null;
};
