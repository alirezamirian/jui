import * as BrowserFS from "browserfs";
import React from "react";
import {
  createFs,
  createIndexedDBFS,
  createInMemoryFS,
  FSModuleWithPromises,
  initializeFS,
} from "./browser-fs";
import { copyFs } from "./fs-utils";

/**
 * local fs, for when used in browser. Most of the things here would be a noop in node environment.
 */
export let fs: FSModuleWithPromises;

const localStorageSetting = <Enum extends string>(key: string) => ({
  get: () => localStorage.getItem(key) as Enum | undefined,
  set: (value: Enum) => localStorage.setItem(key, value),
});
/**
 * Global fs preferences for which the file system itself can't be used as storage.
 */
export const persistentFsPreference = localStorageSetting<"yes" | "no">(
  "demo_app_use_persistent_fs"
);

// NOTE: Maybe we can make this module side-effect free by lazy initializing fsPromise, in WaitForFs, if it's enough
// to assume any code requiring FS is executed via components rendered inside WaitForFs.
// Also, we can gather exports of this file into an interface to make it easier to provide two implementations, for
// browser and node.
const fsPromise: Promise<FSModuleWithPromises> = (persistentFsPreference.get() ===
"yes"
  ? createIndexedDBFS()
  : createInMemoryFS()
)
  .then(initializeFS)
  .then((theFs) => {
    (window as any).fs = theFs;
    return (fs = theFs);
  })
  .catch((e) => {
    console.log("could not initialize FS:", e);
    throw e;
  });

export function isFsInMemory() {
  return fs.getRootFS() instanceof BrowserFS.FileSystem.InMemory;
}

export async function switchToPersistentFS({
  onCopy = console.log,
  cancelSignal,
}: {
  onCopy?: (filepath: string) => void;
  cancelSignal?: unknown;
} = {}) {
  if (!isFsInMemory()) {
    console.log("Already on persistent fs. Nothing to do.");
    return;
  }
  console.log("Creating IndexedDB FS");
  console.time("creating db");
  const indexedDbFsBackend = await createIndexedDBFS();

  await copyFs({
    source: fs,
    target: await createFs(indexedDbFsBackend),
    cancelSignal,
    force: true,
    onCopy,
  });
  console.timeEnd("creating db");

  initializeFS(indexedDbFsBackend);
  // persistentFsPreference.set("yes");
  console.log("FS switched to IndexedDB backend", indexedDbFsBackend);
}

const fsResource = wrapPromise(fsPromise);

/**
 * Suspense aware wrapper for waiting for FS to be initialized. initialization API in some fs backends such as
 * BrowserFs, is async. That's why it's safe to use this on a high level.
 */
export const WaitForFs: React.FC = ({ children }) => {
  fsResource.read();
  return children as React.ReactElement;
};

/**
 * wrapPromise util for suspense for arbitrary async operation, represented as a promise.
 */
function wrapPromise<T>(promise: Promise<T>) {
  let status = "pending";
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );
  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}
