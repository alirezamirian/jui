import { ActionContext, ActionDefinition } from "@intellij-platform/core";
import { CallbackInterface, isRecoilValue, selector } from "recoil";
import { MaybeRecoilValue } from "./recoil-utils";

/**
 * Creates an action based on a recoil state and callbacks.
 * The action is created as a recoil selector, which means it only
 * updates when recoil values used in properties like isDisabled
 * are changed.
 */
export const createAction = <T,>({
  isSearchable,
  isDisabled,
  actionPerformed,
  ...params
}: Omit<ActionDefinition, "actionPerformed" | "isDisabled" | "isSearchable"> & {
  actionPerformed: (
    callbackInterface: CallbackInterface
  ) => (context: ActionContext) => T;
  isDisabled?: MaybeRecoilValue<boolean>;
  isSearchable?: MaybeRecoilValue<boolean>;
}) =>
  selector<ActionDefinition>({
    key: `action.${params.id}`,
    get: ({ get, getCallback }): ActionDefinition => {
      const resolve = <T,>(value: MaybeRecoilValue<T>): T =>
        isRecoilValue(value) ? get(value) : value;
      return {
        ...params,
        isDisabled: resolve(isDisabled),
        isSearchable: resolve(isSearchable),
        actionPerformed: getCallback(actionPerformed),
      };
    },
  });
