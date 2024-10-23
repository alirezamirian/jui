import { Checker } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";
import { DefaultValue } from "recoil";
import { ensureArray, MaybeArray } from "../../ensureArray";

export enum StorageFiles {
  WORKSPACE_FILE = "$WORKSPACE_FILE$",
}

export type PersistentAtomEffectArgs<A, C> = {
  read: (componentState: C | undefined) => Promise<A> | A;
  update: (value: A) => (componentState: C) => C;
  refine: Checker<A>;
  componentName: string;
  itemKey?: string;
  storageFile?: string;
};

export function persistentAtomEffect<A, C>({
  componentName,
  refine,
  read,
  update,
  storageFile = StorageFiles.WORKSPACE_FILE,
  itemKey = [storageFile, componentName].join("|"),
}: PersistentAtomEffectArgs<A, C>) {
  return syncEffect<A>({
    storeKey: "ProjectWorkspace",
    itemKey,
    syncDefault: false,
    read: async ({ read: readComponentState }) => {
      return read((await readComponentState(itemKey)) as C);
    },
    write: async ({ write, read }, value) => {
      // Note: currently, reading the recoil value for the first time also results in a call to write.
      // It's maybe a bug in recoil-sync?
      if (!(value instanceof DefaultValue)) {
        write(itemKey, update(value));
      }
    },
    refine,
  });
}

interface SettingComponentWithOptions<O> {
  option?: MaybeArray<
    {
      "@name": string;
    } & O
  >;
}

/**
 * Wrapper around persistentAtomEffect to read/write from/to with a single
 * `option` tag in a component, based on the option `name` attribute.
 */
persistentAtomEffect.option = <A, O>({
  optionName,
  read,
  update,
  ...args
}: {
  optionName: string;
} & PersistentAtomEffectArgs<A, O>) =>
  persistentAtomEffect<A, SettingComponentWithOptions<O>>({
    ...args,
    itemKey: [args.storageFile, args.componentName, optionName].join("|"),
    read: (settings) => {
      return read(
        ensureArray(settings?.option)?.find(
          (item) => item["@name"] === optionName
        )
      );
    },
    update:
      (value) =>
      (currentSettings): SettingComponentWithOptions<O> => {
        return {
          option: ensureArray(currentSettings?.option).map((option) => {
            const updates = update(value)(option);
            console.log(
              `updating ${optionName}`,
              "currentSettings",
              currentSettings,
              "updates",
              updates
            );

            return option["@name"] === optionName
              ? {
                  "@name": optionName,
                  ...updates,
                }
              : option;
          }),
        };
      },
  });
