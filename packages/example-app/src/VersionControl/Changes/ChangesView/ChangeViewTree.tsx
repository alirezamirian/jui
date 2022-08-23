import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ContextMenuContainer,
  Item,
  SpeedSearchTreeWithCheckboxes,
  TreeNodeCheckbox,
} from "@intellij-platform/core";
import {
  changesTreeNodesState,
  expandedKeysState,
  includedChangesNestedSelection,
  selectedKeysState,
} from "./ChangesView.state";
import { ChangesViewTreeContextMenu } from "./ChangesViewTreeContextMenu";
import { getChangeListTreeItemProps } from "./changesTreeNodeRenderers";

/**
 * TODO: fix horizontal scroll issue (https://github.com/alirezamirian/jui/issues/6)
 * TODO: use the real changes instead of the dummy ones
 * TODO: unversioned files
 * TODO: show diff/source on double click (on action to be more precise)
 */
export const ChangeViewTree = (): JSX.Element => {
  const { rootNodes, fileCountsMap } = useRecoilValue(changesTreeNodesState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const nestedSelection = useRecoilValue(includedChangesNestedSelection);

  return (
    <ContextMenuContainer
      renderMenu={() => <ChangesViewTreeContextMenu />}
      style={{ height: "100%" }}
    >
      <SpeedSearchTreeWithCheckboxes
        items={rootNodes}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        onSelectionChange={setSelectedKeys}
        nestedSelection={nestedSelection}
        disallowEmptySelection
        fillAvailableSpace
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
