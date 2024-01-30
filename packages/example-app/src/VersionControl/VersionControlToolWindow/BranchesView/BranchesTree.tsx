import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  PlatformIcon,
  SpeedSearchTree,
  styled,
  useCollectionSearchInput,
} from "@intellij-platform/core";

import {
  branchTreeNodeRenderers,
  keyToBranch,
} from "./branchTreeNodeRenderers";
import {
  branchesTreeNodeState,
  branchesTreeRefState,
  expandedKeysState,
  selectedKeysState,
} from "./BranchesTree.state";
import { StyledHeader } from "../styled-components";
import { vcsLogFilterCurrentTab } from "../vcs-logs.state";
import { TreeSelectionManager } from "@intellij-platform/core/Tree/TreeSelectionManager";
import { mergeProps } from "@react-aria/utils";

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

export function BranchesTree() {
  const branchesTreeNodes = useRecoilValue(branchesTreeNodeState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const treeRef = useRecoilValue(branchesTreeRefState);
  const ref = useRef<HTMLDivElement>(null);
  const selectionManagerRef = useRef<TreeSelectionManager>(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const setBranchFilter = useSetRecoilState(vcsLogFilterCurrentTab.branch);
  const { collectionSearchInputProps } = useCollectionSearchInput({
    collectionRef: ref,
    selectionManager: selectionManagerRef.current,
  });
  // FIXME: selectedKeys and expandedKeys can become invalid due to changes in nodes, which makes the tree view
  //  not react to the key events. Ideally, the tree view should be robust regarding invalid keys, and otherwise
  //  the keys should be validated everytime nodes change.
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledSearchIconContainer>
          <PlatformIcon icon="actions/search" />
        </StyledSearchIconContainer>
        {/* FIXME: tabIndex -1 is a workaround to not get the input focused when the toolwindow opens. Not ideal.*/}
        <StyledSearchInput
          tabIndex={-1}
          {...mergeProps(collectionSearchInputProps, {
            onFocus: () => setInputFocused(true),
            onBlur: () => setInputFocused(false),
          })}
        />
      </StyledHeader>
      <SpeedSearchTree
        ref={ref}
        treeRef={treeRef}
        selectionManagerRef={selectionManagerRef}
        items={branchesTreeNodes}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        onAction={(key) => {
          const branch = keyToBranch(`${key}`);
          if (branch) {
            setBranchFilter([branch]);
          }
        }}
        fillAvailableSpace
        showAsFocused={isInputFocused}
      >
        {(node) => {
          // @ts-expect-error we need to somehow infer the type of `node.type`
          return branchTreeNodeRenderers[node.type](node);
        }}
      </SpeedSearchTree>
    </StyledContainer>
  );
}
