import React, { HTMLAttributes, useEffect } from "react";
import {
  RecoilValue,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";

import {
  HelpTooltip,
  PlatformIcon,
  PositionedTooltipTrigger,
  SpeedSearchTree,
  styled,
} from "@intellij-platform/core";

import { useLatestRecoilValue } from "../../../recoil-utils";
import { LoadingGif } from "../../../LoadingGif";
import { Delayed } from "../../../Delayed";
import { StyledPlaceholderContainer } from "../styled-components";
import { selectedCommitsState } from "../CommitsView/CommitsTable.state";
import {
  changedFilesState,
  changedFilesWithoutRenamesState,
  commitChangesTreeRefState,
  expandedKeysState,
  selectionState,
} from "./CommitsChangedFiles.state";
import { commitChangesTreeNodeRenderer } from "./commitChangesTreeNodeRenderer";

const StyledLoadingWrapper = styled.div`
  position: absolute;
  inset: 0;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function useFastestValueLoadable<T>(states: RecoilValue<T>[]) {
  const loadables = states.map((state) => useRecoilValueLoadable(state));
  return (
    loadables.find(({ state }) => state === "hasValue") ||
    loadables.slice(-1)[0]
  );
}
/**
 * TODO: handle multiple selected commits (check Changes.ShowChangesFromParents https://github.com/JetBrains/intellij-community/blob/ac57611a0612bd65ba2a19c841a4f95b40591134/platform/vcs-log/impl/src/com/intellij/vcs/log/ui/frame/VcsLogChangesBrowser.java#L255-L254)
 */
export function CommitChangedFiles({
  treeShortcutHandlerProps,
}: {
  treeShortcutHandlerProps: HTMLAttributes<HTMLElement>;
}) {
  const [selectedCommits] = useLatestRecoilValue(selectedCommitsState);
  const treeRef = useRecoilValue(commitChangesTreeRefState);
  const nothingSelected = !selectedCommits?.length;

  const stateLoadable = useFastestValueLoadable([
    changedFilesState,
    changedFilesWithoutRenamesState,
  ]);
  const state = stateLoadable.valueMaybe();
  const [expandedKeys, setExpandedKeys] = useRecoilState(expandedKeysState);
  const [selection, setSelection] = useRecoilState(selectionState);

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
        <Delayed>
          <StyledLoadingWrapper>
            <LoadingGif style={{ width: "1.5rem" }} />
            Loading...
          </StyledLoadingWrapper>
        </Delayed>
      )}
      {state && (
        <SpeedSearchTree
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
