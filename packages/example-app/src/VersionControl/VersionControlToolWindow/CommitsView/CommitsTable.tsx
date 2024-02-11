import React from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Item, Link, List, ProgressBar } from "@intellij-platform/core";
import { StyledPlaceholderContainer } from "../styled-components";
import { useResetFilters, vcsActiveTabKeyState } from "../vcs-logs.state";
import { CommitsTableRow } from "./CommitsTableRow";
import { GitRef } from "./GitRef";
import {
  allCommitsState,
  allResolvedRefsState,
  selectedCommitsState,
} from "./CommitsTable.state";

// const StyledList = styled(List)`
//   display: grid;
//   grid-template-columns: repeat(3, auto); /* Define 3 columns */
//
//   ${StyledListItem} {
//     display: contents;
//   }
// ` as typeof List;

const ResolvedRefsContext = React.createContext<Record<string, GitRef[]>>({});
export function CommitsTable() {
  const currentTabKey = useRecoilValue(vcsActiveTabKeyState);
  const resetFilters = useResetFilters();

  const allCommitsLoadable = useRecoilValueLoadable(allCommitsState);
  const allCommits = allCommitsLoadable.valueMaybe() ?? [];
  const allResolvedRefsLoadable = useRecoilValueLoadable(allResolvedRefsState);
  const allResolvedRefs = allResolvedRefsLoadable.valueMaybe() ?? {};
  const [selectedCommits, setSelectedCommits] =
    useRecoilState(selectedCommitsState);
  console.log("all commits", allCommits, "allResolvedRefs", allResolvedRefs);

  return (
    <ResolvedRefsContext.Provider value={allResolvedRefs}>
      {allCommitsLoadable.state === "loading" && (
        <ProgressBar isIndeterminate />
      )}
      {allCommits.length > 0 && (
        <List
          items={allCommits}
          fillAvailableSpace
          selectionMode="multiple"
          selectedKeys={selectedCommits}
          onSelectionChange={setSelectedCommits}
        >
          {({ commit, repoRoot }) => (
            <Item key={commit.oid} textValue={commit.commit.message}>
              {/* Using context here due to rendering optimizations of collection API */}
              <ResolvedRefsContext.Consumer>
                {(refs) => (
                  <CommitsTableRow
                    commit={commit}
                    repoRoot={repoRoot}
                    refs={refs[commit.oid]}
                  />
                )}
              </ResolvedRefsContext.Consumer>
            </Item>
          )}
        </List>
      )}
      {allCommitsLoadable.state === "hasValue" && allCommits.length === 0 && (
        <StyledPlaceholderContainer>
          No commits matching filters
          <Link onPress={() => resetFilters(currentTabKey)}>Reset filters</Link>
        </StyledPlaceholderContainer>
      )}
    </ResolvedRefsContext.Provider>
  );
}
