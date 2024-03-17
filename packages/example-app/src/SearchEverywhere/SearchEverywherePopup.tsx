import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  IconButton,
  ActionDefinition,
  ActionsProvider,
  FocusScope,
  Item,
  Link,
  List,
  PlatformIcon,
  Popup,
  Selection,
  SelectionManager,
  styled,
  StyledTabProps,
  Tabs,
  Tooltip,
  TooltipTrigger,
  useCollectionSearchInput,
  useGetActionShortcut,
} from "@intellij-platform/core";
import { useTips } from "./useTips";
import { Input } from "./Input";
import {
  searchEverywhereState,
  SearchEveryWhereTab,
} from "./searchEverywhere.state";
import { ContentAwarePopup } from "./ContentAwarePopup";
import {
  SearchEverywhereContributor,
  SearchEverywhereContributorResult,
} from "./SearchEverywhereContributor";
import { actionsSearchContributor } from "./contributors/action/actionsSearchContributor";
import { filesSearchContributor } from "./contributors/file/filesSearchContributor";
import { SearchEverywhereActionIds } from "./SearchEverywhereActionIds";
import { useRecoilInitialValue } from "../recoil-utils";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) =>
    theme.color("SearchEverywhere.Header.background")};
  border-bottom: 1px solid
    ${({ theme }) => theme.color("SearchEverywhere.SearchField.borderColor")};
`;
const StyledTab = styled.button<StyledTabProps>`
  all: unset;
  background: ${({ theme, selected }) =>
    selected && theme.color("SearchEverywhere.Tab.selectedBackground")};
  color: ${({ theme }) =>
    theme.color("SearchEverywhere.Tab.selectedForeground")};
  opacity: ${({ disabled }) => disabled && ".5"};
`;
const StyledTabContent = styled.span`
  display: flex;
  padding: 0 0.75rem;
  height: 1.8rem;
  align-items: center;
`;
const StyledTabs = styled.div`
  line-height: normal;
  border-bottom: none;
`;
const StyledSearchFieldContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 1.85rem;
  align-items: center;
  padding: 0 0.75rem 0;
  gap: 0.75rem;

  input {
    all: unset;
    flex: 1;
    line-height: 1.25;

    &::selection {
      color: ${({ theme }) => theme.color("*.selectionForeground")};
      background: ${({ theme }) => theme.color("*.selectionBackground")};
    }
  }
`;
const StyledSearchResultsContainer = styled.div`
  height: 24rem;
  flex: 1;
  min-height: 0; // for it to properly fill the remaining height and not to exceed that
`;
const StyledDivider = styled.hr`
  all: unset;
  height: 1px;
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.color("SearchEverywhere.SearchField.borderColor")};
`;
const StyledSearchFieldHint = styled.div`
  color: ${({ theme }) =>
    theme.color("SearchEverywhere.SearchField.infoForeground")};
  white-space: nowrap;
`;

const StyledLoadMore = styled.div`
  color: ${({ theme }) =>
    theme.currentForegroundAware(
      theme.color("SearchEverywhere.SearchField.infoForeground")
    )};
  font-size: 0.7rem;
  min-height: 1.375rem;
`;

const StyledPlaceholder = styled.div`
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  position: absolute;
  text-align: center;
  width: 100%;
  top: 50%;
`;
const SEARCH_RESULT_LIMIT = 30;

const contributors = [actionsSearchContributor, filesSearchContributor];

const LOAD_MORE_ITEM = {};
const LOAD_MORE_ITEM_KEY = "LOAD_MORE_ITEM_KEY";

/**
 * TODO: implement history navigation
 */
export function SearchEverywherePopup() {
  const setOpen = useSetRecoilState(searchEverywhereState.isOpen);
  const [tab, setTab] = useRecoilState(searchEverywhereState.tab);
  const [everyWhereAutoSet, setEveryWhereAutoSet] = useState(false);
  const [pattern, setPattern] = useState(
    useRecoilInitialValue(searchEverywhereState.initialSearchQuery(tab))
  );
  const persistInitialSearchQuery = useSetRecoilState(
    searchEverywhereState.initialSearchQuery(tab)
  );

  const getShortcut = useGetActionShortcut();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const idToContributor: Record<
    string,
    SearchEverywhereContributorResult<{}> &
      Omit<SearchEverywhereContributor<{}>, "use">
  > = {};
  contributors.forEach((contributor) => {
    idToContributor[contributor.id] = {
      ...contributor,
      ...contributor.use({ everyWhereAutoSet }),
    };
  });

  const activeContributors = contributors
    .filter((contributor) => tab === "" || contributor.id === tab)
    .map(({ id }) => idToContributor[id]);

  const [searchResultLimit, setSearchResultLimit] =
    useState(SEARCH_RESULT_LIMIT);
  const { searchResult } = useMemo(() => {
    // TODO: sort results
    const searchResult = activeContributors.flatMap((contributor) =>
      contributor.search(pattern).map((item) => ({
        key: `${contributor.id}_${contributor.getKey(item)}`,
        contributor,
        item,
      }))
    );
    return {
      searchResult,
    };
  }, [
    pattern,
    tab,
    ...activeContributors.flatMap(({ searchDeps }) => searchDeps),
  ]);
  const currentTabContributor = idToContributor[tab];

  const visibleSearchResult = useMemo(() => {
    const visibleSearchResult = searchResult.slice(0, searchResultLimit);
    const hasMore = searchResult.length > visibleSearchResult.length;
    if (hasMore) {
      visibleSearchResult.push({
        key: LOAD_MORE_ITEM_KEY,
        item: LOAD_MORE_ITEM,
        contributor: null!,
      });
    }
    return visibleSearchResult;
  }, [searchResultLimit, searchResult]);

  const notFoundPatternRef = useRef<string | null>(null);

  const onPatternChanged = (newPattern: string) => {
    const newPatternContainsPrevious =
      notFoundPatternRef.current &&
      newPattern.includes(notFoundPatternRef.current);
    // TODO: improve isEverywhere support. It should be supported it in "All" tabs too.
    if (currentTabContributor?.isEverywhere && !newPatternContainsPrevious) {
      setEveryWhereAutoSet(false);
    }
    setPattern(newPattern);
  };

  useEffect(() => {
    if (pattern) {
      persistInitialSearchQuery(pattern);
    }
  }, [pattern, tab]);

  useEffect(() => {
    if (searchResult[0]) {
      // Currently, list auto selects the first item, only in first render. But not when the collection is changed.
      // So we make sure the first item is selected, after each search. Perhaps, List should be changed instead to
      // react to collection changes.
      const { key } = searchResult[0];
      setSelectedKeys(new Set([key]));
      selectionManagerRef.current?.setFocusedKey(key);

      // A workaround for a mysterious issue that happens only in docusaurus build.
      // The ref value is not up-to-date, when the effect runs.
      // FIXME: Find the explanation for why it happens, and fix it properly, if it's a legit issue.
      requestAnimationFrame(() => {
        selectionManagerRef.current?.setFocusedKey(key);
      });
    }
    setSearchResultLimit(SEARCH_RESULT_LIMIT);
  }, [searchResult]);

  const localActions: ActionDefinition[] = [
    {
      id: SearchEverywhereActionIds.PREVIOUS_TAB,
      title: "Prev tab",
      description: "Switch to previous tab in Search Everywhere dialog",
      actionPerformed: () => {
        const currentContributorIndex = contributors.findIndex(
          ({ id }) => tab === id
        );

        setTab(
          tab === ""
            ? contributors.slice(-1)[0].id
            : contributors[currentContributorIndex - 1]?.id || ""
        );
      },
    },
    {
      id: SearchEverywhereActionIds.NEXT_TAB,
      title: "Next tab",
      description: "Switch to next tab in Search Everywhere dialog",
      actionPerformed: () => {
        const currentContributorIndex = contributors.findIndex(
          ({ id }) => tab === id
        );
        setTab(contributors[currentContributorIndex + 1]?.id || "");
      },
    },
  ];
  const contributorActions = contributors.flatMap(({ id, actionId, title }) => {
    return actionId
      ? [
          {
            id: actionId,
            title: `Find ${title}`,
            description: `Quickly go to ${title} by name`,
            actionPerformed: () => {
              if (tab !== id) {
                setTab(id);
              } else {
                currentTabContributor?.toggleEverywhere?.();
              }
            },
          },
        ]
      : [];
  });

  const close = () => setOpen(false);

  const collectionRef = useRef<HTMLDivElement>(null);
  const selectionManagerRef = useRef<SelectionManager>(null);
  const { collectionSearchInputProps } = useCollectionSearchInput({
    collectionRef,
    selectionManager: selectionManagerRef.current,
  });

  const tips = useTips();

  return (
    <ContentAwarePopup
      persistedBoundsState={searchEverywhereState.bounds}
      hasContent={Boolean(pattern)}
      noContentHeight={59}
      minWidth={670}
      minHeight={160}
      interactions="all"
      onClose={close}
    >
      <ActionsProvider
        actions={[
          ...(currentTabContributor?.actions || []),
          ...contributorActions,
          ...localActions,
        ]}
      >
        {({ shortcutHandlerProps }) => (
          <div {...shortcutHandlerProps} style={{ height: "inherit" }}>
            <Popup.Layout
              header={
                <>
                  <Popup.Header hasControls>
                    <StyledHeader>
                      <div style={{ flex: 1 }}>
                        <Tabs
                          TabComponent={StyledTab}
                          TabsComponent={StyledTabs}
                          selectedKey={tab}
                          onSelectionChange={(key) =>
                            setTab(key as SearchEveryWhereTab)
                          }
                        >
                          <Item key="">
                            <StyledTabContent>All</StyledTabContent>
                          </Item>
                          {
                            contributors.map((contributor) => {
                              const shortcut = getShortcut(
                                contributor.actionId
                              );
                              const title = (
                                <StyledTabContent>
                                  {contributor.title}
                                </StyledTabContent>
                              );
                              return (
                                <Item key={contributor.id}>
                                  {shortcut ? (
                                    <TooltipTrigger
                                      tooltip={<Tooltip>{shortcut}</Tooltip>}
                                    >
                                      {/* Span needed for tooltip to work, in the current implementation of tooltip */}
                                      <span>{title}</span>
                                    </TooltipTrigger>
                                  ) : (
                                    title
                                  )}
                                </Item>
                              );
                            }) as any /*when a static Item is rendered before this array, it wrongly complains about the type*/
                          }
                        </Tabs>
                      </div>
                      {currentTabContributor?.headerFilters}
                      <IconButton style={{ margin: "0 0.5rem" }} isDisabled>
                        <PlatformIcon icon="actions/moveToLeftBottom" />
                      </IconButton>
                    </StyledHeader>
                  </Popup.Header>
                  <StyledSearchFieldContainer>
                    <PlatformIcon icon="actions/search" />
                    <FocusScope contain>
                      <Input
                        {...collectionSearchInputProps}
                        autoFocus
                        onFocus={(event) => {
                          event.target.select();
                        }}
                        value={pattern}
                        onChange={(e) =>
                          onPatternChanged(e.currentTarget.value)
                        }
                      />
                    </FocusScope>
                    <StyledSearchFieldHint>
                      {currentTabContributor?.searchAdvertiser}
                    </StyledSearchFieldHint>
                  </StyledSearchFieldContainer>
                </>
              }
              content={
                <>
                  <StyledDivider />
                  {pattern && (
                    <StyledSearchResultsContainer>
                      <List
                        ref={collectionRef}
                        selectionManagerRef={selectionManagerRef}
                        items={visibleSearchResult}
                        selectionMode="single"
                        showAsFocused
                        shouldFocusWrap
                        fillAvailableSpace
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        onAction={(key) => {
                          if (key === LOAD_MORE_ITEM_KEY) {
                            setSearchResultLimit(
                              (limit) => limit + SEARCH_RESULT_LIMIT
                            );
                            const nextItem =
                              searchResult[visibleSearchResult.length + 1];
                            if (nextItem) {
                              // nextItem is expected to always have value

                              // Timeout needed to let the item get rendered first. Could be done in an effect instead,
                              // if we want to avoid setTimeout
                              setTimeout(() => {
                                setSelectedKeys(new Set([nextItem.key]));
                                selectionManagerRef.current?.setFocusedKey(
                                  nextItem.key
                                );
                              });
                            }
                          } else {
                            close();
                            // Making sure the popup is fully closed before the new action is performed. One edge case that can
                            // make a difference is actions like FindAction that open the same popup. By performing an action
                            // async, we make sure the popup is closed and reopened, which is good, because otherwise, the user
                            // won't get any feedback when choosing such actions.
                            setTimeout(() => {
                              const itemWrapper = searchResult.find(
                                (item) => item.key === key
                              );
                              itemWrapper?.contributor.processSelectedItem(
                                itemWrapper.item
                              );
                              /**
                               * The 50ms timeout is a workaround for an issue in FocusScope:
                               * restoreFocus only works if the previously focused element is in the dom, when the focus
                               * scope is unmounted. In case of SearchEveryWhere, actions like "Rollback" open a modal
                               * window, which has a focus scope, when the window is opened, the currently focused
                               * element (which will be the one to restore focus to), is search everywhere dialog, which
                               * is immediately closed. So when the modal window is closed, it tries to move focus back
                               * to search everywhere dialog, which is long gone! It would be nice if FocusScope could
                               * track a chain of nodes to restore focus to.
                               * With this 50ms timeout, focus is first restored to where it was, after SearchEveryWhere
                               * is closed, and then the actions is performed, for focus restoration to work.
                               */
                            }, 50);
                          }
                        }}
                      >
                        {({ key, item, contributor }) => {
                          if (key === LOAD_MORE_ITEM_KEY) {
                            return (
                              <Item key={LOAD_MORE_ITEM_KEY}>
                                <StyledLoadMore>...more</StyledLoadMore>
                              </Item>
                            );
                          }
                          return (
                            <Item
                              key={key}
                              textValue={contributor.getItemText(item)}
                            >
                              {contributor.renderItem(item)}
                            </Item>
                          );
                        }}
                      </List>
                      {searchResult.length === 0 && (
                        <StyledPlaceholder>
                          No actions with such name found
                        </StyledPlaceholder>
                      )}
                    </StyledSearchResultsContainer>
                  )}
                </>
              }
              footer={
                <Popup.Hint>
                  {tips.current} <Link onPress={tips.next}>Next Tip</Link>
                </Popup.Hint>
              }
            />
          </div>
        )}
      </ActionsProvider>
    </ContentAwarePopup>
  );
}
