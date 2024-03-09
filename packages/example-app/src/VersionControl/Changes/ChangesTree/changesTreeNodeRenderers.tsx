import { IntlMessageFormat } from "intl-messageformat";
import path from "path";
import React, { Key } from "react";
import { ItemProps } from "@react-types/shared";
import {
  HighlightedTextValue,
  Item,
  ItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";

import { DIR_ICON, getIconForFile } from "../../../file-utils";
import { RepoCurrentBranchName } from "../../RepoCurrentBranchName";
import { RepoColorIcon } from "../StyledRepoColorSquare";
import { StyledCurrentBranchTag } from "../StyledCurrentBranchTag";
import { Change } from "../Change";
import {
  ChangeNode,
  ChangesTreeNode,
  DefaultChangesTreeNode,
  DirectoryNode,
  isGroupNode,
  RepositoryNode,
} from "./ChangeTreeNode";

/**
 * Necessary properties for each node, to be passed to `Item`s rendered in tree.
 * Some properties like `key` or `childItems` are not included, as they are calculated similarly
 * for all types of nodes.
 */
type RenderedNode = { textValue: string; rendered: React.ReactNode };
export type NodeRenderer<T extends ChangesTreeNode<any>> = (
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

export function formatFileCount(fileCount: number) {
  return fileCountMsg.format({ fileCount });
}
const repoNodeItemProps: NodeRenderer<RepositoryNode> = (
  node,
  { fileCount }
) => ({
  textValue: path.basename(node.repository.dir),
  rendered: (
    <ItemLayout>
      <RepoColorIcon rootPath={node.repository.dir} />
      <HighlightedTextValue />
      <ItemLayout.Hint>{formatFileCount(fileCount)}</ItemLayout.Hint>
      <StyledCurrentBranchTag>
        <RepoCurrentBranchName repo={node.repository} />
      </StyledCurrentBranchTag>
    </ItemLayout>
  ),
});
const directoryNodeItemProps: NodeRenderer<DirectoryNode> = (
  node,
  { fileCount }
) => ({
  textValue: node.parentNodePath
    ? path.relative(node.parentNodePath, node.dirPath)
    : node.dirPath,
  rendered: (
    <ItemLayout>
      <PlatformIcon icon={DIR_ICON} />
      <HighlightedTextValue />
      <ItemLayout.Hint>{formatFileCount(fileCount)}</ItemLayout.Hint>
    </ItemLayout>
  ),
});
const ChangeNodeHint = ({ node }: { node: ChangeNode }): React.ReactElement => {
  return (
    <ItemLayout.Hint>
      {node.showPath && path.dirname(Change.path(node.change))}
    </ItemLayout.Hint>
  );
};
const changeNodeItemProps: NodeRenderer<ChangeNode> = (node) => ({
  textValue: path.basename(Change.path(node.change)),
  rendered: (
    <ItemLayout>
      <PlatformIcon icon={getIconForFile(Change.path(node.change))} />
      <HighlightedTextValue />
      <ChangeNodeHint node={node} />
    </ItemLayout>
  ),
});

type NodeRenderersMap<T extends ChangesTreeNode<any>> = {
  [type in T["type"]]: NodeRenderer<T & { type: type }>;
};

const defaultNodeRenderers: NodeRenderersMap<DefaultChangesTreeNode> = {
  repo: repoNodeItemProps,
  directory: directoryNodeItemProps,
  change: changeNodeItemProps,
};

export const createChangesTreeNodeRenderer = <T extends ChangesTreeNode<any>>(
  renderers: Omit<
    NodeRenderersMap<T>,
    keyof NodeRenderersMap<DefaultChangesTreeNode>
  >
) => {
  const nodeRenderers: NodeRenderersMap<T> = {
    ...defaultNodeRenderers,
    ...renderers,
  };
  const getItemProps = ({
    node,
    fileCountsMap,
  }: {
    node: T;
    fileCountsMap: Map<Key, number>;
  }): ItemProps<T> & { key: Key } => {
    // Would make sense to handle missing renderer case if implementation is changed to be extensible with regard
    // to node types
    const nodeRenderer: NodeRenderer<T> =
      nodeRenderers[node.type as T["type"] /* Why is this cast needed?!*/];
    const { textValue, rendered } = nodeRenderer(node, {
      fileCount: fileCountsMap.get(node.key) || 0,
      dirCount: 0, // It seems it's only used for ignored files subtree
    });
    return {
      key: node.key,
      childItems: isGroupNode(node) ? (node.children as T[]) : [],
      hasChildItems: isGroupNode(node) && node.children?.length > 0,
      textValue,
      children: rendered,
    };
  };
  return {
    getItemProps,
    itemRenderer:
      ({ fileCountsMap }: { fileCountsMap: Map<Key, number> }) =>
      (node: T) =>
        <Item {...getItemProps({ node, fileCountsMap })} />,
  };
};
