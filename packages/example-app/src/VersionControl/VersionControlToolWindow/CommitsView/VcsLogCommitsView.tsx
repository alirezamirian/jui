import { v4 as uuid } from "uuid";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActionButton,
  ActionTooltip,
  AutoHoverPlatformIcon,
  IconButton,
  Item,
  Menu,
  PlatformIcon,
  SearchInput,
  styled,
  StyledHoverContainer,
  Toolbar,
  ToolbarSeparator,
  TooltipTrigger,
  useGetActionShortcut,
} from "@intellij-platform/core";

import { StyledHeader, StyledSpacer } from "../styled-components";
import { VcsFilterDropdown } from "./VcsLogDropdown";
import { atom, useAtom, useAtomValue, WritableAtom } from "jotai";
import { useAtomCallback, useResetAtom } from "jotai/utils";
import { searchInputRefAtom } from "../VersionControlToolWindow";
import { VcsActionIds } from "../../VcsActionIds";
import {
  CURRENT_USER_FILTER_VALUE,
  vcsActiveTabKeyAtom,
  vcsLogFilter,
  vcsTabKeysAtom,
} from "../vcs-logs.state";
import { notImplemented } from "../../../Project/notImplemented";
import { DateRange, dateToString } from "../DateRange";
import { BranchesFilterDropdown } from "./BranchesFilterDropdown";
import { CommitsTable } from "./CommitsTable";
import { CommitsTableViewOptionsMenuIconButton } from "./CommitsTableViewOptionsMenuIconButton";

const StyledSearchInput = styled(SearchInput)`
  border-radius: 2px;
  width: 219px;
  margin-right: 0.0625rem;
  margin-left: 0.2rem;
`;

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// TODO: add an effect to persist it under application level other.xml file under
// PropertyService component's "Vcs.Log.Text.Filter.History" property
const searchHistoryState = atom<string[]>([]);

export function VcsLogCommitsView({ tabKey }: { tabKey: string }) {
  const textFilterRef = useAtomValue(searchInputRefAtom);
  const [searchQuery, setSearchQuery] = useAtom(
    vcsLogFilter.searchQuery(tabKey)
  );
  const [user, setUser] = useAtom(vcsLogFilter.user(tabKey));
  const resetUser = useResetAtom(vcsLogFilter.user(tabKey));
  const [dateFilter, setDateFilter] = useAtom(vcsLogFilter.date(tabKey));
  const resetDate = useResetAtom(vcsLogFilter.date(tabKey));
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryState);
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const getActionShortcut = useGetActionShortcut();
  const isRegExpOn = useAtomValue(vcsLogFilter.regExp(tabKey));
  const isMatchCaseOn = useAtomValue(vcsLogFilter.matchCase(tabKey));
  const submitSearchQuery = (value = searchInputValue) => {
    setSearchQuery(value);
    if (value && !searchHistory.includes(value)) {
      setSearchHistory((searchHistory) => [
        value,
        ...searchHistory.filter((item) => item !== value),
      ]);
    }
  };

  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  const createNewTab = useAtomCallback(
    useCallback((get, set) => {
      const newTabId = uuid();
      set(vcsTabKeysAtom, (value) => [...value, newTabId]);
      Object.values(vcsLogFilter).forEach(
        (
          getTabFilterAtom: (tabKey: string) => WritableAtom<any, any, void>
        ) => {
          // TODO(jotai): using jotai utils like [split](https://jotai.org/docs/utilities/split) might simplify vcs log tabs state management
          set(
            getTabFilterAtom(newTabId),
            get(getTabFilterAtom(get(vcsActiveTabKeyAtom)))
          );
        }
      );
      set(vcsActiveTabKeyAtom, newTabId);
    }, [])
  );
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const predefinedDateRanges = [
    {
      name: "Last 24 hours",
      value: { from: yesterday },
    },
    {
      name: "Last 7 days",
      value: { from: sevenDaysAgo },
    },
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <TooltipTrigger
          tooltip={
            <ActionTooltip
              actionName="Text or Hash Filter"
              shortcut={getActionShortcut(VcsActionIds.FOCUS_TEXT_FILTER)}
            />
          }
        >
          <StyledSearchInput
            inputRef={textFilterRef}
            value={searchInputValue}
            onChange={setSearchInputValue}
            onSubmit={submitSearchQuery}
            onBlur={() => submitSearchQuery()}
            onClear={() => submitSearchQuery("")}
            searchHistory={searchHistory}
            addonAfter={
              <>
                <StyledHoverContainer
                  as={ActionButton}
                  excludeFromTabOrder={false}
                  actionId={VcsActionIds.REG_EXP}
                >
                  <AutoHoverPlatformIcon
                    icon={
                      isRegExpOn ? "actions/regexSelected" : "actions/regex"
                    }
                    hoverIcon={
                      isRegExpOn
                        ? "actions/regexSelected"
                        : "actions/regexHovered"
                    }
                  />
                </StyledHoverContainer>
                <StyledHoverContainer
                  as={ActionButton}
                  excludeFromTabOrder={false}
                  actionId={VcsActionIds.MATCH_CASE}
                >
                  {isMatchCaseOn ? (
                    <PlatformIcon icon="actions/matchCaseSelected" />
                  ) : (
                    <AutoHoverPlatformIcon
                      icon="actions/matchCase"
                      hoverIcon="actions/matchCaseHovered"
                    />
                  )}
                </StyledHoverContainer>
              </>
            }
          />
        </TooltipTrigger>
        <Toolbar>
          <BranchesFilterDropdown tabKey={tabKey} />
          <VcsFilterDropdown
            value={user === CURRENT_USER_FILTER_VALUE ? "me" : user}
            onClear={resetUser}
            renderMenu={({ menuProps }) => (
              <Menu
                {...menuProps}
                onAction={(key) => {
                  if (key === "select") {
                    return notImplemented();
                  }
                  setUser(`${key}`);
                }}
              >
                <Item key="select">Select...</Item>
                <Item key={CURRENT_USER_FILTER_VALUE}>me</Item>
              </Menu>
            )}
            label="User"
          />
          <VcsFilterDropdown
            value={dateFilter && dateRangeToString(dateFilter)}
            onClear={resetDate}
            renderMenu={({ menuProps }) => (
              <Menu
                {...menuProps}
                onAction={(key) => {
                  const predefinedDateRange = predefinedDateRanges.find(
                    ({ name }) => name === key
                  );
                  if (predefinedDateRange) {
                    setDateFilter(predefinedDateRange.value);
                  } else {
                    notImplemented();
                  }
                }}
              >
                {[
                  <Item key="select">Select...</Item>,
                  ...predefinedDateRanges.map(({ name }) => (
                    <Item key={name}>{name}</Item>
                  )),
                ]}
              </Menu>
            )}
            label="Date"
          />
          <VcsFilterDropdown
            renderMenu={({ menuProps }) => (
              <Menu {...menuProps} onAction={notImplemented}>
                <Item>Select in...</Item>
                <Item>Select in Tree...</Item>
              </Menu>
            )}
            label="Paths"
          />
          <ToolbarSeparator />
          <TooltipTrigger
            tooltip={<ActionTooltip actionName="Open New Git Log Tab" />}
          >
            <IconButton aria-label="Checkout" onPress={createNewTab}>
              <PlatformIcon icon="actions/openNewTab.svg" />
            </IconButton>
          </TooltipTrigger>
        </Toolbar>
        <StyledSpacer />
        <Toolbar style={{ flexShrink: 0 }}>
          <ActionButton actionId={VcsActionIds.LOG_REFRESH} />
          <TooltipTrigger tooltip={<ActionTooltip actionName="Cherry-Pick" />}>
            <IconButton isDisabled>
              <PlatformIcon icon="/platform/dvcs-impl/resources/icons/cherryPick.svg" />
            </IconButton>
          </TooltipTrigger>
          <CommitsTableViewOptionsMenuIconButton />
          <TooltipTrigger
            tooltip={
              <ActionTooltip actionName="Go To Hash/Branch/Tag" shortcut="⌘F" />
            }
          >
            <IconButton>
              <PlatformIcon icon="actions/find" />
            </IconButton>
          </TooltipTrigger>
        </Toolbar>
      </StyledHeader>
      <CommitsTable />
    </StyledContainer>
  );
}

function dateRangeToString(dateRange: DateRange): string {
  if (dateRange.from && dateRange.to) {
    return `Between ${dateToString(dateRange.from)} and ${dateToString(
      dateRange.to
    )}`;
  }
  if (dateRange.from) {
    return `since ${dateToString(dateRange.from)}`;
  }
  if (dateRange.to) {
    return `until ${dateToString(dateRange.to)}`;
  }
  return "";
}
