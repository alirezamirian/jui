import path from "path";
import { HighlightedTextValue, ItemLayout } from "@intellij-platform/core";
import React from "react";

import {
  createChangesTreeNodeRenderer,
  formatFileCount,
  NodeRenderer,
  simpleGroupingRenderer,
} from "../../Changes/ChangesTree/changesTreeNodeRenderers";
import { RepositoryNode } from "../../Changes/ChangesTree/ChangeTreeNode";
import { RepoColorIcon } from "../../Changes/StyledRepoColorSquare";
import { shortenOid } from "../../commit-utils";
import {
  CommitChangesTreeNode,
  CommitParentChangeTreeNode,
} from "./createCommitsChangesTreeState";

const repoNodeRenderer: NodeRenderer<RepositoryNode> = (
  node,
  { fileCount }
) => ({
  textValue: path.basename(node.repository.dir),
  rendered: (
    <ItemLayout>
      <RepoColorIcon rootPath={node.repository.dir} />
      <HighlightedTextValue />
      <ItemLayout.Hint>{formatFileCount(fileCount)}</ItemLayout.Hint>
    </ItemLayout>
  ),
});
const commitParentNodeRenderer = simpleGroupingRenderer(
  (node: CommitParentChangeTreeNode) =>
    `Changes to ${shortenOid(path.basename(node.oid))} ${node.subject.slice(
      0,
      50
    )}`
);
export const commitChangesTreeNodeRenderer =
  createChangesTreeNodeRenderer<CommitChangesTreeNode>(
    {
      commitParent: commitParentNodeRenderer,
    },
    {
      repo: repoNodeRenderer,
    }
  );
