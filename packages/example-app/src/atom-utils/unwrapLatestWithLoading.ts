import { atom, Atom } from "jotai";
import { unwrap } from "jotai/utils";
import { Primitive } from "zod";

type WithLoading<T> = { value: T; isLoading: boolean };

function getCached<T, K = object | Primitive>(
  c: () => T,
  m: K extends object ? WeakMap<K, T> : Map<K, T>,
  k: K
): T {
  return (m.has(k) ? m : m.set(k, c())).get(k) as T;
}

const cache1 = new WeakMap();
const memo2 = <T>(
  create: () => T,
  dep1: object,
  dep2: object | Primitive
): T => {
  const cache2 = getCached(
    () => (typeof dep2 === "object" ? new WeakMap() : new Map()),
    cache1,
    dep1
  );
  return getCached(create, cache2, dep2);
};
const nullObj = {};

export function unwrapLatestWithLoading<T>(
  anAtom: Atom<Promise<T>>
): Atom<WithLoading<T> | Promise<WithLoading<T>>>;
export function unwrapLatestWithLoading<T>(
  anAtom: Atom<Promise<T>>,
  defaultValue: Exclude<Awaited<T>, undefined>
): Atom<WithLoading<T>>;
export function unwrapLatestWithLoading<T>(
  anAtom: Atom<Promise<T>>,
  defaultValue?: Awaited<T>
): Atom<WithLoading<T> | Promise<WithLoading<T>>> {
  return memo2(
    () => {
      const freshAtom = atom(async (get) => ({
        value: await get(anAtom),
        isLoading: false,
      }));
      const unwrappedAtom = unwrap(freshAtom, (prev) => {
        const fallback = prev === undefined ? defaultValue : prev.value;
        return fallback !== undefined
          ? { value: fallback, isLoading: true }
          : undefined;
      });
      return atom((get) => get(unwrappedAtom) ?? get(freshAtom));
    },
    anAtom,
    defaultValue ?? nullObj
  );
}
