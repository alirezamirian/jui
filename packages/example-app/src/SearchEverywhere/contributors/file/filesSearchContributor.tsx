import { SearchEverywhereContributor } from "../../SearchEverywhereContributor";
import {
  CommonActionId,
  minusculeMatch,
  TextRange,
} from "@intellij-platform/core";
import React from "react";
import { useRecoilCallback } from "recoil";
import {
  currentProjectFilesState,
  ProjectFsItem,
} from "../../../Project/project.state";
import { useEditorStateManager } from "../../../Editor/editor.state";
import { selectPathInProjectViewCallback } from "../../../ProjectView/ProjectView.state";
import { FileItem } from "./FileItem";

export const filesSearchContributor: SearchEverywhereContributor<{
  file: ProjectFsItem;
  matches: TextRange[] | null;
}> = {
  id: "Files",
  title: "Files",
  actionId: CommonActionId.GO_TO_FILE,
  use: () => {
    const getProjectFiles = useRecoilCallback(
      ({ snapshot }) =>
        () =>
          snapshot.getLoadable(currentProjectFilesState).getValue(),
      []
    );
    const { openPath } = useEditorStateManager();
    const selectPathInProjectView = useRecoilCallback(
      selectPathInProjectViewCallback,
      []
    );
    return {
      search: (query: string) =>
        getProjectFiles()
          .map((file) => ({
            matches: minusculeMatch(file.relativePath, query),
            file,
          }))
          .filter(({ matches }) => matches?.length),
      searchDeps: [],
      isEverywhere: true,
      processSelectedItem({ file }) {
        if (file?.type === "file") {
          openPath(file.path, true);
        }
        if (file?.type === "dir") {
          selectPathInProjectView(file.path);
        }
      },
      getKey({ file }) {
        return file.path;
      },
      renderItem({
        file,
        matches,
      }: {
        file: ProjectFsItem;
        matches: TextRange[] | null;
      }) {
        return <FileItem file={file} matches={matches} />;
      },
    };
  },
};
