import { SearchEverywhereContributor } from "../../SearchEverywhereContributor";
import {
  CommonActionId,
  minusculeMatch,
  TextRange,
} from "@intellij-platform/core";
import React, { useEffect, useRef } from "react";
import { Atom, useAtomValue, useStore } from "jotai";
import {
  currentProjectFilesAtom,
  ProjectFsItem,
} from "../../../Project/project.state";
import { useEditorStateManager } from "../../../Editor/editor.state";
import { useSelectPathInProjectView } from "../../../ProjectView/ProjectView.state";
import { FileItem } from "./FileItem";
import { unwrapLatestOrNull } from "../../../atom-utils/unwrapLatest";

export const filesSearchContributor: SearchEverywhereContributor<{
  file: ProjectFsItem;
  matches: TextRange[] | null;
}> = {
  id: "Files",
  title: "Files",
  actionId: CommonActionId.GO_TO_FILE,
  use: () => {
    const projectFiles =
      useAtomValue(unwrapLatestOrNull(currentProjectFilesAtom)) ?? [];
    const { openPath } = useEditorStateManager();
    const selectPathInProjectView = useSelectPathInProjectView();
    return {
      search: (query: string) =>
        projectFiles
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
      getItemText({ file: { relativePath } }: { file: ProjectFsItem }): string {
        return relativePath;
      },
    };
  },
};
