import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Item, Link, List, ProgressBar, styled } from "@intellij-platform/core";
import { StyledPlaceholderContainer } from "../styled-components";
import { useResetFilters, vcsActiveTabKeyState } from "../vcs-logs.state";
import { useLatestRecoilValue } from "../../../recoil-utils";
import { CommitsTableRow } from "./CommitsTableRow";
import { GitRef } from "./GitRef";
import {
  allResolvedRefsState,
  commitsTableRowsState,
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

const StyledProgressBar = styled(ProgressBar)`
  position: absolute;
  width: 100%;
  z-index: 1;
`;
const StyledContainer = styled.div`
  position: relative;
  min-height: 0;
  flex: 1;
`;

const ResolvedRefsContext = React.createContext<Record<string, GitRef[]>>({});
export function CommitsTable() {
  const currentTabKey = useRecoilValue(vcsActiveTabKeyState);
  const resetFilters = useResetFilters();

  const [commitRows, commitRowsState] = useLatestRecoilValue(
    commitsTableRowsState
  );
  const [allResolvedRefs] = useLatestRecoilValue(allResolvedRefsState);
  const [selectedCommits, setSelectedCommits] =
    useRecoilState(selectedCommitsState);

  return (
    <ResolvedRefsContext.Provider value={allResolvedRefs ?? {}}>
      <StyledContainer>
        {commitRowsState === "loading" && (
          <StyledProgressBar aria-label="Loading commits" isIndeterminate />
        )}
        {commitRows && commitRows.length > 0 && (
          <List
            items={commitRows}
            fillAvailableSpace
            selectionMode="multiple"
            selectedKeys={selectedCommits}
            onSelectionChange={setSelectedCommits}
            estimatedItemHeight={24}
          >
            {({ commit, repoPath }) => (
              <Item key={commit.oid} textValue={commit.commit.message}>
                {/* Using context here due to rendering optimizations of collection API */}
                <ResolvedRefsContext.Consumer>
                  {(refs) => (
                    <CommitsTableRow
                      commit={commit}
                      repoRoot={repoPath}
                      refs={refs[commit.oid]}
                    />
                  )}
                </ResolvedRefsContext.Consumer>
              </Item>
            )}
          </List>
        )}
        {commitRowsState === "hasValue" &&
          commitRows &&
          commitRows.length === 0 && (
            <StyledPlaceholderContainer>
              No commits matching filters
              <Link onPress={() => resetFilters(currentTabKey)}>
                Reset filters
              </Link>
            </StyledPlaceholderContainer>
          )}
      </StyledContainer>
    </ResolvedRefsContext.Provider>
  );
}
