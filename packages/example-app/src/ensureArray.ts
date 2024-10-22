export type MaybeArray<T> = Array<T> | T;
export const ensureArray = <T>(input: MaybeArray<T> | undefined): Array<T> =>
  Array.isArray(input) ? input : input ? [input] : [];
