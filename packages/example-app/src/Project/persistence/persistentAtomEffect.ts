import { Checker } from "@recoiljs/refine";
import { syncEffect } from "recoil-sync";
import { DefaultValue } from "recoil";

export enum StorageFiles {
  WORKSPACE_FILE = "$WORKSPACE_FILE$",
}

export type PersistentAtomEffectArgs<C, A> = {
  read: (componentState: C) => Promise<A> | A;
  update: (value: A) => (componentState: C) => C;
  refine: Checker<A>;
  componentName: string;
  storageFile?: string;
};

export function persistentAtomEffect<A, C>({
  componentName,
  refine,
  read,
  update,
  storageFile = StorageFiles.WORKSPACE_FILE,
}: PersistentAtomEffectArgs<C, A>) {
  const itemKey = [storageFile, componentName].join("|");
  return syncEffect<A>({
    storeKey: "ProjectWorkspace",
    itemKey,
    syncDefault: false,
    read: async ({ read: readComponentState }) => {
      return read((await readComponentState(itemKey)) as C);
    },
    write: ({ write, read }, value) => {
      if (!(value instanceof DefaultValue)) {
        write(itemKey, update(value));
      }
    },
    refine,
  });
}
