import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  HighlightedTextValue,
  Item,
  PlatformIcon,
  SpeedSearchTree,
} from "@intellij-platform/core";
import { StyledTreeNodeIconWrapper } from "../../../TreeUtils/StyledTreeNodeIconWrapper";
import { DIR_ICON, getIconForFile } from "../../../file-utils";
import { StyledTreeNodeWrapper } from "../../../TreeUtils/StyledTreeNodeWrapper";
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
  selectedKeysState,
} from "./ChangesView.state";
import { RepoColorIcon } from "./StyledRepoColorSquare";
import { StyledTreeNodeHint } from "../../../TreeUtils/StyledTreeNodeHint";
import { IntlMessageFormat } from "intl-messageformat";
import { CurrentBranchName } from "../../CurrentBranchName";
import { StyledCurrentBranchTag } from "./StyledCurrentBranchTag";
import * as path from "path";

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
    <>
      <RepoColorIcon rootPath={node.repository.dir} />
      <HighlightedTextValue />
      <StyledTreeNodeHint>
        {fileCountMsg.format({ fileCount })}
      </StyledTreeNodeHint>
      <StyledCurrentBranchTag>
        <CurrentBranchName repo={node.repository} />
      </StyledCurrentBranchTag>
    </>
  ),
});

const directoryNodeItemProps: NodeRenderer<DirectoryNode> = (
  node,
  { fileCount }
) => ({
  textValue: path.relative(node.parentNodePath, node.dirPath),
  element: (
    <StyledTreeNodeWrapper>
      <StyledTreeNodeIconWrapper>
        <PlatformIcon icon={DIR_ICON} />
      </StyledTreeNodeIconWrapper>
      <HighlightedTextValue />
      <StyledTreeNodeHint>
        {fileCountMsg.format({ fileCount })}
      </StyledTreeNodeHint>
    </StyledTreeNodeWrapper>
  ),
});

const changeListNodeItemProps: NodeRenderer<ChangeListNode> = (
  node,
  { fileCount }
) => ({
  textValue: node.changeList.name,
  element: (
    <StyledTreeNodeWrapper>
      <span style={{ fontWeight: node.changeList.active ? "bold" : undefined }}>
        <HighlightedTextValue />
      </span>
      <StyledTreeNodeHint>
        {fileCountMsg.format({ fileCount })}{" "}
        {/*in IntelliJ it's not shown if it's empty, but why not!*/}
      </StyledTreeNodeHint>
    </StyledTreeNodeWrapper>
  ),
});

const ChangeNodeHint = ({ node }: { node: ChangeNode }): React.ReactElement => {
  const isGroupedByDirectory = useRecoilValue(
    changesGroupingState("directory")
  );
  return (
    <>
      {!isGroupedByDirectory && (
        <StyledTreeNodeHint>
          {path.dirname(node.change.after.path)}
        </StyledTreeNodeHint>
      )}
    </>
  );
};
const changeNodeItemProps: NodeRenderer<ChangeNode> = (node) => ({
  textValue: path.basename(node.change.after.path),
  element: (
    <StyledTreeNodeWrapper>
      <StyledTreeNodeIconWrapper>
        <PlatformIcon icon={getIconForFile(node.change.after.path)} />
      </StyledTreeNodeIconWrapper>
      <HighlightedTextValue />
      <ChangeNodeHint node={node} />
    </StyledTreeNodeWrapper>
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
 * TODO: fix horizontal scroll issue
 * TODO: use the real changes instead of the dummy ones
 * TODO: checkboxes
 * TODO: unversioned files
 * TODO: show diff/source on double click (on action to be more precise)
 */
export const ChangeViewTree = (): JSX.Element => {
  const { rootNodes, fileCountsMap } = useRecoilValue(changesTreeNodesState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);

  return (
    <SpeedSearchTree
      items={rootNodes}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
      onSelectionChange={setSelectedKeys}
      defaultSelectedKeys={[]}
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
            {element}
          </Item>
        );
      }}
    </SpeedSearchTree>
  );
};
