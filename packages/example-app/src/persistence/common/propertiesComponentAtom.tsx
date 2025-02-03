import { SetStateAction } from "react";
import { focusAtom } from "jotai-optics";
import { atom } from "jotai";
import { z } from "zod";

import { maybeArray } from "../schema-utils";
import {
  atomWithPersistence,
  CDATA_PROP_NAME,
  StoragePathMacros,
} from "../atomWithPersistence";

/**
 * This format was first implemented, but it seems like it's an old format
 * which is replaced by the new CDATA-based format in both workspace-level
 * and application-level properties storage.
 * Keeping it for now, since I'm not sure about the conslusion above.
 */
const _projectPropertiesAtom = atomWithPersistence(
  {} as Record<string, string>,
  {
    componentName: "PropertiesComponent",
    storageFile: StoragePathMacros.WORKSPACE_FILE,
    schema: z
      .object({
        property: maybeArray(
          z.object({
            "@name": z.string(),
            "@value": z.string(),
          })
        ),
      })
      .optional(),
    read: (state) => {
      return Object.fromEntries(
        state?.property.map(({ "@name": name, "@value": value }) => [
          name,
          value,
        ]) ?? []
      );
    },
    write: (value, state) => {
      return {
        property: (state?.property || []).concat(
          Object.entries(value).map(([key, value]) => ({
            "@name": key,
            "@value": value,
          }))
        ),
      };
    },
  }
);

const propertyServiceParsedValueSchema = z.object({
  keyToString: z.record(z.string(), z.string()),
  keyToStringList: z.record(z.string(), z.array(z.string())),
});

type PropertyServiceParsedValue = {
  keyToString: {
    [key: string]: string;
  };
  keyToStringList: {
    [key: string]: string[];
  };
};

const createPropertiesAtom = (
  options: Pick<
    Parameters<typeof atomWithPersistence>[1],
    "storageFile" | "componentName"
  >
) =>
  atomWithPersistence(
    {
      keyToString: {},
      keyToStringList: {},
    },
    {
      ...options,
      schema: z
        .object({
          [CDATA_PROP_NAME]: z.string(),
        })
        .optional(),
      read: (state): PropertyServiceParsedValue => {
        try {
          console.log('state?.["#text"]', state?.[CDATA_PROP_NAME]);
          return propertyServiceParsedValueSchema.parse(
            JSON.parse(state?.[CDATA_PROP_NAME] ?? "{}")
          );
        } catch (e) {
          return { keyToString: {}, keyToStringList: {} };
        }
      },
      write: (value, state) => {
        return {
          [CDATA_PROP_NAME]: JSON.stringify(value, null, 2),
        };
      },
    }
  );

const appPropertiesAtom = createPropertiesAtom({
  componentName: "PropertyService",
  storageFile: StoragePathMacros.NON_ROAMABLE_FILE,
});

const projectPropertiesAtom = createPropertiesAtom({
  componentName: "PropertiesComponent",
  storageFile: StoragePathMacros.WORKSPACE_FILE,
});

const createPropertiesAtoms = (
  propertiesAtom: ReturnType<typeof createPropertiesAtom>
) => {
  const stringPropertiesAtom = focusAtom(propertiesAtom, (optic) =>
    optic.prop("keyToString")
  );
  return {
    number: (property: string, defaultValue: number) => {
      const propertyValueAtom = focusAtom(stringPropertiesAtom, (optic) =>
        optic.prop(property)
      );
      const numberValueAtom = atom(
        (get) => {
          const value = get(propertyValueAtom);
          const numberValue = Number(value);
          return Number.isNaN(numberValue) ? defaultValue : numberValue;
        },
        (get, set, update: SetStateAction<number>) => {
          const newValue =
            typeof update === "function"
              ? update(get(numberValueAtom))
              : update;
          set(propertyValueAtom, String(newValue));
        }
      );
      return numberValueAtom;
    },
  };
};

export const projectPropertyAtom = createPropertiesAtoms(projectPropertiesAtom);

export const appPropertyAtom = {
  ...createPropertiesAtoms(appPropertiesAtom),
};
