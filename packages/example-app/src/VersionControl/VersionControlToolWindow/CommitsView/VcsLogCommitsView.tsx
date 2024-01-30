import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import {
  ActionButton,
  ActionTooltip,
  AutoHoverPlatformIcon,
  IconButton,
  IconButtonWithMenu,
  Item,
  Link,
  Menu,
  PlatformIcon,
  SearchInput,
  Section,
  styled,
  StyledHoverContainer,
  Toolbar,
  ToolbarSeparator,
  TooltipTrigger,
  useGetActionShortcut,
} from "@intellij-platform/core";

import {
  StyledHeader,
  StyledPlaceholderContainer,
  StyledSpacer,
} from "../styled-components";
import { VcsFilterDropdown } from "../VcsLogDropdown";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { searchInputRefState } from "../VersionControlToolWindow";
import { VcsActionIds } from "../../VcsActionIds";
import {
  useResetFilters,
  vcsActiveTabKeyState,
  vcsLogFilter,
  vcsTabKeysState,
} from "../vcs-logs.state";
import { notImplemented } from "../../../Project/notImplemented";
import { DateRange, dateToString } from "../DateRange";
import { BranchesFilterDropdown } from "./BranchesFilterDropdown";

const StyledSearchInput = styled(SearchInput)`
  border-radius: 2px;
  width: 219px;
  margin-right: 0.0625rem;
  margin-left: 0.2rem;
`;

const StyledContainer = styled.div`
  height: 100%;
`;

const searchHistoryState = atom<string[]>({
  key: "vcs/toolwindow/searchHistory",
  default: [], // TODO: add an effect to persist it under application level other.xml file under
  // PropertyService component's "Vcs.Log.Text.Filter.History" property
});

export function VcsLogCommitsView({ tabKey }: { tabKey: string }) {
  const textFilterRef = useRecoilValue(searchInputRefState);
  const [searchQuery, setSearchQuery] = useRecoilState(
    vcsLogFilter.searchQuery(tabKey)
  );
  const [user, setUser] = useRecoilState(vcsLogFilter.user(tabKey));
  const resetUser = useResetRecoilState(vcsLogFilter.user(tabKey));
  const [dateFilter, setDateFilter] = useRecoilState(vcsLogFilter.date(tabKey));
  const resetDate = useResetRecoilState(vcsLogFilter.date(tabKey));
  const [searchHistory, setSearchHistory] = useRecoilState(searchHistoryState);
  const [searchInputValue, setSearchInputValue] = useState(searchQuery);
  const getActionShortcut = useGetActionShortcut();
  const isRegExpOn = useRecoilValue(vcsLogFilter.regExp(tabKey));
  const isMatchCaseOn = useRecoilValue(vcsLogFilter.matchCase(tabKey));
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

  const createNewTab = useRecoilCallback(
    ({ set }) =>
      () => {
        const newTabId = uuid();
        set(vcsTabKeysState, (value) => [...value, newTabId]);
        set(vcsActiveTabKeyState, newTabId);
      },
    []
  );
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const predefinedDateRanges = [
    {
      name: "Last 24 hours",
      value: { from: sevenDaysAgo },
    },
    {
      name: "Last 7 days",
      value: { from: yesterday },
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
            value={user}
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
                <Item key="me">me</Item>
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
          <TooltipTrigger
            tooltip={<ActionTooltip actionName="Refresh" shortcut="⌘R" />}
          >
            <IconButton>
              <PlatformIcon icon="actions/refresh.svg" />
            </IconButton>
          </TooltipTrigger>
          <TooltipTrigger tooltip={<ActionTooltip actionName="Cherry-Pick" />}>
            <IconButton isDisabled>
              <PlatformIcon icon="/platform/dvcs-impl/resources/icons/cherryPick.svg" />
            </IconButton>
          </TooltipTrigger>
          <TooltipTrigger tooltip={<ActionTooltip actionName="View Options" />}>
            <IconButtonWithMenu
              renderMenu={({ menuProps }) => {
                return (
                  <Menu {...menuProps}>
                    <Section title="Show">
                      <Item>Compact References View</Item>
                    </Section>
                  </Menu>
                );
              }}
            >
              <PlatformIcon icon="actions/groupBy.svg" />
            </IconButtonWithMenu>
          </TooltipTrigger>
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

function CommitsTable() {
  const currentTabKey = useRecoilValue(vcsActiveTabKeyState);
  const resetFilters = useResetFilters();

  return (
    <StyledPlaceholderContainer>
      No commits matching filters
      <Link onPress={() => resetFilters(currentTabKey)}>Reset filters</Link>
    </StyledPlaceholderContainer>
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
