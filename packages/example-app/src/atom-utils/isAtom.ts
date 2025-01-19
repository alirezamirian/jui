import { Atom } from "jotai";

export type MaybeAtom<T> = T | Atom<T>;
export type MaybeAtomAsync<T> = T | Atom<T | Promise<T>>;

export const isAtom = <T>(value: MaybeAtom<T>): value is Atom<T> =>
  typeof value === "object" && value !== null && "read" in value;
