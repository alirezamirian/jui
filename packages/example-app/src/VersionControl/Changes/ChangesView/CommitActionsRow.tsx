import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ActionButton,
  ActionHelpTooltip,
  ActionTooltip,
  Checkbox,
  PlatformIcon,
  styled,
  TooltipTrigger,
  UnknownThemeProp,
} from "@intellij-platform/core";

import { ChangesSummary } from "../ChangesSummary";
import { notImplemented } from "../../../Project/notImplemented";
import { amendCommitState, includedChangesState } from "./ChangesView.state";

const StyledActionsRow = styled.div`
  display: flex;
  padding: 0.125rem;
  position: relative;
`;
const StyledAmendCheckbox = styled(Checkbox)`
  padding-right: 0.625rem;
`;
const StyledChangesSummaryContainer = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.25rem;
  background: ${({ theme }) =>
    theme.color("Panel.background" as UnknownThemeProp<"Panel.background">)};
  z-index: 1;
`;
const ChangesViewChangesSummary = () => {
  const changes = useRecoilValue(includedChangesState);
  return <ChangesSummary changes={changes} />;
};

/**
 * Amend checkbox, commit message history button, and summary of included changes, shown as a row
 * bellow changes tree, in commit tool window.
 */
export function CommitActionsRow() {
  const [amend, setAmend] = useRecoilState(amendCommitState);

  return (
    <StyledActionsRow>
      <TooltipTrigger
        tooltip={
          <ActionHelpTooltip
            actionName="Amend Commit"
            helpText="Modify the latest commit of the current branch"
          />
        }
      >
        {(props) => (
          <span {...props}>
            <StyledAmendCheckbox
              isSelected={amend}
              onChange={setAmend}
              preventFocus
            >
              Amend
            </StyledAmendCheckbox>
          </span>
        )}
      </TooltipTrigger>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Show Commit Options" />}
      >
        <ActionButton onPress={notImplemented}>
          <PlatformIcon icon="general/gear.svg" />
        </ActionButton>
      </TooltipTrigger>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Commit Message History" />}
      >
        <ActionButton isDisabled onPress={notImplemented}>
          <PlatformIcon icon="vcs/historyInline.svg" />
        </ActionButton>
      </TooltipTrigger>
      <StyledChangesSummaryContainer>
        <ChangesViewChangesSummary />
      </StyledChangesSummaryContainer>
    </StyledActionsRow>
  );
}
