import React, { Key, useState } from "react";
import { Selection } from "@react-types/shared";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ActionButton,
  ActionButtonWithMenu,
  ActionToolbar,
  Button,
  Checkbox,
  ContextMenuContainer,
  Item,
  Menu,
  ModalWindow,
  PlatformIcon,
  Section,
  SpeedSearchTreeWithCheckboxes,
  styled,
  TreeNodeCheckbox,
  useBalloons,
  useNestedSelectionState,
  WindowLayout,
} from "@intellij-platform/core";
import {
  AnyNode,
  changesTreeNodesState,
  getNodeKeyForChange,
  isGroupNode,
} from "../ChangesView/ChangesView.state";
import { ChangesViewTreeContextMenu } from "../ChangesView/ChangesViewTreeContextMenu";
import { getChangeListTreeItemProps } from "../ChangesView/changesTreeNodeRenderers";
import { rollbackViewState } from "./rollbackView.state";
import { allChangesState, useChangeListManager } from "../change-lists.state";
import { getExpandAllKeys } from "../../../TreeUtils/tree-utils";
import { ChangesSummary } from "../ChangesSummary";
import { groupings } from "../ChangesView/changesGroupings";

const StyledContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem 0;
`;
const StyledFrame = styled.div`
  border: 1px solid ${({ theme }) => theme.commonColors.contrastBorder};
  flex: 1;
  overflow: auto;
`;

const StyledLine = styled.div`
  line-height: 2;
  padding-left: 0.5rem;
`;

export function RollbackWindow() {
  const defaultExpandedKeys = useRecoilValue(
    rollbackViewState.initiallyExpandedKeys
  );
  const initiallyIncludedChangeKeys = useRecoilValue(
    rollbackViewState.initiallyIncludedChanges
  ).map(getNodeKeyForChange);
  const { fileCountsMap } = useRecoilValue(changesTreeNodesState);
  const [windowBounds, setWindowBounds] = useRecoilState(
    rollbackViewState.windowBounds
  );
  const rootNodes = useRecoilValue(rollbackViewState.rootNodes);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<Key>());
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    defaultExpandedKeys
  );
  const [includedChangeKeys, setIncludedChangeKeys] = useState(
    new Set<Key>(initiallyIncludedChangeKeys)
  );
  const nestedSelection = useNestedSelectionState<AnyNode>(
    {
      rootNodes,
      getKey: (node) => node.key,
      getChildren: (node) => (isGroupNode(node) ? node.children : null),
    },
    {
      selectedKeys: includedChangeKeys,
      onSelectedKeysChange: setIncludedChangeKeys,
    }
  );
  const allChanges = useRecoilValue(allChangesState);
  const includedChanges = allChanges.filter((change) =>
    includedChangeKeys.has(getNodeKeyForChange(change))
  );
  const changeListManager = useChangeListManager();
  const balloons = useBalloons();
  const setOpen = useSetRecoilState(rollbackViewState.isOpen);
  const close = () => setOpen(false);
  const expandAll = () =>
    setExpandedKeys(
      new Set(
        getExpandAllKeys<AnyNode>(
          (node) =>
            node == null ? rootNodes : isGroupNode(node) ? node.children : null,
          (node) => node.key
        )
      )
    );
  const collapseAll = () => setExpandedKeys(new Set());

  return (
    <ModalWindow
      title="Rollback changes"
      onClose={close}
      bounds={windowBounds}
      onBoundsChange={setWindowBounds}
      minHeight={200}
      footer={
        <>
          <div
            style={{
              padding: "0 .75rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StyledLine>
              <ChangesSummary changes={includedChanges} />
            </StyledLine>
            <Checkbox isDisabled>
              Delete local copies of the added files
            </Checkbox>
          </div>
          <WindowLayout.Footer
            right={
              <>
                <Button onPress={close}>Cancel</Button>
                <Button
                  variant="default"
                  onPress={() => {
                    changeListManager
                      .rollback(includedChanges)
                      .catch((e) => {
                        balloons.show({
                          title: "Reverting changes failed",
                          icon: "Error",
                          body:
                            "Could not revert selected changes. See console for more info",
                        });
                        console.error("Git revert error:", e);
                      })
                      .finally(close);
                  }}
                >
                  Rollback
                </Button>
              </>
            }
          />
        </>
      }
    >
      <StyledContainer>
        <div style={{ display: "flex" }}>
          <ActionToolbar>
            <ActionButton isDisabled>
              <PlatformIcon icon="actions/diff" />
            </ActionButton>
            <ActionButtonWithMenu
              renderMenu={({ menuProps }) => (
                <Menu
                  {...menuProps}
                  selectedKeys={[] /* FIXME */}
                  onAction={(key) => {
                    // FIXME
                    alert("not implemented");
                  }}
                >
                  <Section title="Group By">
                    {
                      // FIXME
                      groupings.map((grouping) => (
                        <Item key={grouping.id}>{grouping.title}</Item>
                      ))
                    }
                  </Section>
                </Menu>
              )}
            >
              <PlatformIcon icon="actions/groupBy.svg" />
            </ActionButtonWithMenu>
          </ActionToolbar>
          <span style={{ flex: 1 }} />
          <ActionToolbar>
            <ActionButton onPress={expandAll}>
              <PlatformIcon icon="actions/expandall" />
            </ActionButton>
            <ActionButton onPress={collapseAll}>
              <PlatformIcon icon="actions/collapseall" />
            </ActionButton>
          </ActionToolbar>
        </div>

        <StyledFrame>
          <ContextMenuContainer
            renderMenu={() => <ChangesViewTreeContextMenu />}
            style={{ height: "100%" }}
          >
            <SpeedSearchTreeWithCheckboxes
              items={rootNodes}
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              expandedKeys={expandedKeys}
              onExpandedChange={setExpandedKeys}
              nestedSelection={nestedSelection}
              disallowEmptySelection
              fillAvailableSpace
            >
              {(node) => {
                const props = getChangeListTreeItemProps({
                  node,
                  fileCountsMap,
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
        </StyledFrame>
      </StyledContainer>
    </ModalWindow>
  );
}
