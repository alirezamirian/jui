import React, { Key, RefObject, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import {
  ContextMenuContainer,
  Item,
  SpeedSearchTreeWithCheckboxes,
  TreeNodeCheckbox,
  TreeRefValue,
} from "@intellij-platform/core";
import {
  changesTreeNodesAtom,
  ChangesViewTreeNode,
  expandedKeysAtom,
  includedChangesNestedSelectionAtom,
  selectedKeysAtom,
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
  const { rootNodes, fileCountsMap, byKey } =
    useAtomValue(changesTreeNodesAtom);
  const [selectedKeys, setSelectedKeys] = useAtom(selectedKeysAtom);
  const [expandedKeys, setExpandedKeys] = useAtom(expandedKeysAtom);
  const nestedSelection = useAtomValue(includedChangesNestedSelectionAtom);
  const { openPath } = useEditorStateManager();
  const openChangeInEditor = useAtomCallback(
    useCallback((get, _set, key: Key) => {
      const changeNode = get(changesTreeNodesAtom).byKey.get(key);
      if (changeNode?.type === "change") {
        openPath(Change.path(changeNode.change));
      }
      return changeNode;
    }, [])
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
        aria-label="Commit changes tree" // no aria-label in the reference impl
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
