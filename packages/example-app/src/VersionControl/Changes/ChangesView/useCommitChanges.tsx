import path from "path";
import { groupBy } from "ramda";
import { useRecoilCallback } from "recoil";
import { IntlMessageFormat } from "intl-messageformat";
import React from "react";
import { useBalloonManager } from "@intellij-platform/core";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { fs } from "../../../fs/fs";
import { commitFiles } from "../../commit-utils";
import {
  useRefreshRepoStatuses,
  vcsRootForFile,
} from "../../file-status.state";
import { useRunTask } from "../../../tasks";
import { commitTaskIdState } from "./ChangesView.state";
import { Change } from "../Change";

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
                      const filePath = Change.path(change);
                      const repoRoot = snapshot
                        .getLoadable(vcsRootForFile(filePath))
                        .getValue();
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
                ).filter(notNull)
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
                  }
                )
              ).then(
                () => {
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
              set(commitTaskIdState, null);
            },
          }
        );
        set(commitTaskIdState, taskId);
      },
    []
  );
}
