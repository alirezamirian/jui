import React, { Key, RefObject } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import {
  ContextMenuContainer,
  Item,
  SpeedSearchTreeWithCheckboxes,
  TreeNodeCheckbox,
  TreeRefValue,
} from "@intellij-platform/core";
import {
  changesTreeNodesState,
  ChangesViewTreeNode,
  expandedKeysState,
  includedChangesNestedSelection,
  selectedKeysState,
} from "./ChangesView.state";
import { ChangesViewTreeContextMenu } from "./ChangesViewTreeContextMenu";
import { useActivePathsProvider } from "../../../Project/project.state";
import { useEditorStateManager } from "../../../Editor/editor.state";
import { Change } from "../Change";
import { isGroupNode } from "../ChangesTree/ChangeTreeNode";
import { changesViewTreeNodeRenderer } from "./changesViewTreeNodeRenderer";

function findPathsUnderNode(node: ChangesViewTreeNode): string[] {
  if (node?.type === "directory") {
    return [node.dirPath];
  }
  if (node?.type === "change") {
    return [Change.path(node.change)];
  }
  if (isGroupNode(node)) {
    return node.children.flatMap(findPathsUnderNode);
  }
  return [];
}

/**
 * TODO: unversioned files
 * TODO: show diff/source on double click (on action to be more precise)
 */
export const ChangeViewTree = ({
  treeRef,
}: {
  treeRef: RefObject<TreeRefValue>;
}): JSX.Element => {
  const { rootNodes, fileCountsMap, byKey } = useRecoilValue(
    changesTreeNodesState
  );
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const nestedSelection = useRecoilValue(includedChangesNestedSelection);
  const { openPath } = useEditorStateManager();
  const openChangeInEditor = useRecoilCallback(
    ({ snapshot }) =>
      (key: Key) => {
        const changeNode = snapshot
          .getLoadable(changesTreeNodesState)
          .getValue()
          .byKey.get(key);
        if (changeNode?.type === "change") {
          openPath(Change.path(changeNode.change));
        }
        return changeNode;
      },
    []
  );

  const activePathsProviderProps = useActivePathsProvider(
    selectedKeys === "all"
      ? [] // FIXME
      : [...selectedKeys].flatMap((key) => {
          const node = byKey.get(key);
          return node ? findPathsUnderNode(node) : [];
        })
  );

  return (
    <ContextMenuContainer
      renderMenu={() => <ChangesViewTreeContextMenu />}
      style={{ height: "100%" }}
    >
      <SpeedSearchTreeWithCheckboxes
        treeRef={treeRef}
        items={rootNodes}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        onSelectionChange={setSelectedKeys}
        onAction={openChangeInEditor}
        nestedSelection={nestedSelection}
        fillAvailableSpace
        autoFocus="first"
        {...activePathsProviderProps}
      >
        {(node) => {
          const props = changesViewTreeNodeRenderer.getItemProps({
            fileCountsMap,
            node,
          });
          return (
            <Item {...props}>
              {node.children?.length !== 0 && (
                <TreeNodeCheckbox
                  selectionState={nestedSelection.getSelectionState(node)}
                  onToggle={() => nestedSelection.toggle(node)}
                />
              )}
              {props.children}
            </Item>
          );
        }}
      </SpeedSearchTreeWithCheckboxes>
    </ContextMenuContainer>
  );
};
