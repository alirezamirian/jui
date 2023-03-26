import path from "path";
import React from "react";
import {
  AutoHoverPlatformIcon,
  Divider,
  Item,
  ItemLayout,
  MenuItemLayout,
  PlatformIcon,
  Popup,
  PopupLayout,
  Section,
  SpeedSearchMenu,
} from "@intellij-platform/core";

import {
  useLatestRecoilValue,
  // useRefreshRecoilValueOnMount,
} from "../../recoil-utils";
import { allBranchesState } from "../branches.state";

export function BranchesPopupContent() {
  const repoBranches = useLatestRecoilValue(allBranchesState);
  // useRefreshRecoilValueOnMount(allBranchesState);

  const isFavoriteBranch = (branch: string) => branch === "master"; // TODO;

  if (!repoBranches) {
    return null;
  }
  const title =
    repoBranches.length === 1
      ? `Git Branches in ${path.basename(repoBranches[0].repoRoot)}`
      : "Git Branches";
  return (
    <PopupLayout
      header={<Popup.Header>{title}</Popup.Header>}
      content={
        <SpeedSearchMenu
          aria-label={title}
          submenuBehavior="toggleOnPress"
          fillAvailableSpace
          autoFocus="first"
          disabledKeys={repoBranches.flatMap(({ localBranches, repoRoot }) =>
            localBranches
              .filter(({ trackingBranch }) => !trackingBranch)
              .map(({ name }) => `${repoRoot}/pull-${name}`)
          )}
          onAction={() => alert("Not implemented")}
        >
          <Item key="new_branch" textValue="New Branch">
            <MenuItemLayout
              icon={<PlatformIcon icon="general/add.svg" />}
              content="New Branch"
            />
          </Item>
          <Item key="checkout_revision">Checkout Tag or Revision...</Item>
          {
            repoBranches.flatMap(
              ({ remoteBranches, localBranches, repoRoot }) => {
                const currentBranch = localBranches.find(
                  ({ isCurrent }) => isCurrent
                )?.name;
                const getSectionLabel = (label: string) =>
                  repoBranches.length > 1
                    ? `${label} in ${path.basename(repoBranches[0].repoRoot)}`
                    : label;
                const compareActions = (
                  branchName: string,
                  isCurrent: boolean
                ) => [
                  !isCurrent && (
                    <Item
                      key={`${repoRoot}/compare-with-branch-${branchName}`}
                    >{`Compare with '${branchName}'`}</Item>
                  ),
                  <Item
                    key={`${repoRoot}/show-diff-with-working-tree-${branchName}`}
                  >
                    Show Diff with Working Tree
                  </Item>,
                  <Divider />,
                ];
                const newBranchActions = (
                  branchName: string,
                  isCurrent: boolean
                ) => [
                  !isCurrent && (
                    <Item key={`${repoRoot}/checkout-${branchName}`}>
                      Checkout
                    </Item>
                  ),
                  <Item
                    key={`${repoRoot}/new-branch-from-${branchName}`}
                  >{`New Branch from '${branchName}'...`}</Item>,
                  !isCurrent && (
                    <Item
                      key={`${repoRoot}/checkout-and-rebase-onto-${branchName}`}
                    >{`Checkout and rebase onto '${branchName}'`}</Item>
                  ),
                  <Divider />,
                ];
                const mergeActions = (
                  branchName: string,
                  currentBranch: string | undefined
                ) =>
                  currentBranch &&
                  branchName !== currentBranch && [
                    <Item
                      key={`${repoRoot}/rebase-current-onto-${branchName}`}
                    >{`Rebase '${currentBranch}' onto '${branchName}'`}</Item>,
                    <Item
                      key={`${repoRoot}/merge-into-current-${branchName}`}
                    >{`Merge '${branchName}' onto '${currentBranch}'`}</Item>,
                    <Divider />,
                  ];

                return [
                  <Section title={getSectionLabel("Local Branches")}>
                    {localBranches.map(
                      ({ name, trackingBranch, isCurrent }) => {
                        return (
                          <Item
                            key={`${repoRoot}/branch-${name}`}
                            textValue={name}
                            title={
                              <MenuItemLayout
                                content={name}
                                icon={
                                  isFavoriteBranch(name) ? (
                                    <PlatformIcon icon="nodes/favorite.svg" />
                                  ) : (
                                    <AutoHoverPlatformIcon
                                      icon="nodes/emptyNode.svg"
                                      hoverIcon="nodes/notFavoriteOnHover.svg"
                                      hoverContainerSelector="[role='menuitem']"
                                    />
                                  )
                                }
                                shortcut={
                                  trackingBranch && (
                                    <ItemLayout.Hint small>
                                      {trackingBranch}
                                    </ItemLayout.Hint>
                                  )
                                }
                              />
                            }
                          >
                            {newBranchActions(name, isCurrent)}
                            {compareActions(name, isCurrent)}
                            {mergeActions(name, currentBranch)}
                            <Item key={`${repoRoot}/pull-${name}`}>Update</Item>
                            <Item key={`${repoRoot}/push-${name}`}>
                              Push...
                            </Item>
                            <Divider />
                            <Item key={`${repoRoot}/rename-${name}`}>
                              Rename...
                            </Item>
                            {!isCurrent && (
                              <Item key={`${repoRoot}/delete-${name}`}>
                                Delete
                              </Item>
                            )}
                          </Item>
                        );
                      }
                    )}
                  </Section>,
                  <Section title={getSectionLabel("Remote Branches")}>
                    {remoteBranches.map((branchName) => (
                      <Item
                        key={`${repoRoot}/branch-${branchName}`}
                        textValue={branchName}
                        title={
                          <MenuItemLayout
                            content={branchName}
                            icon={
                              isFavoriteBranch(branchName) ? (
                                <PlatformIcon icon="nodes/favorite.svg" />
                              ) : (
                                <AutoHoverPlatformIcon
                                  icon="nodes/emptyNode.svg"
                                  hoverIcon="nodes/notFavoriteOnHover.svg"
                                  hoverContainerSelector="[role='menuitem']"
                                />
                              )
                            }
                          />
                        }
                      >
                        {newBranchActions(branchName, false)}
                        {compareActions(branchName, false)}
                        {mergeActions(branchName, currentBranch)}
                        <Item
                          key={`${repoRoot}/pull-into-using-merge-${branchName}`}
                        >{`Pull into '${branchName}' Using Merge`}</Item>
                        <Item
                          key={`${repoRoot}/pull-into-using-rebase-${branchName}`}
                        >{`Pull into '${branchName}' Using Rebase`}</Item>
                        <Divider />
                        <Item key={`${repoRoot}/delete-${branchName}`}>
                          Delete
                        </Item>
                      </Item>
                    ))}
                  </Section>,
                ];
              }
            ) as any
          }
        </SpeedSearchMenu>
      }
    />
  );
}
