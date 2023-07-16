import path from "path";
import React, { useState } from "react";
import {
  ActionButton,
  ActionToolbar,
  ActionTooltip,
  BalloonActionLink,
  Bounds,
  Divider,
  Item,
  ItemLayout,
  MenuItemLayout,
  PlatformIcon,
  Popup,
  PopupLayout,
  Section,
  SpeedSearchMenu,
  styled,
  TooltipTrigger,
  useAction,
  useBalloonManager,
  useWindowManager,
} from "@intellij-platform/core";

import { useLatestRecoilValue } from "../../recoil-utils";
import {
  allBranchesState,
  useCheckoutBranch,
  useDeleteBranch,
  useFavoriteBranches,
} from "./branches.state";
import { notImplemented } from "../../Project/notImplemented";
import { VcsActionIds } from "../VcsActionIds";
import { atom, useRecoilState } from "recoil";
import { RenameBranchWindow } from "./RenameBranchWindow";
import { Errors } from "isomorphic-git";
import { BranchFavoriteButton } from "./BranchFavoriteButton";

const StyledHeader = styled.div`
  box-sizing: border-box;
  padding: 0 0.375rem;
  display: flex;
  align-items: center;
  width: 100%;
`;
const StyledTitle = styled.div`
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0.625rem;
`;

export const branchesPopupSizeState = atom<
  | {
      width: number;
      height: number;
    }
  | undefined
>({
  key: "branchesPopup.bounds",
  default: undefined,
});

export function BranchesPopup({ onClose }: { onClose: () => void }) {
  const repoBranches = useLatestRecoilValue(allBranchesState);
  const [branchesPopupPersistedSize, setBranchesPopupPersistedSize] =
    useRecoilState(branchesPopupSizeState);
  const [branchesPopupBounds, setBranchesPopupBounds] = useState<
    Partial<Bounds>
  >(branchesPopupPersistedSize ?? {});

  const newBranchAction = useAction(VcsActionIds.GIT_CREATE_NEW_BRANCH);
  const deleteBranch = useDeleteBranch();
  const balloonManager = useBalloonManager();
  const windowManager = useWindowManager();
  const checkoutBranch = useCheckoutBranch();

  // useRefreshRecoilValueOnMount(allBranchesState);

  const { isFavorite, toggleFavorite } = useFavoriteBranches();

  if (!repoBranches) {
    return null;
  }
  const title =
    repoBranches.length === 1
      ? `Git Branches in ${path.basename(repoBranches[0].repoRoot)}`
      : "Git Branches";
  return (
    <Popup
      interactions="all"
      minHeight={55}
      minWidth={300}
      bounds={branchesPopupBounds}
      onBoundsChange={(bounds, interactionType) => {
        if (interactionType === "resize") {
          setBranchesPopupPersistedSize({
            width: bounds.width,
            height: bounds.height,
          });
        }
        setBranchesPopupBounds(bounds);
      }}
    >
      <PopupLayout
        header={
          <Popup.Header hasControls>
            <StyledHeader>
              <StyledTitle>{title}</StyledTitle>
              <ActionToolbar>
                <TooltipTrigger tooltip={<ActionTooltip actionName="Fetch" />}>
                  <ActionButton
                    onPress={() => {
                      notImplemented();
                      onClose();
                    }}
                  >
                    <PlatformIcon icon="vcs/fetch.svg" />
                  </ActionButton>
                </TooltipTrigger>
                <TooltipTrigger
                  tooltip={<ActionTooltip actionName="Restore Popup Size" />}
                >
                  <ActionButton
                    isDisabled={branchesPopupPersistedSize === undefined}
                    onPress={() => {
                      setBranchesPopupPersistedSize(undefined);
                      setBranchesPopupBounds(
                        ({ width, height, ...currentBounds }) => ({
                          ...currentBounds,
                        })
                      );
                    }}
                  >
                    <PlatformIcon icon="general/fitContent.svg" />
                  </ActionButton>
                </TooltipTrigger>
              </ActionToolbar>
            </StyledHeader>
          </Popup.Header>
        }
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
              const [repoRoot, branch, operation] = `${key}`.split("//");

              async function tryCheckout(checkout: () => Promise<unknown>) {
                try {
                  await checkout();
                  // TODO: show toolwindow balloon, when/if git toolwindow is added
                } catch (e) {
                  if (e instanceof Errors.CheckoutConflictError) {
                    // TODO: open Git Checkout Problem window.
                    balloonManager.show({
                      icon: "Error",
                      title: "Git Checkout Problem",
                      body: e.message,
                    });
                  } else {
                    balloonManager.show({
                      icon: "Error",
                      title: "Checkout failed",
                      body: `Could not checkout branch ${branch}`,
                    });
                  }
                }
              }

              function checkoutLocalBranch() {
                return tryCheckout(() => checkoutBranch(repoRoot, branch));
              }

              function checkoutRemoteBranch() {
                const remoteBranch = repoBranches
                  ?.find(({ repoRoot: aRepoRoot }) => aRepoRoot === repoRoot)
                  ?.remoteBranches.find(
                    ({ name, remote }) => `${remote}/${name}` === branch
                  );
                if (remoteBranch) {
                  return tryCheckout(() =>
                    checkoutBranch(
                      repoRoot,
                      remoteBranch.name,
                      remoteBranch.remote
                    )
                  );
                }
              }

              switch (key) {
                case newBranchAction?.id:
                  return newBranchAction?.perform();
                default:
                  switch (operation) {
                    case "delete":
                      return deleteBranch(repoRoot, branch).then(
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
                    case "rename":
                      return windowManager.open(({ close }) => (
                        <RenameBranchWindow
                          repoRoot={repoRoot}
                          branchName={branch}
                          close={close}
                        />
                      ));
                    case "checkout":
                      return checkoutLocalBranch();
                    case "remote-checkout":
                      return checkoutRemoteBranch();
                    default:
                      return notImplemented();
                  }
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
                ({
                  remoteBranches,
                  localBranches,
                  repoRoot,
                  currentBranch,
                }) => {
                  const getSectionLabel = (label: string, repoRoot: string) =>
                    repoBranches.length > 1
                      ? `${label} in ${path.basename(repoRoot)}`
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
                    <Divider key="compare-actions-divider" />,
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
                      <Divider key="merge-actions-divider" />,
                    ];

                  return [
                    <Section
                      key={`${repoRoot}//local_branches`}
                      title={getSectionLabel("Local Branches", repoRoot)}
                    >
                      {localBranches.map(({ name, trackingBranch }) => {
                        const isCurrent = name === currentBranch?.name;
                        const favoriteBranchArgs = {
                          branchName: name,
                          branchType: "local",
                          repoRoot,
                        } as const;
                        return (
                          <Item
                            key={`${repoRoot}//${name}`}
                            textValue={name}
                            title={
                              <MenuItemLayout
                                content={name}
                                icon={
                                  <BranchFavoriteButton
                                    isFavorite={isFavorite(favoriteBranchArgs)}
                                    isCurrent={isCurrent}
                                    onClick={() => {
                                      toggleFavorite(favoriteBranchArgs);
                                    }}
                                  />
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
                            {!isCurrent && (
                              <Item key={`${repoRoot}//${name}//checkout`}>
                                Checkout
                              </Item>
                            )}
                            <Item
                              key={`${repoRoot}//${name}//new-branch-from`}
                            >{`New Branch from '${name}'...`}</Item>
                            {!isCurrent && (
                              <Item
                                key={`${repoRoot}//${name}//checkout-and-rebase-onto`}
                              >{`Checkout and rebase onto '${name}'`}</Item>
                            )}
                            <Divider key="new-branch-actions-divider" />
                            {compareActions(name, isCurrent)}
                            {mergeActions(name, currentBranch?.name)}
                            <Item key={`${repoRoot}//${name}//pull`}>
                              Update
                            </Item>
                            <Item key={`${repoRoot}//${name}//push`}>
                              Push...
                            </Item>
                            <Divider key="push-divider" />
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
                      })}
                    </Section>,
                    <Section
                      key={`${repoRoot}//remote_branches`}
                      title={getSectionLabel("Remote Branches", repoRoot)}
                    >
                      {remoteBranches.map((branch) => {
                        const branchName = `${branch.remote}/${branch.name}`;
                        const favoriteBranchArgs = {
                          branchName,
                          branchType: "remote",
                          repoRoot,
                        } as const;
                        return (
                          <Item
                            key={`${repoRoot}//${branchName}`}
                            textValue={branchName}
                            title={
                              <MenuItemLayout
                                content={branchName}
                                icon={
                                  <BranchFavoriteButton
                                    isFavorite={isFavorite(favoriteBranchArgs)}
                                    onClick={() => {
                                      toggleFavorite(favoriteBranchArgs);
                                    }}
                                  />
                                }
                              />
                            }
                          >
                            <Item
                              key={`${repoRoot}//${branchName}//remote-checkout`}
                            >
                              Checkout
                            </Item>
                            <Item
                              key={`${repoRoot}//${branchName}//new-branch-from`}
                            >{`New Branch from '${branchName}'...`}</Item>
                            <Item
                              key={`${repoRoot}//${branchName}//checkout-and-rebase-onto`}
                            >{`Checkout and rebase onto '${branchName}'`}</Item>
                            <Divider key="new-branch-actions-divider" />
                            {compareActions(branchName, false)}
                            {mergeActions(branchName, currentBranch?.name)}
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
                        );
                      })}
                    </Section>,
                  ];
                }
              ) as any
            }
          </SpeedSearchMenu>
        }
      />
    </Popup>
  );
}
