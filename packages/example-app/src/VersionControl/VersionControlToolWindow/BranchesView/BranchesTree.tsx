import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PlatformIcon, SpeedSearchTree, styled } from "@intellij-platform/core";

import {
  branchTreeNodeRenderers,
  keyToBranch,
} from "./branchTreeNodeRenderers";
import {
  branchesTreeNodeState,
  branchesTreeRefState,
  expandedKeysState,
  searchInputState,
  selectedKeysState,
} from "./BranchesTree.state";
import { StyledHeader } from "../styled-components";
import { vcsLogFilterCurrentTab } from "../vcs-logs.state";
import { useLatestRecoilValue } from "../../../recoil-utils";

const StyledSearchInput = styled.input`
  all: unset;
  flex: 1;
  align-self: stretch;
`;
const StyledContainer = styled.div`
  min-width: 0; // don't outgrow the container
  flex-grow: 1; // fill the available space
  display: flex;
  flex-direction: column;
`;
const StyledSearchIconContainer = styled.span`
  display: inline-flex;
  margin-top: -0.0625rem;
  margin-left: 0.7rem;
  margin-right: 0.25rem;
  cursor: text;
`;

export function BranchesTree({ tabKey }: { tabKey: string }) {
  const [branchesTreeNodes] = useLatestRecoilValue(branchesTreeNodeState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(
    selectedKeysState(tabKey)
  );
  const [expandedKeys, setExpandedKeys] = useRecoilState(
    expandedKeysState(tabKey)
  );
  const [searchTerm, setSearchTerm] = useRecoilState(searchInputState(tabKey));
  const treeRef = useRecoilValue(branchesTreeRefState(tabKey));
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const setBranchFilter = useSetRecoilState(vcsLogFilterCurrentTab.branch);
  const onAction = (key: React.Key) => {
    const branch = keyToBranch(`${key}`);
    if (branch) {
      setBranchFilter([branch]);
    }
  };

  /**
   * TODO: remaining from search:
   * - Make the search input red when there is no match
   * - filter non-matching tree nodes out
   * - search in the whole tree, not just nodes that are currently visible based on expandedKeys
   *   - update expanded keys to show matches, as a side effect, every time matches are updated.
   * The above items are postponed to think more about flexibility of SpeedSearchTree API.
   * Some rough thoughts about different approaches:
   * - Provide generic tree utilities to search in the whole tree. In SpeedSearchTree allow for full control over
   * `matches`. It will be in usage side that matches are calculated based on search input value, and passed to
   * SpeedSearchTree as an input.
   * - In SpeedSearchTree, allow for passing a custom search function, which would accept the tree collection object,
   *   the search query, and the default match function (minusculeMatch).
   * - Make Tree more flexible or introduce a more flexible base component, so that speed search for tree can be
   *   implementated in a more composable way. Tree (or TreeBase) would accept props for intercepting `state` creation,
   *   and it would also allow passing additional props to the tree container. Then a more generic CollectionSpeedSearch
   *   component would offer options on how to control and customize speed search, and would return props to be passed
   *   to collection components.
   */

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledSearchIconContainer>
          <PlatformIcon icon="actions/search" />
        </StyledSearchIconContainer>
        {/* FIXME: tabIndex -1 is a workaround to not get the input focused when the toolwindow opens. Not ideal.*/}
        <StyledSearchInput
          ref={searchInputRef}
          tabIndex={-1}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setInputFocused(true);
          }}
          onBlur={() => {
            setInputFocused(false);
          }}
        />
      </StyledHeader>
      <SpeedSearchTree
        ref={ref}
        treeRef={treeRef}
        focusProxyRef={searchInputRef}
        items={branchesTreeNodes ?? []}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        onAction={onAction}
        fillAvailableSpace
        // speed search related props
        showAsFocused={isInputFocused}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        keepSearchActiveOnBlur
        hideSpeedSearchPopup
        isSearchActive
      >
        {(node) => {
          // @ts-expect-error we need to somehow infer the type of `node.type`
          return branchTreeNodeRenderers[node.type](node);
        }}
      </SpeedSearchTree>
    </StyledContainer>
  );
}
