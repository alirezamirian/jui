import { FSModule } from "browserfs/dist/node/core/FS";
import * as BrowserFS from "browserfs";
// @ts-expect-error: who needs types for pify here
import pify from "pify";
import LightningFS from "@isomorphic-git/lightning-fs"; // transitive dependency! 😱 😁

export type CustomizedBrowserFsBackend = FSModule & {
  promises: LightningFS["promises"];
};

// TODO: We are importing everything from browserFS, which might be too much, considering many backends it supports
//  we may want to change imports somehow to improve this. Check the bundle first.
export async function createBrowserFsBackend() {
  return new Promise<CustomizedBrowserFsBackend>((resolve) => {
    BrowserFS.configure({ fs: "InMemory", options: {} }, function (err) {
      if (err) {
        return console.error(err);
      }
      // ugly with many ts errors, but who cares for now :D
      // @ts-ignore
      const fs: CustomizedBrowserFsBackend = BrowserFS.BFSRequire("fs");
      // @ts-ignore
      fs.promises = {};
      Object.keys(fs).forEach((key) => {
        // @ts-ignore
        if (typeof fs[key] === "function") {
          // @ts-ignore
          fs.promises[key] = pify(fs[key]);
        }
      });
      resolve(fs);
    });
  });
}
