import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Item, Link, List, ProgressBar, styled } from "@intellij-platform/core";
import { StyledPlaceholderContainer } from "../styled-components";
import { useResetFilters, vcsActiveTabKeyState } from "../vcs-logs.state";
import { useLatestRecoilValue } from "../../../recoil-utils";
import { CommitsTableRow } from "./CommitsTableRow";
import { GitRef } from "../GitRef";
import {
  allResolvedRefsState,
  commitsSelectionState,
  commitsTableRowsState,
} from "./CommitsTable.state";
import { StyledListItem } from "@intellij-platform/core/List/StyledListItem";

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
  ${StyledListItem} {
    // the default "min-width: min-content", which is necessary for sizing overlays (e.g. Popup) containing list/tree,
    // results in horizontally scrollable table. Probably not an issue when a proper Table component is implemented.
    min-width: unset;
  }
`;

const ResolvedRefsContext = React.createContext<Record<string, GitRef[]>>({});
export function CommitsTable() {
  const currentTabKey = useRecoilValue(vcsActiveTabKeyState);
  const resetFilters = useResetFilters();

  const [result, commitRowsState] = useLatestRecoilValue(commitsTableRowsState);
  const rows = result?.rows;
  const [allResolvedRefs] = useLatestRecoilValue(allResolvedRefsState);
  const [selectedCommits, setSelectedCommits] = useRecoilState(
    commitsSelectionState
  );

  return (
    <ResolvedRefsContext.Provider value={allResolvedRefs ?? {}}>
      <StyledContainer>
        {commitRowsState === "loading" && (
          <StyledProgressBar aria-label="Loading commits" isIndeterminate />
        )}
        {rows && rows.length > 0 && (
          <List
            aria-label="Commits list"
            items={rows}
            fillAvailableSpace
            selectionMode="multiple"
            selectedKeys={selectedCommits}
            onSelectionChange={setSelectedCommits}
            estimatedItemHeight={24}
          >
            {({ readCommitResult, repoPath }) => (
              <Item
                key={readCommitResult.oid}
                textValue={readCommitResult.commit.message}
              >
                {/* Using context here due to rendering optimizations of collection API */}
                <ResolvedRefsContext.Consumer>
                  {(refs) => (
                    <CommitsTableRow
                      readCommitResult={readCommitResult}
                      repoRoot={repoPath}
                      refs={refs[readCommitResult.oid]}
                    />
                  )}
                </ResolvedRefsContext.Consumer>
              </Item>
            )}
          </List>
        )}
        {commitRowsState === "hasValue" && rows && rows.length === 0 && (
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
