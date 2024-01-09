import React from "react";
import { ItemElement } from "@react-types/shared/src/collections";
import {
  ActionTooltip,
  HighlightedTextValue,
  Item,
  ItemLayout,
  PlatformIcon,
  Tooltip,
  TooltipTrigger,
} from "@intellij-platform/core";
import { basename } from "path";

import { TrackingBranchInfo } from "../TrackingBranchInfo";
import { RepoColorIcon } from "../Changes/ChangesView/StyledRepoColorSquare";

import { AnyBranchTreeNode } from "./BranchesTree.state";

export const branchTreeNodeRenderers: {
  [nodeType in AnyBranchTreeNode["type"]]: (
    node: AnyBranchTreeNode & { type: nodeType }
  ) => ItemElement<AnyBranchTreeNode>;
} = {
  branchType: (node) => {
    return (
      <Item
        key={`${node.type}:${node.branchType}`}
        textValue={wordCase(node.branchType)}
        childItems={node.children}
      >
        <HighlightedTextValue />
      </Item>
    );
  },
  localBranch: (node) => {
    return (
      <Item key={`${node.key}`} textValue={basename(node.name)}>
        <ItemLayout>
          <TooltipTrigger
            tooltip={
              <ActionTooltip
                actionName={<TrackingBranchInfo branches={node.branches} />}
              ></ActionTooltip>
            }
          >
            {(props) => (
              <ItemLayout.Group {...props}>
                {node.isCurrent ? (
                  <TooltipTrigger
                    tooltip={
                      <Tooltip>
                        Current {node.isFavorite && "favorite "}branch
                      </Tooltip>
                    }
                  >
                    {(props) => (
                      <ItemLayout.Group {...props}>
                        <PlatformIcon
                          icon={
                            node.isFavorite
                              ? "/platform/dvcs-impl/resources/icons/currentBranchFavoriteLabel.svg"
                              : "/platform/dvcs-impl/resources/icons/currentBranchLabel.svg"
                          }
                        />
                      </ItemLayout.Group>
                    )}
                  </TooltipTrigger>
                ) : (
                  <PlatformIcon icon="vcs/branchNode" />
                )}
                <HighlightedTextValue />
                {node.repos && (
                  <ItemLayout.Hint>({node.repos.join(", ")})</ItemLayout.Hint>
                )}
              </ItemLayout.Group>
            )}
          </TooltipTrigger>
        </ItemLayout>
      </Item>
    );
  },
  remoteBranch: (node) => {
    return (
      <Item key={`${node.key}`} textValue={basename(node.name)}>
        <ItemLayout>
          <PlatformIcon
            icon={node.isFavorite ? "nodes/favorite.svg" : "vcs/branchNode"}
          />
          <HighlightedTextValue />
          {node.repos && (
            <ItemLayout.Hint>({node.repos.join(", ")})</ItemLayout.Hint>
          )}
        </ItemLayout>
      </Item>
    );
  },
  repository: (node) => (
    <Item
      key={`${node.key}`}
      textValue={basename(node.repoRoot)}
      childItems={node.children}
    >
      <ItemLayout>
        <RepoColorIcon rootPath={node.repoRoot} />
        <HighlightedTextValue />
      </ItemLayout>
    </Item>
  ),
  directory: (node) => (
    <Item
      key={`${node.type}_${node.parentNodePath}${node.dirPath}`}
      textValue={basename(node.dirPath)}
      childItems={node.children}
    >
      <ItemLayout>
        <PlatformIcon icon="nodes/folder.svg" />
        <HighlightedTextValue />
      </ItemLayout>
    </Item>
  ),
  head: (node) => (
    <Item key={`${node.type}`} textValue="HEAD (Current Branch)">
      <HighlightedTextValue />
    </Item>
  ),
};

function wordCase(input: string): string {
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}
