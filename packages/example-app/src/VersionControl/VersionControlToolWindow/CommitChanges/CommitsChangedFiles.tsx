import React, { HTMLAttributes, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  HelpTooltip,
  PlatformIcon,
  PositionedTooltipTrigger,
  SpeedSearchTree,
  styled,
} from "@intellij-platform/core";

import { LoadingGif } from "../../../LoadingGif";
import { Delayed } from "../../../Delayed";
import { StyledPlaceholderContainer } from "../styled-components";
import { selectedCommitsAtom } from "../CommitsView/CommitsTable.state";
import { gitLogCommitsChangesTreeState } from "./CommitsChangedFiles.state";
import { commitChangesTreeNodeRenderer } from "./commitChangesTreeNodeRenderer";

import { unwrapLatestOrNull } from "../../../atom-utils/unwrapLatest";

const StyledLoadingWrapper = styled.div`
  position: absolute;
  inset: 0;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/**
 * TODO: handle multiple selected commits (check Changes.ShowChangesFromParents https://github.com/JetBrains/intellij-community/blob/ac57611a0612bd65ba2a19c841a4f95b40591134/platform/vcs-log/impl/src/com/intellij/vcs/log/ui/frame/VcsLogChangesBrowser.java#L255-L254)
 */
export function CommitChangedFiles({
  treeShortcutHandlerProps,
}: {
  treeShortcutHandlerProps: HTMLAttributes<HTMLElement>;
}) {
  const selectedCommits = useAtomValue(unwrapLatestOrNull(selectedCommitsAtom));
  const treeRef = useAtomValue(gitLogCommitsChangesTreeState.treeRefAtom);
  const nothingSelected = !selectedCommits?.length;

  const stateLoadable = useAtomValue(
    gitLogCommitsChangesTreeState.changedFilesLoadableAtom
  );
  const state = stateLoadable.state === "hasData" ? stateLoadable.data : null;
  const [expandedKeys, setExpandedKeys] = useAtom(
    gitLogCommitsChangesTreeState.expandedKeysAtom
  );
  const [selection, setSelection] = useAtom(
    gitLogCommitsChangesTreeState.selectionAtom
  );

  useEffect(() => {
    // TODO: expanded keys are supposed to be set based on selected keys
    setExpandedKeys(state?.expandAllKeys ?? new Set());
    setSelection(new Set());
    // FIXME: with this being in an effect here, closing and reopening the toolwindow will
    //  reset the selection, making selection state be effectively like a local state.
  }, [stateLoadable.state]);

  if (nothingSelected) {
    return (
      <StyledPlaceholderContainer>
        Select commits to to view changes
      </StyledPlaceholderContainer>
    );
  }
  return (
    <div
      {...treeShortcutHandlerProps}
      style={{
        height: "-webkit-fill-available",
        position: "relative",
      }}
    >
      {stateLoadable.state === "loading" && (
        <StyledLoadingWrapper>
          <LoadingGif style={{ width: "1.5rem" }} />
          Loading...
        </StyledLoadingWrapper>
      )}
      {state && (
        <SpeedSearchTree
          aria-label="Commit changes"
          treeRef={treeRef}
          items={state.rootNodes}
          selectionMode="multiple"
          expandedKeys={expandedKeys}
          onExpandedChange={setExpandedKeys}
          selectedKeys={selection}
          onSelectionChange={setSelection}
          style={{ paddingBottom: "1rem" }}
          fillAvailableSpace
        >
          {commitChangesTreeNodeRenderer.itemRenderer({
            fileCountsMap: state.fileCountsMap,
          })}
        </SpeedSearchTree>
      )}
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
