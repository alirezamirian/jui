import React from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  IconButton,
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
import { amendCommitAtom, includedChangesAtom } from "./ChangesView.state";
import { focusCommitMessageAtom } from "./ChangesViewSplitter";

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
  const changes = useAtomValue(includedChangesAtom);
  return <ChangesSummary changes={changes} />;
};

/**
 * Amend checkbox, commit message history button, and summary of included changes, shown as a row
 * bellow changes tree, in commit tool window.
 */
export function CommitActionsRow() {
  const [amend, setAmend] = useAtom(amendCommitAtom);
  const focusCommitMessage = useSetAtom(focusCommitMessageAtom);

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
              onChange={(value) => {
                setAmend(value);
                // TODO: alternate commit message between the latest commit message and the last edited message.
                focusCommitMessage();
              }}
              preventFocus
              mnemonic="m"
            >
              Amend
            </StyledAmendCheckbox>
          </span>
        )}
      </TooltipTrigger>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Show Commit Options" />}
      >
        <IconButton onPress={notImplemented}>
          <PlatformIcon icon="general/gear.svg" />
        </IconButton>
      </TooltipTrigger>
      <TooltipTrigger
        tooltip={<ActionTooltip actionName="Commit Message History" />}
      >
        <IconButton isDisabled onPress={notImplemented}>
          <PlatformIcon icon="vcs/historyInline.svg" />
        </IconButton>
      </TooltipTrigger>
      <StyledChangesSummaryContainer>
        <ChangesViewChangesSummary />
      </StyledChangesSummaryContainer>
    </StyledActionsRow>
  );
}
