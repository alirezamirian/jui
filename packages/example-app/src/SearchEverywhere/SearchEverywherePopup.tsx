import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ActionButton,
  ActionDefinition,
  ActionsProvider,
  Checkbox,
  CommonActionId,
  FocusScope,
  getAvailableActionsFor,
  Item,
  Link,
  List,
  minusculeMatch,
  PlatformIcon,
  Popup,
  Selection,
  SelectionManager,
  styled,
  StyledTabProps,
  Tabs,
  useCollectionSearchInput,
} from "@intellij-platform/core";
import { ActionItem } from "./ActionItem";
import { useTips } from "./useTips";
import { Input } from "./Input";
import {
  searchEverywhereState,
  SearchEveryWhereTab,
} from "./searchEverywhere.state";
import { ContentAwarePopup } from "./ContentAwarePopup";

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
  padding: 0.5rem 0.75rem;
  background: ${({ theme, selected }) =>
    selected && theme.color("SearchEverywhere.Tab.selectedBackground")};
  color: ${({ theme }) =>
    theme.color("SearchEverywhere.Tab.selectedForeground")};
  opacity: ${({ disabled }) => disabled && ".5"};
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
  padding: 0.125rem 0.75rem 0; // Not sure why, but alignment is off without 2px (0.125rem) padding top
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
const StyledPlaceholder = styled.div`
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  position: absolute;
  text-align: center;
  width: 100%;
  top: 50%;
`;

/**
 * TODO: implement history navigation
 */
export function SearchEverywherePopup() {
  const setOpen = useSetRecoilState(searchEverywhereState.isOpen);
  const [tab, setTab] = useRecoilState(searchEverywhereState.tab);
  const contextElement = useRecoilValue(searchEverywhereState.contextElement);
  const [showDisabledActions, setShowDisabledActions] = useState(false);
  const isScopeExplicitlySetRef = useRef(false);
  const [inputValue, setInputValue] = useRecoilState(
    searchEverywhereState.searchQuery
  );
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const allActions = useMemo(
    () => (contextElement ? getAvailableActionsFor(contextElement) : []),
    [contextElement]
  );
  const { searchResult, autoEnableMoreResults } = useMemo(() => {
    const allResults = allActions
      .map((action) => ({
        highlights: minusculeMatch(action.title, inputValue),
        action,
      }))
      .filter(
        ({ action, highlights }) =>
          highlights || minusculeMatch(action.description || "", inputValue)
      );
    const enabledResults = allResults.filter(
      ({ action: { isDisabled } }) => !isDisabled
    );
    // TODO: sort results
    return {
      searchResult: showDisabledActions ? allResults : enabledResults,
      autoEnableMoreResults: enabledResults.length === 0,
    };
  }, [inputValue, allActions, showDisabledActions]);

  useEffect(() => {
    if (!isScopeExplicitlySetRef.current) {
      setShowDisabledActions(autoEnableMoreResults);
    }
  }, [autoEnableMoreResults]);

  useEffect(() => {
    if (searchResult[0]) {
      const key = searchResult[0].action.id;
      setSelectedKeys(new Set([key]));
      selectionManagerRef.current?.setFocusedKey(key);
    }
  }, [searchResult]);

  const close = () => setOpen(false);

  const collectionRef = useRef<HTMLUListElement>(null);
  const selectionManagerRef = useRef<SelectionManager>(null);
  const { collectionSearchInputProps } = useCollectionSearchInput({
    collectionRef,
    selectionManager: selectionManagerRef.current,
  });

  const localActions: { [id: string]: ActionDefinition } = {
    /**
     * Toggling search everywhere (include disabled actions, in actions tab), on GoToAction. In the original impl,
     * it's handled in GoToAction itself. It would be easy to do the same here too, by just making the state an atom,
     * instead of a local state here. But it would require making top level actions (handled in Project component)
     * available here too, which is also feasible, by passing project level actions to this component somehow, or even
     * having an option for popups to "inherit" actions from where they are rendered in.
     */
    [CommonActionId.GO_TO_ACTION]: {
      title: "Toggle search everywhere",
      actionPerformed() {
        setShowDisabledActions((currentValue) => !currentValue);
      },
    },
    [CommonActionId.SHOW_INTENTION_ACTIONS]: {
      title: "Assign a shortcut",
      actionPerformed() {
        alert("Not implemented!");
      },
    },
  };

  const tips = useTips();
  return (
    <ContentAwarePopup
      persistedBoundsState={searchEverywhereState.bounds}
      hasContent={Boolean(inputValue)}
      noContentHeight={59}
      minWidth={670}
      minHeight={160}
      interactions="all"
      onClose={close}
    >
      <ActionsProvider actions={localActions}>
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
                          disabledKeys={[
                            "All",
                            "Classes",
                            "Files",
                            "Symbols",
                            "Git",
                          ]}
                        >
                          <Item key="All">All</Item>
                          <Item key="Classes">Classes</Item>
                          <Item key="Files">Files</Item>
                          <Item key="Symbols">Symbols</Item>
                          <Item key="Actions">Actions</Item>
                          <Item key="Git">Git</Item>
                        </Tabs>
                      </div>
                      <Checkbox
                        preventFocus
                        isSelected={showDisabledActions}
                        onChange={(value) => {
                          setShowDisabledActions(value);
                          isScopeExplicitlySetRef.current = true;
                        }}
                      >
                        Include disabled actions
                      </Checkbox>
                      <ActionButton style={{ margin: "0 0.5rem" }} isDisabled>
                        <PlatformIcon icon="actions/moveToLeftBottom" />
                      </ActionButton>
                    </StyledHeader>
                  </Popup.Header>
                  <StyledSearchFieldContainer>
                    <PlatformIcon icon="actions/search" />
                    <FocusScope contain>
                      <Input
                        {...collectionSearchInputProps}
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.currentTarget.value)}
                      />
                    </FocusScope>
                    <StyledSearchFieldHint>
                      Press ⌥⏎ to assign a shortcut
                    </StyledSearchFieldHint>
                  </StyledSearchFieldContainer>
                </>
              }
              content={
                <>
                  <StyledDivider />
                  {inputValue && (
                    <StyledSearchResultsContainer>
                      <List
                        ref={collectionRef}
                        selectionManagerRef={selectionManagerRef}
                        items={searchResult}
                        selectionMode="single"
                        alwaysShowAsFocused
                        shouldFocusWrap
                        fillAvailableSpace
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        onAction={(key) => {
                          close();
                          // Making sure the popup is fully closed before the new action is performed. One edge case that can
                          // make a difference is actions like FindAction that open the same popup. By performing an action
                          // async, we make sure the popup is closed and reopened, which is good, because otherwise, the user
                          // won't get any feedback when choosing such actions.
                          setTimeout(() => {
                            allActions
                              .find((action) => action.id === key)
                              ?.perform({
                                event: null,
                                element: contextElement,
                              });
                          });
                        }}
                      >
                        {({ action, highlights }) => (
                          <Item key={action.id}>
                            <ActionItem
                              action={action}
                              highlights={highlights}
                            />
                          </Item>
                        )}
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
