import LightningFS from "@isomorphic-git/lightning-fs";
import React from "react";
import {
  createBrowserFsBackend,
  CustomizedBrowserFsBackend,
} from "./createBrowserFsBackend";

export let fs: CustomizedBrowserFsBackend | LightningFS;

let fsPromise = createFS().then((theFs) => (fs = theFs));

async function createFS(): Promise<CustomizedBrowserFsBackend | LightningFS> {
  // We ended up using BrowserFS InMemory, because of low performance of IndexedDB used in LightningFS.
  // There might be room for investigation and improvement regarding FS backend, but an InMemory backend should be
  // good enough for now, and we can simply toggle the following lines to switch to locally persisted IndexedDB-based
  // backend. Note that since LightningFS persists data locally, it's slow only in the clone time

  // return new LightningFS("fs", { wipe: false }); // LightningFS is slow because of IndexedDB :(
  return createBrowserFsBackend();
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
