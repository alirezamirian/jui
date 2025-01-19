import { z, ZodEnum, ZodString, ZodType } from "zod";

export const maybeArray = <T extends ZodType>(type: T) =>
  z
    .union([type, type.array()])
    .transform((value): T["_output"][] =>
      Array.isArray(value) ? value : [value]
    );

/**
 * schema for map objects persisted in intellij IDE setting files.
 */
export const map = <K extends ZodString | ZodEnum<any>, V extends ZodType>(
  keyAttribute: K,
  value: V
) =>
  z.object({
    entry: maybeArray(
      z.object({
        "@type": keyAttribute,
        value,
      })
    ),
  });

/**
 * schema for list objects persisted in intellij IDE setting files.
 */
export const list = <T extends ZodType, K extends string>(
  item: T,
  itemTagName: K
) => {
  const itemSchema = maybeArray(item);
  return z.object({
    [itemTagName]: itemSchema,
  } as { [KK in K]: typeof itemSchema });
};
