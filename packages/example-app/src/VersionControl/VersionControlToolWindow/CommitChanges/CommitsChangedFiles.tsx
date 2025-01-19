import React, { HTMLAttributes, useEffect } from "react";
import { atom, Atom, useAtom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";

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
import {
  changedFilesAtom,
  changedFilesWithoutRenamesAtom,
  commitChangesTreeRefAtom,
  expandedKeysAtom,
  selectionAtom,
} from "./CommitsChangedFiles.state";
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

const loadableChangedFilesAtom = [
  changedFilesAtom,
  changedFilesWithoutRenamesAtom,
].map(loadable);

const changedFilesLoadableAtom = atom((get) => {
  return get(
    loadableChangedFilesAtom.find((atom) => get(atom).state === "hasData") ??
      loadableChangedFilesAtom.slice(-1)[0]
  );
});

/**
 * TODO: handle multiple selected commits (check Changes.ShowChangesFromParents https://github.com/JetBrains/intellij-community/blob/ac57611a0612bd65ba2a19c841a4f95b40591134/platform/vcs-log/impl/src/com/intellij/vcs/log/ui/frame/VcsLogChangesBrowser.java#L255-L254)
 */
export function CommitChangedFiles({
  treeShortcutHandlerProps,
}: {
  treeShortcutHandlerProps: HTMLAttributes<HTMLElement>;
}) {
  const selectedCommits = useAtomValue(unwrapLatestOrNull(selectedCommitsAtom));
  const treeRef = useAtomValue(commitChangesTreeRefAtom);
  const nothingSelected = !selectedCommits?.length;

  const stateLoadable = useAtomValue(changedFilesLoadableAtom);
  const state = stateLoadable.state === "hasData" ? stateLoadable.data : null;
  const [expandedKeys, setExpandedKeys] = useAtom(expandedKeysAtom);
  const [selection, setSelection] = useAtom(selectionAtom);

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
