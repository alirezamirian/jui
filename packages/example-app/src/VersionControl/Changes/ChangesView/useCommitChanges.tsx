import path from "path";
import { groupBy } from "ramda";
import { useAtomCallback } from "jotai/utils";
import { IntlMessageFormat } from "intl-messageformat";
import React, { useCallback } from "react";
import { useBalloonManager } from "@intellij-platform/core";

import { fs } from "../../../fs/fs";
import { commitFiles } from "../../git-operations/commitFiles";
import {
  useRefreshRepoStatuses,
  vcsFootForFileAtom,
} from "../../file-status.state";
import { useRunTask } from "../../../tasks";
import { commitTaskIdAtom } from "./ChangesView.state";
import { AnyChange, Change } from "../Change";
import { resolvedRefAtoms } from "../../refs.state";
import { repoCurrentBranchNameAtom } from "../../Branches/branches.state";
import { allCommitsAtom } from "../../VersionControlToolWindow/CommitsView/CommitsTable.state";

const commitSuccessfulMessage = new IntlMessageFormat(
  `{count, plural,
    =1 {1 file committed}
    other {# files committed}
  }`,
  "en-US"
);

/**
 * Returns a commit callback to be used to commit a bunch of changes.
 * Syncs all relevant state (like file status, and change lists) after commit.
 */
export function useCommitChanges() {
  const refreshFileStatus = useRefreshRepoStatuses();
  const balloonManager = useBalloonManager();
  const runTask = useRunTask();

  return useAtomCallback(
    useCallback(
      (get, set, changes: readonly AnyChange[], commitMessage: string) => {
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
                      const filePath = Change.path(change);
                      const repoRoot = await get(vcsFootForFileAtom(filePath));
                      const content = (await fs.promises.exists(filePath))
                        ? await fs.promises.readFile(filePath)
                        : null;
                      return repoRoot
                        ? {
                            repoRoot,
                            filePath: path.relative(repoRoot, filePath),
                            content,
                          }
                        : null;
                    })
                  )
                ).filter((i) => i != null)
              );
              await Promise.all(
                Object.entries(changesGroupedByRepo).map(
                  async ([repoRoot, files]) => {
                    const updates = files.reduce<{
                      [filePath: string]: Uint8Array | null;
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
                      updates,
                      message: commitMessage,
                      author: {
                        // FIXME
                        name: "Alireza",
                        email: "alireza.mirian@gmail.com",
                      },
                    });
                    const currentBranch = await get(
                      repoCurrentBranchNameAtom(repoRoot)
                    );
                    if (currentBranch) {
                      set(
                        resolvedRefAtoms({
                          repoRoot,
                          ref: currentBranch,
                        })
                      );
                    }
                    set(resolvedRefAtoms({ repoRoot, ref: "HEAD" }));
                  }
                )
              ).then(
                () => {
                  set(allCommitsAtom); // maybe a more efficient way to update only the newly added commit, when
                  // allCommitsState is refactored to allow that
                  refreshFileStatus().catch(console.error);

                  balloonManager.show({
                    icon: "Info",
                    body: (
                      <>
                        {`${commitSuccessfulMessage.format({
                          count: changes.length,
                        })}: `}
                        {commitMessage
                          .split("\n")
                          .flatMap((part, index) => [<br key={index} />, part])
                          .slice(1)}
                      </>
                    ),
                  });
                },
                (e) => {
                  balloonManager.show({
                    icon: "Error",
                    title: "Commit failed!",
                    body: "Could not commit files.",
                  });
                  console.error("Commit error", e);
                }
              );
            },
            onFinished: () => {
              set(commitTaskIdAtom, null);
            },
          }
        );
        set(commitTaskIdAtom, taskId);
      },
      []
    )
  );
}
