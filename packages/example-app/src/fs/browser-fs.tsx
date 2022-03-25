// FIXME?: We are importing everything from browserFS, which might be too much, considering many backends it supports
import * as BrowserFS from "browserfs";
// @ts-expect-error: https://github.com/sindresorhus/pify/issues/74
import pify from "pify";
import LightningFS from "@isomorphic-git/lightning-fs";
import { BFSCallback } from "browserfs/src/core/file_system";
import FS, { FSModule } from "browserfs/dist/node/core/FS";

window.BrowserFS = BrowserFS;
// importing the type didn't work as expected
type FileSystem = Parameters<typeof BrowserFS["initialize"]>[0];

// not so accurate type.
export type PromisifiedFS = Omit<
  LightningFS.PromisifedFS, // borrowed from LightningFS
  "init" | "activate" | "deactivate"
> & { exists: (path: string) => Promise<boolean> };

export type FSModuleWithPromises = FSModule & {
  promises: PromisifiedFS;
};

export async function createInMemoryFS() {
  return await createFsBackend((cb) => {
    BrowserFS.FileSystem.InMemory.Create({}, cb);
  });
}

export async function createIndexedDBFS(storeName = "bfs-local-fs") {
  const idbfs = await createFsBackend((cb) => {
    BrowserFS.FileSystem.IndexedDB.Create({ storeName }, cb);
  });
  // @ts-expect-error wasted several hours on the following f*** line! The reason it's needed is a huge f*** blunder
  // in browserfs@2.0.0, in which IndexedDBFileSystem doesn't call the init function in Create function.
  // several things made this issue extremely hard to find and fix:
  // 1. the latest code on github is actually correct, but unpublished
  // 2. If browserfs@1.x is used even once, it will initialize the indexedDB correctly, which hides the v2 error.
  //    it exactly happened when trying to reproduce the issue on codesandbox: https://codesandbox.io/s/browser-fs-2-0-0-indexed-db-bug-5vuecr
  await new Promise((resolve) => idbfs.init(idbfs.store, resolve));
  return idbfs;
}

export function initializeFS(fsBackend: FileSystem): FSModuleWithPromises {
  BrowserFS.initialize(fsBackend);
  const fsm = BrowserFS.BFSRequire("fs");

  // @ts-expect-error
  fsm.promises = pify(fsm);
  return fsm as FSModuleWithPromises;
}

export const createFs = (backend: FileSystem): FS => {
  const fs = new (BrowserFS.BFSRequire("fs").FS)();
  fs.initialize(backend);
  return fs;
};

function createFsBackend(
  fn: (cb: BFSCallback<FileSystem>) => void
): Promise<FileSystem> {
  return new Promise((resolve, reject) => {
    fn((err, fs) => {
      if (err || !fs) {
        return reject(err);
      }
      resolve(fs);
    });
  });
}
