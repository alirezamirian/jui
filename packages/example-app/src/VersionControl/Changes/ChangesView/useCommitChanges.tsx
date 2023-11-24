import path from "path";
import { groupBy } from "ramda";
import { useRecoilCallback } from "recoil";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { fs } from "../../../fs/fs";
import { commitFiles } from "../../commit-utils";
import {
  useUpdateVcsFileStatuses,
  vcsRootForFile,
} from "../../file-status.state";
import { Change, useRefreshChanges } from "../change-lists.state";
import { useRunTask } from "../../../tasks";
import { commitTaskIdState } from "./ChangesView.state";

/**
 * Returns a commit callback to be used to commit a bunch of changes.
 * Syncs all relevant state (like file status, and change lists) after commit.
 */
export function useCommitChanges() {
  const refreshChanges = useRefreshChanges();
  const refreshFileStatus = useUpdateVcsFileStatuses();
  const runTask = useRunTask();

  return useRecoilCallback(
    ({ snapshot, set }) =>
      (changes: readonly Change[], commitMessage: string) => {
        const taskId = runTask(
          { title: "Committing...", isCancelable: false },
          {
            run: async ({ setIndeterminate }) => {
              setIndeterminate(true);
              const changesGroupedByRepo = groupBy(
                ({ repoRoot }) => repoRoot,
                (
                  await Promise.all(
                    changes.map(async (change) => {
                      const filePath = change.after.path;
                      const repoRoot = snapshot
                        .getLoadable(vcsRootForFile(filePath))
                        .getValue();
                      const content = await fs.promises.readFile(filePath);
                      return repoRoot
                        ? {
                            repoRoot,
                            filePath: path.relative(repoRoot, filePath),
                            content,
                          }
                        : null;
                    })
                  )
                ).filter(notNull)
              );
              await Promise.all(
                Object.entries(changesGroupedByRepo).map(
                  async ([repoRoot, files]) => {
                    const updates = files.reduce<{
                      [filePath: string]: Uint8Array;
                    }>(
                      (soFar, { filePath, content }) => ({
                        ...soFar,
                        [filePath]:
                          typeof content === "string"
                            ? new TextEncoder().encode(content)
                            : content,
                      }),
                      {}
                    );
                    await commitFiles({
                      fs,
                      dir: repoRoot,
                      files: updates,
                      message: commitMessage,
                      author: {
                        // FIXME
                        name: "Alireza",
                        email: "alireza.mirian@gmail.com",
                      },
                    });
                  }
                )
              );
            },
            onFinished: () => {
              set(commitTaskIdState, null);
              // TODO: file status state and changes state separately use statusMatrix. It can be refactored for
              //  changes to be based on file status state.
              refreshChanges().catch(console.error);
              refreshFileStatus().catch(console.error);
            },
          }
        );
        set(commitTaskIdState, taskId);
      },
    [refreshChanges]
  );
}
