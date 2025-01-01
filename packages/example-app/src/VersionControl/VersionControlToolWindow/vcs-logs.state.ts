import { mapObjIndexed } from "ramda";
import { Atom, atom, Getter, Setter, WritableAtom } from "jotai";
import { atomFamily, atomWithReset, RESET, useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { DateRange, dateRangeToString } from "./DateRange";

export const vcsTabKeysAtom = atom<string[]>(["MAIN"]);

export const vcsActiveTabKeyAtom = atom<string>("MAIN");

/**
 * The title of a VCS log tab
 */
export const vcsTabTitleAtoms = atomFamily((key: string) =>
  atom((get) => {
    const searchQuery = get(vcsLogFilter.searchQuery(key));
    const user = get(vcsLogFilter.user(key));
    const date = get(vcsLogFilter.date(key));
    const branches = get(vcsLogFilter.branch(key));
    const parts: { short: string; long: string }[] = [];

    if (branches?.length > 0) {
      parts.push({
        short: branches.join(", "),
        long: `on ${branches.join(", ")}`,
      });
    }
    if (date) {
      parts.push({
        short: dateRangeToString(date),
        long: `made ${dateRangeToString(date)}`,
      });
    }
    if (searchQuery) {
      parts.push({
        short: `'${searchQuery}'`,
        long: `containing '${searchQuery}'`,
      });
    }
    if (user) {
      parts.push({
        short: user,
        long: `by ${user}`,
      });
    }

    return `Log${parts.length > 0 ? ": " : ""}${
      parts.length === 1
        ? parts[0].short
        : parts.map((part) => part.long).join(" ")
    }`;
  })
);

const tabAtomFamilies: Array<
  ReturnType<typeof atomFamily<string, Atom<unknown>>>
> = [];

/**
 * creates an atomFamily to keep a piece of state for VCS log tabs.
 * It keeps track of all pieces of state for each tab to be cleaned up when the tab is closed.
 */
export const vcsLogAtomFamily = <T>(defaultValue: T) => {
  const result = atomFamily((_tab: string) => atomWithReset<T>(defaultValue));
  tabAtomFamilies.push(result);
  return result;
};

/**
 * Whether branches filter is visible for a VCS log tab
 */
export const vcsLogTabShowBranchesAtoms = vcsLogAtomFamily(false);

/**
 * Whether the commit details is shown (in a split view together with commit changes).
 */
export const vcsLogTabShowCommitDetailsAtoms = vcsLogAtomFamily(true);
/**
 * Whether the commit details is shown (in a split view together with commit changes).
 */
export const vcsLogTabShowCommitDetailsInCurrentTabAtom = atom((get) =>
  get(vcsLogTabShowCommitDetailsAtoms(get(vcsActiveTabKeyAtom)))
);

export const CURRENT_USER_FILTER_VALUE = "*";
export const vcsLogFilter = {
  /**
   * The state of search query, for a VCS log tab
   */
  searchQuery: vcsLogAtomFamily(""),
  /**
   * The state of whether "match case" is on the search query, for a VCS log tab
   */
  matchCase: vcsLogAtomFamily(false),
  /**
   * The state of whether "regexp" is on the search query, for a VCS log tab
   */
  regExp: vcsLogAtomFamily(false),
  /**
   * The state of user filter, for a VCS log tab
   */
  user: vcsLogAtomFamily<string | null>(null),
  /**
   * The state of date filter, for a VCS log tab
   */
  date: vcsLogAtomFamily<DateRange | null>(null),
  /**
   * The state of date filter, for a VCS log tab
   */
  branch: vcsLogAtomFamily<string[]>([]),
};

export const vcsLogFilterCurrentTab = mapObjIndexed((atomFamily, key) => {
  return atom(
    (get) => get(atomFamily(get(vcsActiveTabKeyAtom)) as Atom<unknown>),
    (get, set, newValue) => {
      set(
        atomFamily(get(vcsActiveTabKeyAtom)) as WritableAtom<
          unknown,
          unknown[],
          unknown
        >,
        newValue
      );
    }
  );
}, vcsLogFilter) as {
  [key in keyof typeof vcsLogFilter]: ReturnType<(typeof vcsLogFilter)[key]>;
};

export const useResetFilters = () =>
  useAtomCallback(
    useCallback((get, set, tabKey: string) => {
      Object.values(vcsLogFilter)
        .map((getAtom) => getAtom(tabKey))
        .forEach((atom) =>
          set(atom as WritableAtom<unknown, [typeof RESET], unknown>, RESET)
        );
    }, [])
  );

const closeTabCallback = (get: Getter, set: Setter, tabKey: string) => {
  const tabs = get(vcsTabKeysAtom);
  const currentActiveTabKey = get(vcsActiveTabKeyAtom);
  if (currentActiveTabKey === tabKey) {
    // make sure the active tab key remains valid, by switching to previous tab. In the reference implementation
    // the previously activated tab will be activated instead of the previous one index-wise, but it's a
    // negligible and easy-to-fix difference.
    set(
      vcsActiveTabKeyAtom,
      tabs[tabs.findIndex((key) => key === tabKey) - 1] || tabs[0]
    );
  }
  set(vcsTabKeysAtom, (keys) => keys.filter((key) => key !== tabKey));
  tabAtomFamilies.forEach((atomFamily) => atomFamily.remove(tabKey));
};

export function useCloseVcsTab() {
  return useAtomCallback(closeTabCallback);
}
