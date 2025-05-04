import { Atom, atom, SetStateAction, WritableAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomFamily } from "jotai/utils";
import {
  X2jOptionsOptional,
  XMLBuilder,
  XmlBuilderOptionsOptional,
  XMLParser,
} from "fast-xml-parser";
import path from "path";
import { identity } from "ramda";
import { z, ZodType } from "zod";
import { fs } from "../fs/fs";
import { currentProjectAtom } from "../Project/project.state";
import { fileContentAtom } from "../fs/fs.state";
import { ensureDir } from "../fs/fs-utils";

export enum StoragePathMacros {
  WORKSPACE_FILE = "$WORKSPACE_FILE$",
  PRODUCT_WORKSPACE_FILE = "$PRODUCT_WORKSPACE_FILE$",
  NON_ROAMABLE_FILE = "other.xml",
}

const CONFIG_DIR = "/user/test/.JUIExample2025.1";
const OPTIONS_DIRECTORY = "options";

const storagePaths = atomFamily((storageFile: string) =>
  atom((get): string => {
    const storageFileDir = path.join(get(currentProjectAtom).path, ".idea");
    switch (storageFile) {
      case StoragePathMacros.PRODUCT_WORKSPACE_FILE:
      // TODO: implement product workspace file. For now it will fallback to WORKSPACE_FILE
      case StoragePathMacros.WORKSPACE_FILE:
        return path.join(storageFileDir, "workspace.xml");
      case StoragePathMacros.NON_ROAMABLE_FILE:
        return path.join(CONFIG_DIR, OPTIONS_DIRECTORY, storageFile);
      default:
        return path.join(storageFileDir, storageFile);
    }
  })
);

const PERSISTENCE_WRITE_TIMEOUT = 1000;

const persistentStateStoreAtoms = atomFamily((storageFile: string) => {
  const cacheAtom = atom<PersistedState | null>(null);
  const storageContentAtom = atom((get) =>
    readStorageFile(get(storagePaths(storageFile)))
  );
  let fsWriteTimer: ReturnType<(typeof window)["setTimeout"]> | null = null;
  let ensureDirPromise: Promise<void>;
  return atom(
    (get): Promise<PersistedState> | PersistedState =>
      get(cacheAtom) ?? get(storageContentAtom),
    async (get, set, update: (state: PersistedState) => PersistedState) => {
      const storageFilepath = get(storagePaths(storageFile));
      const state: PersistedState =
        get(cacheAtom) ?? (await get(storageContentAtom));
      set(cacheAtom, (currentState) => update(currentState ?? state));

      // basic throttling
      if (fsWriteTimer !== null) {
        clearTimeout(fsWriteTimer);
      }
      if (!ensureDirPromise) {
        ensureDirPromise = ensureDir(
          fs.promises,
          path.dirname(storageFilepath)
        );
      }
      fsWriteTimer = setTimeout(() => {
        ensureDirPromise.then(() =>
          set(fileContentAtom(storageFilepath), serializeState(get(cacheAtom)!))
        );
      }, PERSISTENCE_WRITE_TIMEOUT);
    }
  );
});

type PersistedStateAtom<Value> = WritableAtom<
  Promise<Value | undefined>,
  [{ type: "update"; value: Value }],
  Promise<void>
>;

type WithOptionalArrays<T> = T extends {}
  ? {
      [K in keyof T]: T[K] extends Array<infer Item>
        ? WithOptionalArrays<T[K]> | WithOptionalArrays<Item>
        : WithOptionalArrays<T[K]>;
    }
  : T extends Array<infer I>
  ? T | I
  : T;

function createPersistedStateAtom<
  Schema extends ZodType<any, any, WithOptionalArrays<any>>,
  Value extends object
>({
  storageFile = StoragePathMacros.WORKSPACE_FILE,
  componentName,
  schema,
  ...args
}: {
  componentName: string;
  schema: Schema extends ZodType<any, any, infer Input>
    ? WithOptionalArrays<Input> extends Input
      ? Schema
      : `⚠️⚠️ If you see this error, it means the schema produces an array somewhere but doesn't expect singular value in the input. Look for usages of z.array() and replace them with maybeArray() utility ⚠️⚠️`
    : never; // TODO: similarly check for numbers that don't allow for string and suggest replacing with numberFromString

  storageFile?: string;
} & (Value extends Schema["_output"]
  ? {}
  : {
      read: (
        componentState: Schema["_output"] | undefined
      ) => Value | Promise<Value> | undefined;
      write: (
        value: Value,
        componentState: Schema["_output"]
      ) => Schema["_output"];
    })): PersistedStateAtom<Value> {
  const write: any /*FIXME*/ = "write" in args ? args.write : (v: Value) => v;
  const read: any /*FIXME*/ = "read" in args ? args.read : identity;

  return atom(
    async (get): Promise<Value | undefined> => {
      const state = await get(persistentStateStoreAtoms(storageFile));
      const componentState = state?.project.component.find(
        (component): component is Schema["_output"] & ComponentState =>
          component["@name"] === componentName
      );
      const output = schema.safeParse(componentState);
      if (output.error) {
        console.error(
          `Error parsing persisted state for component ${componentName} in file ${storageFile}:`,
          output.error
        );
      }
      return (await read(output.data)) ?? undefined;
    },
    async (get, set, action: { type: "update"; value: Value }) => {
      if (action.type === "update") {
        return set(persistentStateStoreAtoms(storageFile), (state) => {
          const { value } = action;
          const components = [...state.project.component];
          const index = components.findIndex(
            (component) => component["@name"] === componentName
          );
          components.splice(index, index >= 0 ? 1 : 0, {
            "@name": componentName,
            ...write(value as Value, components[index]),
          });
          return {
            ...state,
            project: {
              ...state.project,
              component: components,
            },
          };
        });
      }
    }
  );
}

/**
 * Atom with persisted state, without any default value, which makes the atom
 * value async.
 * Useful for cases where the rendering should suspend until the persisted value
 * is determined.
 * For example, rendering a window with some default bounds and then re-rendering
 * asynchronously with the persisted bounds may cause the window to jump around.
 *
 * **Note**: It's important to type both read and write arguments explicitly,
 * since there is no chance to infer `Value` where there is no default value.
 * @param config
 */
export function atomWithPersistence<
  Schema extends ZodType<any, any, WithOptionalArrays<any>>,
  Value extends object
>(
  config: Parameters<typeof createPersistedStateAtom<Schema, Value>>[0]
): WritableAtom<
  undefined | Value | Promise<Value | undefined>,
  [SetStateAction<Value>],
  Promise<void>
>;
/**
 * Atom with persisted state, with a default value, not to make the atom value
 * async.
 * The atom will have the default value initially, switching to the persisted
 * value asynchronously.
 */
export function atomWithPersistence<
  Schema extends ZodType<any, any, WithOptionalArrays<any>>,
  Value extends object
>(
  config: Parameters<typeof createPersistedStateAtom<Schema, Value>>[0],
  initialValue: Value
): WritableAtom<Value, [SetStateAction<Value>], Promise<void>>;
export function atomWithPersistence<
  Schema extends ZodType<any, any, WithOptionalArrays<any>>,
  Value extends object
>(
  config: Parameters<typeof createPersistedStateAtom<Schema, Value>>[0],
  /**
   * if not provided, the initial value will be a promise resolving with the persisted value, and
   * so the resulting atom value type changes from `Value` to `Value | Promise<Value>`
   */
  initialValue?: Value
): WritableAtom<Value, [SetStateAction<Value>], Promise<void>> {
  const baseAtom = atom<Value | undefined>(initialValue);

  const persistenceAtom = createPersistedStateAtom<Schema, Value>(config);
  const syncEffect = atomEffect((get, set) => {
    get.peek(persistenceAtom).then((persistedValue) => {
      if (persistedValue !== undefined) {
        set(baseAtom, persistedValue);
      }
    });
  });
  return atom(
    (get) => {
      get(syncEffect);
      const value = get(baseAtom);
      if (!initialValue && value === undefined) {
        return get(persistenceAtom) as any; // FIXME
      }
      return value;
    },
    async (get, set, action: SetStateAction<Value>) => {
      const newValue =
        typeof action === "function"
          ? (action as (currentValue: Value | undefined) => Value)(
              await get(baseAtom)
            )
          : action;
      set(baseAtom, newValue);
      await set(persistenceAtom, { type: "update", value: newValue as Value });
    }
  );
}

// TODO: make a test suite for persistent atoms using the examples like the ones below
//  to cover:
//  - read/write working as expected
//  - Atoms rendering expectations.
//    updating state of a component should not rerender the other persisted in the same file
//  - ideally the expected type errors in read/write and type arguments
export const testAtom = atomWithPersistence(
  {
    componentName: "test",
    storageFile: "test.xml",
    schema: z.object({ whatever: z.number() }).optional(),
    read: (s) => ({ x: s?.whatever ?? 2 }),
    write: (v, s) => ({ ...s, whatever: v.x }),
  },
  { x: 2 }
);

export const testAtom2 = atomWithPersistence(
  {
    componentName: "test2",
    storageFile: "test.xml",
    schema: z.object({ y: z.number() }),
  },
  { y: 3 }
);

export type ComponentState = { "@name": string };
export type PersistedState = {
  "?xml": { "@version": "1.0"; "@encoding": "UTF-8" };
  project: {
    "@version": string;
    component: Array<ComponentState>;
  };
};

export const CDATA_PROP_NAME = "__cdata";

const WORKSPACE_XML_PARSE_OPTIONS: X2jOptionsOptional = {
  attributeNamePrefix: "@",
  ignoreAttributes: false,
  cdataPropName: CDATA_PROP_NAME,
  isArray: (tagName, jPath) => jPath === "project.component",
};
const WORKSPACE_XML_BUILD_OPTIONS: XmlBuilderOptionsOptional = {
  format: true,
  attributeNamePrefix: "@",
  cdataPropName: CDATA_PROP_NAME,
  ignoreAttributes: false,
};

const EMPTY_STORAGE_STATE = {
  "?xml": { "@version": "1.0", "@encoding": "UTF-8" },
  project: { "@version": "4", component: [] as ComponentState[] },
} as const;

export async function readStorageFile(
  storageFile: string
): Promise<PersistedState> {
  const xmlParser = new XMLParser(WORKSPACE_XML_PARSE_OPTIONS);
  const storageFileExists = await fs.promises.exists(storageFile);
  if (!storageFileExists) {
    return EMPTY_STORAGE_STATE;
  }
  // @ts-expect-error: bad typing in @isomorphic-git/lightning-fs@4.6.0. It's fixed, but not published at the time of writing this
  const xmlData: string = await fs.promises.readFile(storageFile, {
    encoding: "utf8",
  });

  const workspace = Object.assign(
    { ...EMPTY_STORAGE_STATE },
    xmlParser.parse(xmlData)
  );
  workspace.project.component = workspace.project.component ?? [];
  return workspace;
}

function serializeState(state: PersistedState): string {
  const xmlBuilder = new XMLBuilder(WORKSPACE_XML_BUILD_OPTIONS);
  return xmlBuilder.build(state);
}
