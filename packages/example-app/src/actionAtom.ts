import { atom, Getter, Setter, WritableAtom } from "jotai";
import { unwrap } from "jotai/utils";
import { ActionDefinition } from "@intellij-platform/core";
import { isAtom, MaybeAtom, MaybeAtomAsync } from "./atom-utils/isAtom";

type PerformActionArgs = Parameters<ActionDefinition["actionPerformed"]>;
/**
 *
 */
export const actionAtom = <T>({
  isSearchable: isSearchableValue,
  isDisabled: isDisabledValue,
  actionPerformed,
  ...params
}: Omit<ActionDefinition, "actionPerformed" | "isDisabled" | "isSearchable"> & {
  actionPerformed: (
    state: { get: Getter; set: Setter },
    ...args: PerformActionArgs
  ) => void | Promise<void>;
  isDisabled?: MaybeAtomAsync<boolean>;
  isSearchable?: MaybeAtomAsync<boolean>;
}): WritableAtom<ActionDefinition, PerformActionArgs, Promise<void>> => {
  const isDisabled = isAtom(isDisabledValue)
    ? unwrap(isDisabledValue, () => true)
    : isDisabledValue;
  const isSearchable = isAtom(isSearchableValue)
    ? unwrap(isSearchableValue, () => false)
    : isSearchableValue;

  return atom(
    (get, { setSelf }): ActionDefinition => {
      const resolve = <T>(maybeAtom: MaybeAtom<T> | undefined) => {
        return isAtom(maybeAtom) ? get(maybeAtom) : maybeAtom;
      };

      return {
        ...params,
        isDisabled: resolve(isDisabled),
        isSearchable: resolve(isSearchable),
        actionPerformed: setSelf,
      };
    },
    async (get, set, ...args: PerformActionArgs) => {
      return actionPerformed({ get, set }, ...args);
    }
  );
};
