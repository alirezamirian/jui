import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ContextMenuContainer,
  HighlightedTextValue,
  Item,
  ItemLayout,
  PlatformIcon,
  SpeedSearchTreeWithCheckboxes,
  TreeNodeCheckbox,
} from "@intellij-platform/core";
import { DIR_ICON, getIconForFile } from "../../../file-utils";
import {
  AnyNode,
  ChangeBrowserNode,
  ChangeListNode,
  ChangeNode,
  changesGroupingState,
  changesTreeNodesState,
  DirectoryNode,
  expandedKeysState,
  RepositoryNode,
  selectedChangesNestedSelection,
  selectedKeysState,
} from "./ChangesView.state";
import { RepoColorIcon } from "./StyledRepoColorSquare";
import { IntlMessageFormat } from "intl-messageformat";
import { CurrentBranchName } from "../../CurrentBranchName";
import { StyledCurrentBranchTag } from "./StyledCurrentBranchTag";
import * as path from "path";
import { ChangesViewTreeContextMenu } from "./ChangesViewTreeContextMenu";

/**
 * Necessary properties for each node, to be passed to `Item`s rendered in tree.
 * Some properties like `key` or `childItems` are not included, as they are calculated similarly
 * for all types of nodes.
 */
type RenderedNode = { textValue: string; element: React.ReactNode };

type NodeRenderer<T extends ChangeBrowserNode<any>> = (
  node: T,
  metadata: { fileCount: number; dirCount: number }
) => RenderedNode;

const fileCountMsg = new IntlMessageFormat(
  `{fileCount, plural,
    =0 {No files}
    =1 {1 file}
    other {# files}
  }`,
  "en-US"
);

const repoNodeItemProps: NodeRenderer<RepositoryNode> = (
  node,
  { fileCount }
) => ({
  textValue: path.basename(node.repository.dir),
  element: (
    <ItemLayout>
      <RepoColorIcon rootPath={node.repository.dir} />
      <HighlightedTextValue />
      <ItemLayout.Hint>{fileCountMsg.format({ fileCount })}</ItemLayout.Hint>
      <StyledCurrentBranchTag>
        <CurrentBranchName repo={node.repository} />
      </StyledCurrentBranchTag>
    </ItemLayout>
  ),
});

const directoryNodeItemProps: NodeRenderer<DirectoryNode> = (
  node,
  { fileCount }
) => ({
  textValue: path.relative(node.parentNodePath, node.dirPath),
  element: (
    <ItemLayout>
      <PlatformIcon icon={DIR_ICON} />
      <HighlightedTextValue />
      <ItemLayout.Hint>{fileCountMsg.format({ fileCount })}</ItemLayout.Hint>
    </ItemLayout>
  ),
});

const changeListNodeItemProps: NodeRenderer<ChangeListNode> = (
  node,
  { fileCount }
) => ({
  textValue: node.changeList.name,
  element: (
    <ItemLayout>
      <span style={{ fontWeight: node.changeList.active ? "bold" : undefined }}>
        <HighlightedTextValue />
      </span>
      <ItemLayout.Hint>
        {fileCountMsg.format({ fileCount })}{" "}
        {/*in IntelliJ it's not shown if it's empty, but why not!*/}
      </ItemLayout.Hint>
    </ItemLayout>
  ),
});

const ChangeNodeHint = ({ node }: { node: ChangeNode }): React.ReactElement => {
  const isGroupedByDirectory = useRecoilValue(
    changesGroupingState("directory")
  );
  return (
    <ItemLayout.Hint>
      {!isGroupedByDirectory && path.dirname(node.change.after.path)}
    </ItemLayout.Hint>
  );
};
const changeNodeItemProps: NodeRenderer<ChangeNode> = (node) => ({
  textValue: path.basename(node.change.after.path),
  element: (
    <ItemLayout>
      <PlatformIcon icon={getIconForFile(node.change.after.path)} />
      <HighlightedTextValue />
      <ChangeNodeHint node={node} />
    </ItemLayout>
  ),
});

const nodeRenderers: {
  [type in AnyNode["type"]]: NodeRenderer<AnyNode & { type: type }>;
} = {
  repo: repoNodeItemProps,
  directory: directoryNodeItemProps,
  changelist: changeListNodeItemProps,
  change: changeNodeItemProps,
};

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
  const nestedSelection = useRecoilValue(selectedChangesNestedSelection);

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
          // Would make sense to handle missing renderer case if implementation is changed to be extensible with regard
          // to node types
          const { textValue, element } = nodeRenderers[node.type](node, {
            fileCount: fileCountsMap.get(node.key) || 0,
            dirCount: 0, // It seems it's only used for ignored files subtree
          });
          return (
            <Item
              key={node.key}
              childItems={node.children}
              hasChildItems={node.children?.length > 0}
              textValue={textValue}
            >
              {node.children?.length !== 0 && (
                <TreeNodeCheckbox
                  selectionState={nestedSelection.getSelectionState(node)}
                  onToggle={() => nestedSelection.toggle(node)}
                />
              )}
              {element}
            </Item>
          );
        }}
      </SpeedSearchTreeWithCheckboxes>
    </ContextMenuContainer>
  );
};
