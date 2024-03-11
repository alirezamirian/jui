import { mapObjIndexed } from "ramda";
import {
  atom,
  atomFamily,
  CallbackInterface,
  RecoilState,
  selector,
  selectorFamily,
  useRecoilCallback,
} from "recoil";

import { DateRange, dateRangeToString } from "./DateRange";

export const vcsTabKeysState = atom<string[]>({
  key: "vcs/log/tabs/keys",
  default: ["MAIN"],
});

export const vcsActiveTabKeyState = atom<string>({
  key: "vcs/log/tabs/activeKey",
  default: "MAIN",
});

/**
 * The title of a VCS log tab
 */
export const vcsTabTitleState = selectorFamily({
  key: "vcs/logs/tab/title",
  get:
    (key: string) =>
    ({ get }) => {
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
    },
});

const tabStats: Array<(tabKey: string) => RecoilState<unknown>> = [];

/**
 * marks a recoil state as a piece of state for VCS log tabs, so that it's cleaned up when the tab is closed.
 * @param someAtomFamily
 */
export const vcsLogTabState = <T extends (tabKey: string) => RecoilState<any>>(
  someAtomFamily: T
): T => {
  tabStats.push(someAtomFamily);
  return someAtomFamily;
};

/**
 * Whether branches filter is visible for a VCS log tab
 */
export const vcsLogTabShowBranches = vcsLogTabState(
  atomFamily<boolean, string>({
    key: "vcs/logs/filter/showBranches",
    default: false,
  })
);
/**
 * Whether the commit details is shown (in a split view together with commit changes).
 */
export const vcsLogTabShowCommitDetails = vcsLogTabState(
  atomFamily<boolean, string>({
    key: "vcs/logs/showCommitDetails",
    default: true,
  })
);

export const CURRENT_USER_FILTER_VALUE = "*";
export const vcsLogFilter = {
  /**
   * The state of search query, for a VCS log tab
   */
  searchQuery: vcsLogTabState(
    atomFamily<string, string>({
      key: "vcs/logs/filter/searchQuery",
      default: "",
    })
  ),
  /**
   * The state of whether "match case" is on the search query, for a VCS log tab
   */
  matchCase: vcsLogTabState(
    atomFamily<boolean, string>({
      key: "vcs/logs/filter/matchCase",
      default: false,
    })
  ),
  /**
   * The state of whether "regexp" is on the search query, for a VCS log tab
   */
  regExp: vcsLogTabState(
    atomFamily<boolean, string>({
      key: "vcs/logs/filter/regExp",
      default: false,
    })
  ),
  /**
   * The state of user filter, for a VCS log tab
   */
  user: vcsLogTabState(
    atomFamily<string | null, string>({
      key: "vcs/logs/filter/user",
      default: null,
    })
  ),
  /**
   * The state of date filter, for a VCS log tab
   */
  date: atomFamily<DateRange | null, string>({
    key: "vcs/logs/filter/date",
    default: null,
  }),
  /**
   * The state of date filter, for a VCS log tab
   */
  branch: vcsLogTabState(
    atomFamily<string[], string>({
      key: "vcs/logs/filter/branch",
      default: [],
    })
  ),
};

type FamilyToAtom<F> = F extends (param: any) => RecoilState<infer S>
  ? RecoilState<S>
  : never;

type VcsLogFilter = typeof vcsLogFilter;

export const vcsLogFilterCurrentTab = mapObjIndexed((atomFamily, key) => {
  return selector({
    key: `vcs/logs/currentTabFilter/${key}`,
    get: ({ get }) =>
      get(atomFamily(get(vcsActiveTabKeyState)) as RecoilState<unknown>),
    set: ({ set, get }, newValue) => {
      set(
        atomFamily(get(vcsActiveTabKeyState)) as RecoilState<unknown>,
        newValue
      );
    },
  });
}, vcsLogFilter) as {
  [key in keyof VcsLogFilter]: FamilyToAtom<VcsLogFilter[key]>;
};

export const useResetFilters = () =>
  useRecoilCallback(
    ({ reset }) =>
      (tabKey: string) => {
        Object.values(vcsLogFilter)
          .map((state) => state(tabKey))
          .forEach(reset);
      },
    []
  );

const closeTabCallback =
  ({ set, snapshot, reset }: CallbackInterface) =>
  (tabKey: string) => {
    const tabs = snapshot.getLoadable(vcsTabKeysState).getValue();
    const currentActiveTabKey = snapshot
      .getLoadable(vcsActiveTabKeyState)
      .getValue();
    if (currentActiveTabKey === tabKey) {
      // make sure the active tab key remains valid, by switching to previous tab. In the reference implementation
      // the previously activated tab will be activated instead of the previous one index-wise, but it's a
      // negligible and easy-to-fix difference.
      set(
        vcsActiveTabKeyState,
        tabs[tabs.findIndex((key) => key === tabKey) - 1] || tabs[0]
      );
    }
    set(vcsTabKeysState, (keys) => keys.filter((key) => key !== tabKey));
    tabStats.forEach((state) => reset(state(tabKey)));
  };

export function useCloseVcsTab() {
  return useRecoilCallback(closeTabCallback, []);
}
