import { z } from "zod";
import { atom } from "jotai";
import { Bounds } from "@intellij-platform/core";

import { atomWithPersistence, StoragePathMacros } from "../atomWithPersistence";
import { maybeArray } from "../schema-utils";

type WindowState = {
  [key: string]: {
    bounds: Bounds;
    screen: Bounds;
    timestamp: number;
  };
};
const numberFromString = z.union([z.string(), z.number()]).transform(Number);
const windowStateSchema = z.object({
  state: maybeArray(
    z.object({
      "@x": numberFromString,
      "@y": numberFromString,
      "@width": numberFromString,
      "@height": numberFromString,
      "@key": z.string(),
      "@timestamp": numberFromString,
      screen: z.object({
        "@x": numberFromString,
        "@y": numberFromString,
        "@width": numberFromString,
        "@height": numberFromString,
      }),
    })
  ),
});
const persistedWindowStateAtom = atomWithPersistence({
  storageFile: StoragePathMacros.PRODUCT_WORKSPACE_FILE,
  componentName: "WindowStateProjectService",
  schema: windowStateSchema.optional(),
  read: (s): WindowState => {
    return (
      s?.state.reduce(
        (soFar, state) =>
          Object.assign(soFar, {
            [state["@key"]]: {
              bounds: {
                left: state["@x"],
                top: state["@y"],
                width: state["@width"],
                height: state["@height"],
              },
              screen: {
                left: state.screen["@x"],
                top: state.screen["@y"],
                width: state.screen["@width"],
                height: state.screen["@height"],
              },
              timestamp: state["@timestamp"],
            },
          }),
        {}
      ) ?? {}
    );
  },
  write: (value: WindowState) => {
    return {
      state: Object.entries(value).map(([key, value]) => {
        return {
          "@key": key,
          "@x": value.bounds.left,
          "@y": value.bounds.top,
          "@width": value.bounds.width,
          "@height": value.bounds.height,
          "@timestamp": value.timestamp,
          screen: {
            "@x": value.screen.left,
            "@y": value.screen.top,
            "@width": value.screen.width,
            "@height": value.screen.height,
          },
        };
      }),
    };
  },
});
export const windowStateAtom = (key: string) =>
  atom(
    (get) => {
      const state = get(persistedWindowStateAtom);
      if (state instanceof Promise) {
        return state.then((state) => state?.[key]);
      }
      return state?.[key];
    },
    (get, set, newValue: WindowState[string]) => {
      return set(persistedWindowStateAtom, (currentValue) => ({
        ...currentValue,
        [key]: newValue,
      }));
    }
  );
