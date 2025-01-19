import React from "react";
import { useAtom, useAtomValue } from "jotai";
import { Item, Link, List, ProgressBar, styled } from "@intellij-platform/core";
import { StyledListItem } from "@intellij-platform/core/List/StyledListItem";
import { unwrapLatestOrNull } from "../../../atom-utils/unwrapLatest";
import { StyledPlaceholderContainer } from "../styled-components";
import { useResetFilters, vcsActiveTabKeyAtom } from "../vcs-logs.state";
import { GitRef } from "../GitRef";
import { CommitsTableRow } from "./CommitsTableRow";
import {
  allResolvedRefsAtom,
  commitsSelectionAtom,
  commitsTableRowsAtom,
} from "./CommitsTable.state";
import { unwrapLatestWithLoading } from "../../../atom-utils/unwrapLatestWithLoading";

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
  const currentTabKey = useAtomValue(vcsActiveTabKeyAtom);
  const resetFilters = useResetFilters();

  const { value: result, isLoading } = useAtomValue(
    unwrapLatestWithLoading(commitsTableRowsAtom, null)
  );

  const rows = result?.rows;
  const allResolvedRefs = useAtomValue(unwrapLatestOrNull(allResolvedRefsAtom));
  const [selectedCommits, setSelectedCommits] = useAtom(commitsSelectionAtom);

  return (
    <ResolvedRefsContext.Provider value={allResolvedRefs ?? {}}>
      <StyledContainer>
        {isLoading && (
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
        {rows && rows.length === 0 && (
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
