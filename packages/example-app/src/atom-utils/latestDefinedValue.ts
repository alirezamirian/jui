import { Atom } from "jotai";
import { selectAtom } from "jotai/utils";

/**
 * Returns an atom that holds the latest defined (not `null` or `undefined`)
 * value of the input atom.
 * Useful for when the value can change to null/undefined and the previous
 * non-null value should still be used.
 * For example, the git branches widget shows the current branch of the file
 * that's currently opened in the editor.
 * But when all editor tabs are closed,
 * or when the currently opened tab is not a file from any repo,
 * the git branches trigger keeps showing the branches of the repository
 * from which a file was last opened.
 */
export const latestDefinedValue = <V>(atom: Atom<V>) =>
  selectAtom<V, V>(atom, (value, prevValue) => {
    return value instanceof Promise
      ? (Promise.all([value, prevValue]).then(
          ([value, prevValue]) => value ?? prevValue ?? value
        ) as V & Promise<unknown>)
      : value ?? prevValue ?? value;
  });
