import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  HighlightedTextValue,
  Item,
  PlatformIcon,
  SpeedSearchTree,
} from "@intellij-platform/core";
import { StyledTreeIconWrapper } from "../../../TreeUtils/StyledTreeIconWrapper";
import { DIR_ICON, getFilename, getIconForFile } from "../../../file-utils";
import { StyledTreeNodeWrapper } from "../../../TreeUtils/StyledTreeNodeWrapper";
import {
  AnyNode,
  ChangeBrowserNode,
  ChangeListNode,
  ChangeNode,
  changesTreeNodesState,
  DirectoryNode,
  expandedKeysState,
  RepositoryNode,
  selectedKeysState,
} from "./ChangesView.state";
import { RepoColorIcon } from "./StyledRepoColorSquare";

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

const repoNodeItemProps: NodeRenderer<RepositoryNode> = (node) => ({
  textValue: node.repository.dir.split("/").slice(-1)[0],
  element: (
    <>
      <RepoColorIcon rootPath={node.repository.dir} />
      <HighlightedTextValue />
    </>
  ),
});

const directoryNodeItemProps: NodeRenderer<DirectoryNode> = (node) => ({
  textValue: node.dirPath.slice(
    node.parentNodePath ? node.parentNodePath.length + 1 : 0
  ),
  element: (
    <StyledTreeNodeWrapper>
      <StyledTreeIconWrapper>
        <PlatformIcon icon={DIR_ICON} />
      </StyledTreeIconWrapper>
      <HighlightedTextValue />
    </StyledTreeNodeWrapper>
  ),
});

const changeListNodeItemProps: NodeRenderer<ChangeListNode> = (node) => ({
  textValue: node.changeList.name,
  element: (
    <span style={{ fontWeight: node.changeList.active ? "bold" : undefined }}>
      <HighlightedTextValue />
    </span>
  ),
});

const changeNodeItemProps: NodeRenderer<ChangeNode> = (node) => ({
  textValue: getFilename(node.change.after.path),
  element: (
    <StyledTreeNodeWrapper>
      <StyledTreeIconWrapper>
        <PlatformIcon icon={getIconForFile(node.change.after.path)} />
      </StyledTreeIconWrapper>
      <HighlightedTextValue />
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
 * TODO: use the real changes instead of the dummy ones
 * TODO: show number of changes next to each node
 * TODO: checkboxes
 * TODO: unversioned files
 * TODO: add proper path and filename utils
 */
export const ChangeViewTree = (): JSX.Element => {
  const changeListNodes = useRecoilValue(changesTreeNodesState);
  const [selectedKeys, setSelectedKeys] = useRecoilState(selectedKeysState);
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);

  return (
    <SpeedSearchTree
      items={changeListNodes}
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
        const { textValue, element } = nodeRenderers[node.type](
          node,
          { fileCount: 1, dirCount: 0 } /* FIXME*/
        );
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
