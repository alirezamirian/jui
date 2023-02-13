import React, { RefObject } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ContextMenuContainer,
  Item,
  SpeedSearchTreeWithCheckboxes,
  TreeNodeCheckbox,
  TreeRefValue,
} from "@intellij-platform/core";
import {
  changesTreeNodesState,
  expandedKeysState,
  includedChangesNestedSelection,
  selectedKeysState,
} from "./ChangesView.state";
import { ChangesViewTreeContextMenu } from "./ChangesViewTreeContextMenu";
import { getChangeListTreeItemProps } from "./changesTreeNodeRenderers";
import { useActivePathsProvider } from "../../../Project/project.state";

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

  const { activePathsProviderProps } = useActivePathsProvider(
    selectedKeys === "all"
      ? [] // FIXME
      : [...selectedKeys]
          .map((key) => {
            const node = byKey.get(key);
            if (node?.type === "directory") {
              return node.dirPath;
            }
            if (node?.type === "change") {
              return node.change.after.path;
            }
            return null;
          })
          .filter((i): i is string => i != null)
  );

  return (
    <ContextMenuContainer
      renderMenu={() => <ChangesViewTreeContextMenu />}
      style={{ height: "100%" }}
    >
      <SpeedSearchTreeWithCheckboxes
        ref={treeRef}
        items={rootNodes}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        onSelectionChange={setSelectedKeys}
        nestedSelection={nestedSelection}
        fillAvailableSpace
        {...activePathsProviderProps}
      >
        {(node) => {
          const props = getChangeListTreeItemProps({
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
