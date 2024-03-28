import { groupBy } from "ramda";
import React, { HTMLAttributes, useEffect, useState } from "react";
import {
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import {
  Divider,
  Item,
  MenuItemLayout,
  SpeedSearchMenu,
} from "@intellij-platform/core";

import { notImplemented } from "../../../Project/notImplemented";
import {
  allBranchesState,
  BranchType,
  useFavoriteBranches,
} from "../../Branches/branches.state";
import { BranchFavoriteButton } from "../../Branches/BranchFavoriteButton";
import { vcsLogFilter } from "../vcs-logs.state";
import { VcsFilterDropdown } from "./VcsLogDropdown";
import { useLatestRecoilValue } from "../../../recoil-utils";

export function BranchesFilterDropdown({ tabKey }: { tabKey: string }) {
  const [selectedBranches, setSelectedBranches] = useRecoilState(
    vcsLogFilter.branch(tabKey)
  );
  const resetBranches = useResetRecoilState(vcsLogFilter.branch(tabKey));

  return (
    <VcsFilterDropdown
      value={selectedBranches.length > 0 ? selectedBranches.join("|") : null}
      onClear={resetBranches}
      renderMenu={({ menuProps }) => (
        <BranchesFilterMenu
          menuProps={menuProps}
          onBranchesSelected={setSelectedBranches}
        />
      )}
      label="Branch"
    />
  );
}

const groupRepoRoots = (
  branches: Array<{ branchName: string; repoRoot: string }>
) =>
  Object.entries(groupBy(({ branchName }) => branchName, branches)).map(
    ([branchName, items]) => ({
      branchName,
      repoRoots: items.map((item) => item.repoRoot),
    })
  );
/**
 * Unique list of all local and remote branches of all repositories.
 * Each branch has a list of repos which indicates the list of repository roots the branch appears in.
 */
const repoGroupedAllBranchesState = selector({
  key: "vcs/allBranchesRepoConsolidated",
  get: ({ get }) => {
    const allBranches = get(allBranchesState);
    const allRemoteBranches = allBranches.flatMap(
      ({ remoteBranches, repoRoot }) =>
        remoteBranches.map((branch) => ({
          repoRoot,
          branchName: `${branch.remote}/${branch.name}`,
        }))
    );
    const allLocalBranches = allBranches.flatMap(
      ({ localBranches, repoRoot }) =>
        localBranches.map((branch) => ({
          repoRoot,
          branchName: branch.name,
        }))
    );
    return {
      localBranches: groupRepoRoots(allLocalBranches),
      remoteBranches: groupRepoRoots(allRemoteBranches),
    };
  },
});

type BranchMenuItem = {
  branchType: BranchType;
  branchName: string;
  repoRoots: string[];
};

function BranchesFilterMenu({
  menuProps,
  onBranchesSelected,
}: {
  onBranchesSelected: (branches: string[]) => void;
  menuProps: HTMLAttributes<HTMLElement>;
}) {
  const [favoriteBranches, setFavoriteBranches] = useState<BranchMenuItem[]>(
    []
  );
  const { toggleFavorite, isFavorite } = useFavoriteBranches();
  const [repoGroupedAllBranches] = useLatestRecoilValue(
    repoGroupedAllBranchesState
  );
  const { localBranches = [], remoteBranches = [] } =
    repoGroupedAllBranches || {};

  const remoteBranchesByRemote = groupBy(
    ({ branchName }) => branchName.split("/")[0],
    remoteBranches
  );

  // The list of favorite branches is calculated on render, and is intentionally not updated. This behavior is copied
  // from the reference implementation. Probably in order to not have items jump in and out of the menu, when branches
  // are marked/unmarked as favorite. One improvement (?) here is that isFavorite state is always correct, as opposed
  // to the reference implementation where (at least currently) the state of favorite icon is not kept up-to-date.
  useEffect(() => {
    const createLocalBranchItems = (
      branchType: BranchType,
      branches: Array<{ branchName: string; repoRoots: string[] }>
    ): BranchMenuItem[] => {
      return branches
        .filter(({ branchName, repoRoots }) =>
          repoRoots.some((repoRoot) =>
            isFavorite({ branchType, branchName, repoRoot })
          )
        )
        .map(({ branchName, repoRoots }) => ({
          branchType,
          branchName,
          repoRoots,
        }));
    };

    setFavoriteBranches(
      [
        {
          branchType: "LOCAL",
          branchName: "HEAD",
          repoRoots: [],
        } as BranchMenuItem,
      ]
        .concat(createLocalBranchItems("LOCAL", localBranches))
        .concat(createLocalBranchItems("REMOTE", remoteBranches))
    );
  }, []);

  const renderBranchItem = ({
    branchName,
    branchType,
    repoRoots,
  }: BranchMenuItem) => (
    <Item key={`branch:${branchName}`} textValue={branchName}>
      <MenuItemLayout
        content={branchName}
        icon={
          <BranchFavoriteButton
            isFavorite={
              branchName === "HEAD" ||
              repoRoots.some((repoRoot) =>
                isFavorite({
                  branchType,
                  repoRoot,
                  branchName,
                })
              )
            }
            onClick={() => {
              if (branchName !== "HEAD") {
                repoRoots.forEach((repoRoot) => {
                  toggleFavorite({
                    branchType,
                    repoRoot,
                    branchName,
                  });
                });
              }
            }}
          />
        }
      />
    </Item>
  );
  return (
    <SpeedSearchMenu
      {...menuProps}
      submenuBehavior="toggleOnPress"
      autoFocus="first"
      minWidth={250}
      onAction={(key) => {
        const [type, value] = `${key}`.split(":");
        if (type === "branch" && value) {
          onBranchesSelected([value]);
        } else if (type === "favorites") {
          onBranchesSelected(
            favoriteBranches.map(({ branchName }) => branchName)
            // we could have filtered the ones that are actually favorite at this point, but not doing so to follow
            // the original implementation, even though it's a little questionable.
          );
        } else if (type === "select") {
          notImplemented(); // TODO
        }
      }}
    >
      {[
        <Item key="select">Select...</Item>,
        <Item key="favorites">Favorites</Item>,
        ...favoriteBranches.map(renderBranchItem),
        <Divider />,
        <Item key="local" title="Local">
          {localBranches.map(({ branchName, repoRoots }) =>
            renderBranchItem({ branchType: "LOCAL", branchName, repoRoots })
          )}
        </Item>,
        ...Object.entries(remoteBranchesByRemote).map(([origin, branches]) => (
          <Item key={`remote:${origin}`} title={`${origin}/...`}>
            {branches.map(({ branchName, repoRoots }) =>
              renderBranchItem({ branchType: "REMOTE", branchName, repoRoots })
            )}
          </Item>
        )),
      ]}
    </SpeedSearchMenu>
  );
}
