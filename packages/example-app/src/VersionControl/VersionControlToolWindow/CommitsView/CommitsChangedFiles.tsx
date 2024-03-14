import React, { HTMLAttributes, useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

import {
  HelpTooltip,
  PlatformIcon,
  PositionedTooltipTrigger,
  SpeedSearchTree,
} from "@intellij-platform/core";
import { StyledPlaceholderContainer } from "../styled-components";
import {
  changedFilesState,
  commitChangesTreeRefState,
  expandedKeysState,
  selectionState,
} from "./CommitsChangedFiles.state";
import { selectedCommitsState } from "./CommitsTable.state";
import { commitChangesTreeNodeRenderer } from "./commitChangesTreeNodeRenderer";

/**
 * TODO: handle multiple selected commits (check Changes.ShowChangesFromParents https://github.com/JetBrains/intellij-community/blob/ac57611a0612bd65ba2a19c841a4f95b40591134/platform/vcs-log/impl/src/com/intellij/vcs/log/ui/frame/VcsLogChangesBrowser.java#L255-L254)
 */
export function CommitChangedFiles({
  treeShortcutHandlerProps,
}: {
  treeShortcutHandlerProps: HTMLAttributes<HTMLElement>;
}) {
  const selectedCommits = useRecoilValue(selectedCommitsState);
  const treeRef = useRecoilValue(commitChangesTreeRefState);
  const nothingSelected = !selectedCommits.length;
  const state = useRecoilValueLoadable(changedFilesState).valueMaybe();
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const [selection, setSelection] = useRecoilState(selectionState);

  useEffect(() => {
    // TODO: expanded keys are supposed to be set based on selected keys
    setExpandedKeys(state?.expandAllKeys ?? new Set());
    setSelection(new Set());
    // FIXME: with this being in an effect here, closing and reopening the toolwindow will
    //  reset the selection, making selection state be effectively like a local state.
  }, [state]);

  if (nothingSelected) {
    return (
      <StyledPlaceholderContainer>
        Select commits to to view changes
      </StyledPlaceholderContainer>
    );
  }
  if (!state) {
    return null; // TODO: show loading spinner
  }
  const { fileCountsMap, rootNodes } = state;
  return (
    <div
      {...treeShortcutHandlerProps}
      style={{
        height: "-webkit-fill-available",
        marginBottom: "1rem",
        position: "relative",
      }}
    >
      <SpeedSearchTree
        treeRef={treeRef}
        items={rootNodes}
        selectionMode="multiple"
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        selectedKeys={selection}
        onSelectionChange={setSelection}
        fillAvailableSpace
      >
        {commitChangesTreeNodeRenderer.itemRenderer({ fileCountsMap })}
      </SpeedSearchTree>
      {selectedCommits.length > 1 && (
        <PositionedTooltipTrigger
          placement="top"
          tooltip={
            <HelpTooltip
              helpText={
                <>
                  Showing diff for more than one commit is not currently
                  supported. Only the first selected commit is taken into
                  account.
                </>
              }
            ></HelpTooltip>
          }
        >
          {(props) => (
            <span
              {...props}
              style={{
                position: "absolute",
                right: "0.5rem",
                bottom: "0.5rem",
              }}
            >
              <PlatformIcon icon="general/warning" />
            </span>
          )}
        </PositionedTooltipTrigger>
      )}
    </div>
  );
}
