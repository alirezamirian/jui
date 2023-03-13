import { IntlMessageFormat } from "intl-messageformat";
import {
  AnyNode,
  ChangeBrowserNode,
  ChangeListNode,
  ChangeNode,
  changesGroupingState,
  DirectoryNode,
  isGroupNode,
  RepositoryNode,
} from "./ChangesView.state";
import React, { Key } from "react";
import { ItemProps } from "@react-types/shared";
import path from "path";
import {
  HighlightedTextValue,
  ItemLayout,
  PlatformIcon,
} from "@intellij-platform/core";
import { RepoColorIcon } from "./StyledRepoColorSquare";
import { StyledCurrentBranchTag } from "./StyledCurrentBranchTag";
import { CurrentBranchName } from "../../CurrentBranchName";
import { DIR_ICON, getIconForFile } from "../../../file-utils";
import { useRecoilValue } from "recoil";

/**
 * Necessary properties for each node, to be passed to `Item`s rendered in tree.
 * Some properties like `key` or `childItems` are not included, as they are calculated similarly
 * for all types of nodes.
 */
type RenderedNode = { textValue: string; rendered: React.ReactNode };
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
  rendered: (
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
  textValue: node.parentNodePath
    ? path.relative(node.parentNodePath, node.dirPath)
    : node.dirPath,
  rendered: (
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
  rendered: (
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
  rendered: (
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

export const getChangeListTreeItemProps = ({
  node,
  fileCountsMap,
}: {
  node: AnyNode;
  fileCountsMap: Map<Key, number>;
}): ItemProps<AnyNode> & { key: Key } => {
  // Would make sense to handle missing renderer case if implementation is changed to be extensible with regard
  // to node types
  const nodeRenderer: NodeRenderer<any> /* FIXME: why is any needed? */ =
    nodeRenderers[node.type];
  const { textValue, rendered } = nodeRenderer(node, {
    fileCount: fileCountsMap.get(node.key) || 0,
    dirCount: 0, // It seems it's only used for ignored files subtree
  });
  return {
    key: node.key,
    childItems: isGroupNode(node) ? node.children : [],
    hasChildItems: isGroupNode(node) && node.children?.length > 0,
    textValue,
    children: rendered,
  };
};
