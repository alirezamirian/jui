import { atom, Atom } from "jotai";
import { unwrap } from "jotai/utils";

/**
 * Returns a memoized version of the input function based on it's single argument.
 * Useful for making an atom wrapper pure (by caching the output based on input),
 * to make it usable directly inside components without useMemo.
 * @param fn
 */
const memoized = <Fn extends (...args: any[]) => any>(fn: Fn): Fn => {
  const _cache = new WeakMap<Parameters<Fn>[0], ReturnType<Fn>>();
  return ((arg1: Parameters<Fn>[0]) => {
    let result = _cache.get(arg1);
    if (result === undefined) {
      result = fn(arg1);
      _cache.set(arg1, result!);
    }
    return result;
  }) as Fn;
};
/**
 * Creates an atom that suspends rendering only the first time `anAtom` is
 * being resolved.
 * In subsequent resolutions of `anAtom`, the resulting atom will unwrap to the
 * latest resolved value.
 */
export const unwrapLatest = memoized(
  <T>(anAtom: Atom<Promise<T>>): Atom<T | Promise<T>> => {
    const unwrappedAtom = unwrap(anAtom, (prev) => prev);
    return atom((get) => get(unwrappedAtom) ?? get(anAtom));
  }
);
/**
 * Creates an atom that unwraps an async atom to its latest resolved value,
 * or `null` when the value is being resolved for the first time.
 */
export const unwrapLatestOrNull = memoized(
  <T>(anAtom: Atom<Promise<T>>): Atom<T | null> =>
    unwrap(anAtom, (prev) => prev ?? null)
);
