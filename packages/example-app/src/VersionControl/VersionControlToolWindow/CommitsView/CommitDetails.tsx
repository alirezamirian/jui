import { useRecoilValue } from "recoil";
import {
  allResolvedRefsState,
  selectedCommitState,
} from "./CommitsTable.state";
import { StyledPlaceholderContainer } from "../styled-components";
import React, { ReactNode } from "react";
import { Link, styled, Tooltip, TooltipTrigger } from "@intellij-platform/core";
import {
  formatCommitDate,
  formatCommitTime,
  parseCommitMessage,
  shortenOid,
} from "../commit-utils";
import { RepoColorIcon } from "../../Changes/StyledRepoColorSquare";
import { vcsRootsState } from "../../file-status.state";
import { useLatestRecoilValue } from "../../../recoil-utils";
import { RefIconGroup } from "./RefLabel";
import { groupBy } from "ramda";
import { GitRef } from "./GitRef";

const StyledContainer = styled.div`
  padding: 0.875rem;
  cursor: default;
`;
const StyledCommitMessage = styled.div`
  font-family: "JetBrains Mono", monospace;
  line-height: 1.125rem;
  margin-bottom: 1.25rem;
  margin-right: 1.1875rem;
`;

const StyledCommitMessageHeader = styled.div`
  font-weight: bold;
`;
const StyledCommitterInfo = styled.div`
  color: ${({ theme }) => theme.commonColors.label({ disabled: true })};
`;

const StyledCommitInfoRow = styled.div`
  line-height: 1.2;
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;
const StyledRepoColorIcon = styled(RepoColorIcon)`
  align-self: start;
`;

const StyledRefsContainer = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

export function CommitDetails() {
  const [firstSelectedCommit] = useLatestRecoilValue(selectedCommitState);
  const [allResolvedRefs] = useLatestRecoilValue(allResolvedRefsState);
  const isMultiRepo = useRecoilValue(vcsRootsState).length > 0;
  if (!firstSelectedCommit) {
    return (
      <StyledPlaceholderContainer>
        No commits selected
      </StyledPlaceholderContainer>
    );
  }

  const {
    readCommitResult: { commit, oid },
    containingRefs,
    repoPath,
  } = firstSelectedCommit;
  const { subject, body } = parseCommitMessage(commit.message);
  const committerInfo: ReactNode[] = [];
  if (commit.committer.name !== commit.author.name) {
    committerInfo.push(
      <React.Fragment key={commit.committer.email}>
        by {commit.committer.name} <EmailLink email={commit.committer.email} />
      </React.Fragment>
    );
  }
  if (commit.committer.timestamp !== commit.author.timestamp) {
    committerInfo.push(formatDateAndTime(commit.committer.timestamp * 1000));
  }
  const refs = allResolvedRefs?.[oid] || [];
  const refsByType = groupBy((ref) => ref.type, refs);
  return (
    <StyledContainer>
      <StyledCommitMessage>
        <StyledCommitMessageHeader>{subject}</StyledCommitMessageHeader>
        {body}
      </StyledCommitMessage>
      <StyledCommitInfoRow>
        {isMultiRepo && (
          <TooltipTrigger tooltip={<Tooltip>{repoPath}</Tooltip>}>
            {(props) => <StyledRepoColorIcon {...props} rootPath={repoPath} />}
          </TooltipTrigger>
        )}
        <div>
          {`${shortenOid(oid)} ${commit.author.name} `}
          <EmailLink email={commit.author.email} />{" "}
          {`${formatDateAndTime(new Date(commit.author.timestamp * 1000))}`}
          {committerInfo.length > 0 && (
            <StyledCommitterInfo>committed {committerInfo}</StyledCommitterInfo>
          )}
        </div>
      </StyledCommitInfoRow>
      {refs.length > 0 && (
        <StyledRefsContainer>
          <RefGroup refs={refsByType.head} />
          <RefGroup refs={refsByType.localBranch} />
          <RefGroup refs={refsByType.remoteBranch} />
          <RefGroup refs={refsByType.tag} />
        </StyledRefsContainer>
      )}
      <div>
        {/*TODO: collapsing and "Show more"*/}
        In {containingRefs.size} branches: {[...containingRefs].join(", ")}
      </div>
    </StyledContainer>
  );
}

const StyledRefWithIcon = styled.span`
  display: inline-flex;
  align-items: center;
`;
function RefGroup({ refs }: { refs: undefined | GitRef[] }) {
  return refs?.length ? (
    <>
      {refs.map((ref, index) => {
        const name = `${ref.name}${index === refs.length - 1 ? "" : ","}`;
        return index === 0 ? (
          <StyledRefWithIcon>
            <RefIconGroup types={refs.map(({ type }) => type).slice(0, 2)} />
            {name}
          </StyledRefWithIcon>
        ) : (
          // span is needed for the right flex-wrap behavior
          <span>{name}</span>
        );
      })}
    </>
  ) : null;
}

function EmailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} style={{ all: "unset" }}>
      <Link>{`<${email}>`}</Link>
    </a>
  );
}

function formatDateAndTime(date: Date | number) {
  return `on ${formatCommitDate(date)} at ${formatCommitTime(date)}`;
}
