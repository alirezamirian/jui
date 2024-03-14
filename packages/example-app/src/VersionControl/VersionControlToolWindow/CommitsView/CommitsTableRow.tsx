import React, { CSSProperties, RefObject, useMemo } from "react";
import { css, styled, Tooltip, TooltipTrigger } from "@intellij-platform/core";
import { ReadCommitResult } from "isomorphic-git";

import { GitRef } from "../GitRef";
import { RefLabel, RefIcon } from "../RefLabel";
import { useRecoilValue } from "recoil";
import {
  authorColumn,
  dateColumn,
  hashColumn,
  vcsTableColumnsVisibilityState,
  vcsTableHighlightMyCommitsState,
  vcsTableReferencesOnTheLeftState,
  vcsTableShowCommitTimestampState,
} from "./CommitsTable.state";
import {
  areSamePerson,
  gitRepoUserState,
  GitUser,
} from "../../git-users.state";
import {
  CURRENT_USER_FILTER_VALUE,
  vcsLogFilterCurrentTab,
} from "../vcs-logs.state";
import {
  formatCommitDateTime,
  parseCommitMessage,
  shortenOid,
} from "../commit-utils";

const StyledCommitRow = styled.div`
  display: flex;
  height: 1.5rem;
  align-items: center;
  width: 100%;
  --column-width-1: 130px;
  --column-width-2: 130px;
  --column-width-3: 70px;
`;
const StyledCommitCell = styled.div`
  overflow: hidden;
  padding-left: 0.25rem;
`;

const StyledRefsContainer = styled.div<{ asOverlay?: boolean }>`
  ${({ asOverlay }) =>
    !asOverlay
      ? css`
          position: absolute;
          right: 0;
          top: 1px;
          max-width: calc(100% - 100px);
        `
      : css`
          flex-shrink: 0;
        `};

  display: flex;
  gap: 0.25rem;
  overflow: hidden;
  background: ${({ theme }) =>
    theme.currentBackgroundAware(theme.color("List.background"))};
`;
const StyledMessageContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.25rem;
`;

const StyledRefTooltipRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.25rem;
  font-size: 0.75rem;
`;
const useCurrentUserHighlightStyle = ({
  repoRoot,
  author,
}: {
  repoRoot: string;
  author: GitUser;
}): CSSProperties => {
  const currentUser = useRecoilValue(gitRepoUserState(repoRoot));
  const shouldHighlightCurrentUserCommits = useRecoilValue(
    vcsTableHighlightMyCommitsState
  );
  // for now assuming only a single table can be visible, and that's current tab's.
  const userFilter = useRecoilValue(vcsLogFilterCurrentTab.user);
  // single user case is not considered a special case, like it is in the original impl
  const shouldHighlight =
    shouldHighlightCurrentUserCommits &&
    userFilter !== CURRENT_USER_FILTER_VALUE &&
    areSamePerson(currentUser, author);

  return { fontWeight: shouldHighlight ? "bold" : undefined };
};

export function CommitsTableRow({
  refs,
  readCommitResult: {
    oid,
    commit: { author, committer, message },
  },
  repoRoot,
}: {
  repoRoot: string;
  readCommitResult: ReadCommitResult;
  refs: GitRef[] | undefined;
}) {
  const showCommitTimestamp = useRecoilValue(vcsTableShowCommitTimestampState);
  const referencesOnTheLeft = useRecoilValue(vcsTableReferencesOnTheLeftState);
  const isAuthorVisible = useRecoilValue(
    vcsTableColumnsVisibilityState(authorColumn.id)
  );
  const isDateVisible = useRecoilValue(
    vcsTableColumnsVisibilityState(dateColumn.id)
  );
  const isHashVisible = useRecoilValue(
    vcsTableColumnsVisibilityState(hashColumn.id)
  );

  const highlightStyles = useCurrentUserHighlightStyle({ author, repoRoot });
  return (
    <StyledCommitRow>
      <StyledCommitCell style={{ flexBasis: "0%", flexGrow: 1, flexShrink: 1 }}>
        <StyledMessageContainer>
          {refs && <CommitRefs onLeft={referencesOnTheLeft} refs={refs} />}
          <span style={highlightStyles}>
            {parseCommitMessage(message).subject}
          </span>
        </StyledMessageContainer>
      </StyledCommitCell>
      {isAuthorVisible && (
        <StyledCommitCell
          style={{
            flexBasis: "auto",
            width: "var(--column-width-1)",
            flexShrink: 1,
            ...highlightStyles,
          }}
        >
          {author.name}
          {committer.name !== author.name && "*"}
        </StyledCommitCell>
      )}
      {isDateVisible && (
        <StyledCommitCell
          style={{
            flexBasis: "auto",
            width: "var(--column-width-2)",
            flexShrink: 1,
            ...highlightStyles,
          }}
        >
          {formatCommitDateTime(
            (showCommitTimestamp ? committer : author).timestamp * 1000
          )}
        </StyledCommitCell>
      )}
      {isHashVisible && (
        <StyledCommitCell
          style={{
            flexBasis: "auto",
            width: "var(--column-width-3)",
            flexShrink: 1,
            ...highlightStyles,
          }}
        >
          {shortenOid(oid)}
        </StyledCommitCell>
      )}
    </StyledCommitRow>
  );
}

function refKey(ref: GitRef) {
  return `${ref.type}${ref.name}`;
}

function CommitRefs({ refs, onLeft }: { refs: GitRef[]; onLeft?: boolean }) {
  const { filteredRefs } = useMemo(() => {
    const headIsOnABranch = refs.some(
      (ref) => ref.type === "localBranch" && ref.isCurrent
    );
    return {
      filteredRefs: refs.filter(
        (ref) =>
          !(
            (ref.type === "head" && headIsOnABranch) ||
            (ref.type === "remoteBranch" &&
              refs.find(
                (aBranch) =>
                  aBranch.type === "localBranch" &&
                  aBranch.trackingBranch === ref.name
              ))
          )
      ),
    };
  }, [refs]);

  return (
    <TooltipTrigger
      placement="bottom"
      delay={800}
      isDisabled={refs.length < 2}
      tooltip={
        <Tooltip withPointer>
          {refs.map((ref) => (
            <StyledRefTooltipRow key={refKey(ref)}>
              <RefIcon type={ref.type} />
              {ref.name}
            </StyledRefTooltipRow>
          ))}
        </Tooltip>
      }
    >
      {({ ref, ...tooltipTriggerProps }) => (
        <StyledRefsContainer
          ref={ref as RefObject<HTMLDivElement>}
          asOverlay={onLeft}
          {...tooltipTriggerProps}
        >
          {filteredRefs
            .filter(
              (ref) =>
                ref.type !== "remoteBranch" ||
                !refs.find(
                  (aBranch) =>
                    aBranch.type === "localBranch" &&
                    aBranch.trackingBranch === ref.name
                )
            )
            .map((ref) => {
              let name = ref.name;
              const types: GitRef["type"][] = [ref.type];
              if (ref.type === "localBranch" && ref.trackingBranch) {
                types.unshift("remoteBranch");
                name = `${ref.trackingBranch.split("/")[0]} & ${ref.name}`;
              }
              if (ref.type === "localBranch" && ref.isCurrent) {
                types.push("head");
              }
              return (
                <RefLabel key={refKey(ref)} types={types}>
                  {name}
                </RefLabel>
              );
            })}
        </StyledRefsContainer>
      )}
    </TooltipTrigger>
  );
}
