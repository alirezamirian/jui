import React, { Key, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Selection } from "@react-types/shared";
import {
  IconButton,
  IconButtonWithMenu,
  ActionsProvider,
  Toolbar,
  Button,
  Checkbox,
  CommonActionId,
  ContextMenuContainer,
  Item,
  Menu,
  ModalWindow,
  PlatformIcon,
  Section,
  SpeedSearchTreeWithCheckboxes,
  styled,
  TreeNodeCheckbox,
  TreeRefValue,
  useBalloonManager,
  useNestedSelectionState,
  useTreeActions,
  WindowLayout,
  ActionButton,
} from "@intellij-platform/core";

import {
  changesTreeNodesState,
  ChangesViewTreeNode,
} from "../ChangesView/ChangesView.state";
import { rollbackViewState } from "./rollbackView.state";
import { allChangesState, useRollbackChanges } from "../change-lists.state";
import { ChangesSummary } from "../ChangesSummary";
import { defaultChangeGroupings } from "../ChangesTree/changesGroupings";
import { RollbackTreeContextMenu } from "./RollbackTreeContextMenu";
import { notImplemented } from "../../../Project/notImplemented";
import {
  getNodeKeyForChange,
  isGroupNode,
} from "../ChangesTree/ChangeTreeNode";
import { changesViewTreeNodeRenderer } from "../ChangesView/changesViewTreeNodeRenderer";

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
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set<Key>(initiallyIncludedChangeKeys.slice(0, 1))
  );
  const [expandedKeys, setExpandedKeys] =
    useState<Set<Key>>(defaultExpandedKeys);
  const [includedChangeKeys, setIncludedChangeKeys] = useState(
    new Set<Key>(initiallyIncludedChangeKeys)
  );
  const nestedSelection = useNestedSelectionState<ChangesViewTreeNode>(
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
  const rollbackChanges = useRollbackChanges();
  const balloons = useBalloonManager();
  const setOpen = useSetRecoilState(rollbackViewState.isOpen);
  const close = () => setOpen(false);

  const treeRef = useRef<TreeRefValue>(null);
  const treeActions = useTreeActions({ treeRef });

  return (
    <ModalWindow
      onClose={close}
      bounds={windowBounds}
      onBoundsChange={setWindowBounds}
      minHeight={200}
      minWidth={275}
    >
      <WindowLayout
        header="Rollback changes"
        content={
          <ActionsProvider actions={treeActions}>
            {({ shortcutHandlerProps }) => (
              <StyledContainer {...shortcutHandlerProps}>
                <div style={{ display: "flex" }}>
                  <Toolbar>
                    <IconButton isDisabled>
                      <PlatformIcon icon="actions/diff" />
                    </IconButton>
                    <IconButtonWithMenu
                      renderMenu={({ menuProps }) => (
                        <Menu
                          {...menuProps}
                          selectedKeys={[] /* FIXME */}
                          // FIXME
                          onAction={notImplemented}
                        >
                          <Section title="Group By">
                            {
                              // FIXME
                              defaultChangeGroupings.map((grouping) => (
                                <Item key={grouping.id}>{grouping.title}</Item>
                              ))
                            }
                          </Section>
                        </Menu>
                      )}
                    >
                      <PlatformIcon icon="actions/groupBy.svg" />
                    </IconButtonWithMenu>
                  </Toolbar>
                  <span style={{ flex: 1 }} />
                  <Toolbar>
                    <ActionButton actionId={CommonActionId.EXPAND_ALL} />
                    <ActionButton actionId={CommonActionId.COLLAPSE_ALL} />
                  </Toolbar>
                </div>

                <StyledFrame>
                  <ContextMenuContainer
                    renderMenu={() => <RollbackTreeContextMenu />}
                    style={{ height: "100%" }}
                  >
                    <SpeedSearchTreeWithCheckboxes
                      treeRef={treeRef}
                      items={rootNodes}
                      selectionMode="multiple"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                      expandedKeys={expandedKeys}
                      onExpandedChange={setExpandedKeys}
                      nestedSelection={nestedSelection}
                      fillAvailableSpace
                    >
                      {(node) => {
                        const props = changesViewTreeNodeRenderer.getItemProps({
                          node,
                          fileCountsMap,
                        });
                        return (
                          <Item {...props}>
                            {node.children?.length !== 0 && (
                              <TreeNodeCheckbox
                                selectionState={nestedSelection.getSelectionState(
                                  node
                                )}
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
            )}
          </ActionsProvider>
        }
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
                      rollbackChanges(includedChanges)
                        .catch((e) => {
                          balloons.show({
                            title: "Reverting changes failed",
                            icon: "Error",
                            body: "Could not revert selected changes. See console for more info",
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
      />
    </ModalWindow>
  );
}
