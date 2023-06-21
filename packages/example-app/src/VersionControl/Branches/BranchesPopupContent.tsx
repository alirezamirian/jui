import path from "path";
import React from "react";
import {
  AutoHoverPlatformIcon,
  BalloonActionLink,
  Divider,
  Item,
  ItemLayout,
  MenuItemLayout,
  PlatformIcon,
  Popup,
  PopupLayout,
  Section,
  SpeedSearchMenu,
  useAction,
  useBalloonManager,
} from "@intellij-platform/core";

import {
  useLatestRecoilValue,
  // useRefreshRecoilValueOnMount,
} from "../../recoil-utils";
import { allBranchesState, useDeleteBranch } from "./branches.state";
import { notImplemented } from "../../Project/notImplemented";
import { VcsActionIds } from "../VcsActionIds";

export function BranchesPopupContent({ onClose }: { onClose: () => void }) {
  const repoBranches = useLatestRecoilValue(allBranchesState);

  const newBranchAction = useAction(VcsActionIds.GIT_CREATE_NEW_BRANCH);
  const deleteBranch = useDeleteBranch();
  const balloonManager = useBalloonManager();
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
          onAction={(key) => {
            const [repo, branch, operation] = `${key}`.split("//");

            switch (key) {
              case newBranchAction?.id:
                return newBranchAction?.perform();
              default:
                if (operation === "delete") {
                  return deleteBranch(branch, repo).then(
                    () => {
                      balloonManager.show({
                        title: `Deleted branch: ${branch}`,
                        icon: "Info",
                        actions: (
                          <BalloonActionLink onPress={notImplemented}>
                            Restore
                          </BalloonActionLink>
                        ),
                      });
                    },
                    () => {
                      balloonManager.show({
                        title: `Could not deleted branch: ${branch}`,
                        icon: "Error",
                      });
                    }
                  );
                }
                return notImplemented();
            }
          }}
          onClose={onClose}
        >
          {newBranchAction && (
            <Item key={newBranchAction.id} textValue={newBranchAction.title}>
              <MenuItemLayout
                icon={newBranchAction.icon}
                content={newBranchAction.title}
              />
            </Item>
          )}
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
                      key={`${repoRoot}//${branchName}//compare-with-branch`}
                    >{`Compare with '${branchName}'`}</Item>
                  ),
                  <Item
                    key={`${repoRoot}//${branchName}//show-diff-with-working-tree`}
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
                    <Item key={`${repoRoot}//${branchName}//checkout`}>
                      Checkout
                    </Item>
                  ),
                  <Item
                    key={`${repoRoot}//${branchName}//new-branch-from`}
                  >{`New Branch from '${branchName}'...`}</Item>,
                  !isCurrent && (
                    <Item
                      key={`${repoRoot}//${branchName}//checkout-and-rebase-onto`}
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
                      key={`${repoRoot}//${branchName}//rebase-current-onto`}
                    >{`Rebase '${currentBranch}' onto '${branchName}'`}</Item>,
                    <Item
                      key={`${repoRoot}//${branchName}//merge-into-current`}
                    >{`Merge '${branchName}' onto '${currentBranch}'`}</Item>,
                    <Divider />,
                  ];

                return [
                  <Section title={getSectionLabel("Local Branches")}>
                    {localBranches.map(
                      ({ name, trackingBranch, isCurrent }) => {
                        return (
                          <Item
                            key={`${repoRoot}//${name}`}
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
                            <Item key={`${repoRoot}//${name}//pull`}>
                              Update
                            </Item>
                            <Item key={`${repoRoot}//${name}//push`}>
                              Push...
                            </Item>
                            <Divider />
                            <Item key={`${repoRoot}//${name}//rename`}>
                              Rename...
                            </Item>
                            {!isCurrent && (
                              <Item key={`${repoRoot}//${name}//delete`}>
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
                        key={`${repoRoot}//${branchName}`}
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
                          key={`${repoRoot}//${branchName}//pull-into-using-merge`}
                        >{`Pull into '${branchName}' Using Merge`}</Item>
                        <Item
                          key={`${repoRoot}//${branchName}//pull-into-using-rebase`}
                        >{`Pull into '${branchName}' Using Rebase`}</Item>
                        <Divider />
                        <Item key={`${repoRoot}//${branchName}//delete`}>
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
