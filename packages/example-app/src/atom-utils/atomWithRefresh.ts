import { atom, type WritableAtom } from "jotai";

type Read<Value, Args extends unknown[], Result> = WritableAtom<
  Value,
  Args,
  Result
>["read"];
type Write<Value, Args extends unknown[], Result> = WritableAtom<
  Value,
  Args,
  Result
>["write"];

/**
 * A mapping from atom values to their refreshable atom dependencies used to recursively refresh
 * upstream atoms when refreshing an atom.
 */
const refreshDepsMap = new WeakMap<{}, Set<WritableAtom<unknown, [], void>>>();
/**
 * The set of refreshable atoms, used to recognize refreshable dependencies of each refreshable atom.
 */
const refreshableAtoms = new WeakSet();

/**
 * Similar to {@link https://jotai.org/docs/utilities/resettable#atomwithrefresh atomWithRefresh}
 * but acting like recoil's selector refresh functionality.
 * In recoil refreshing a selector not only refreshes selectors that depend on it but also
 * all upstream dependencies (i.e., selectors used within the refreshed selector).
 *
 * @see https://github.com/facebookexperimental/Recoil/issues/1677
 */
export function atomWithRefresh<Value, Args extends unknown[], Result>(
  read: Read<Value, Args, Result>,
  write: Write<Value, Args, Result>
): WritableAtom<Value, Args | [], Result | void>;

export function atomWithRefresh<Value>(
  read: Read<Value, [], void>
): WritableAtom<Value, [], void>;

export function atomWithRefresh<Value, Args extends unknown[], Result>(
  read: Read<Value, Args, Result>,
  write?: Write<Value, Args, Result>
) {
  const refreshAtom = atom(0);
  const refreshableAtom = atom(
    (get, options) => {
      get(refreshAtom);
      const deps = new Set<WritableAtom<unknown, [], void>>();

      const value = read((...args) => {
        const atom = args[0];
        if (refreshableAtoms.has(atom)) {
          deps.add(atom as WritableAtom<unknown, [], void>);
        }
        return get(...args);
      }, options as never);
      refreshDepsMap.set(value, deps);
      return value;
    },
    (get, set, ...args: Args) => {
      if (args.length === 0) {
        const currentValue = get(refreshableAtom);
        for (const dep of refreshDepsMap.get(currentValue) ?? []) {
          set(dep); // refreshing refreshable dependencies first
        }
        set(refreshAtom, (c) => c + 1);
      } else if (write) {
        return write(get, set, ...args);
      }
    }
  );
  refreshableAtoms.add(refreshableAtom);
  return refreshableAtom;
}
