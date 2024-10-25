import React, { useEffect, useState } from "react";
import path from "path";
import git, { clone, GitProgressEvent } from "isomorphic-git";
import http from "isomorphic-git/http/web";
import { defaultProject, autoClonedRepo } from "./Project/project.state";
import { fs } from "./fs/fs";
import { ensureDir } from "./fs/fs-utils";
import {
  AlertDialog,
  Button,
  Popup,
  ProgressBar,
  styled,
} from "@intellij-platform/core";
import { StyledPopupContainer } from "@intellij-platform/core/Popup/StyledPopupContainer";

const defaultWorkspaceFiles = {
  ".idea/vcs.xml": `<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="GitRememberedInputs">
    <option name="visitedUrls">
      <list>
        <UrlAndUserName>
          <option name="url" value="https://github.com/alirezamirian/jui.git"></option>
          <option name="userName" value=""></option>
        </UrlAndUserName>
        <UrlAndUserName>
          <option name="url" value="https://github.com/thurwitz/example-branches.git"></option>
          <option name="userName" value=""></option>
        </UrlAndUserName>
      </list>
    </option>
    <option name="cloneParentDir" value="/workspace"></option>
  </component>
  <component name="VcsDirectoryMappings"></component>
</project>

`,
};

export async function isSuccessfullyCloned(dir: string) {
  try {
    const stats = await fs.promises.stat(dir);
    if (!stats.isDirectory()) {
      console.info(
        `Already cloned repo was not found. "${dir}" is not a directory.`
      );
      return false;
    }
    const files = await fs.promises.readdir(dir);
    if (files.length === 1 && files[0] === ".git") {
      console.info(
        `Already cloned repo was not found at "${dir}". ".git" folder exists, but it's not successfully unpacked.`
      );
      return false;
    }
  } catch (e) {
    console.info(`Already cloned repo was not found at "${dir}".`);
    return false;
  }
  return true;
}

const defaultInitializer = async () => {
  await ensureDir(fs.promises, defaultProject.path);
  await Promise.all(
    Object.entries(defaultWorkspaceFiles).map(async ([filename, content]) => {
      const fullPath = path.join(defaultProject.path, filename);
      if (await fs.promises.exists(fullPath)) {
        return;
      }
      await ensureDir(fs.promises, path.dirname(fullPath));
      await fs.promises.writeFile(fullPath, content, "utf-8");
    })
  );
};

/**
 * Used instead of Popup to have it not be fixed positioned, since this popup
 * is auto rendered in website's homepage, and example-app is rendered inline
 * there.
 */
const InlinePopup = styled(StyledPopupContainer)<{ minWidth?: number }>`
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : "")};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ProjectInitializer = ({
  children,
  autoCloneSampleRepo = false,
}: {
  autoCloneSampleRepo?: boolean;
  children?: React.ReactNode;
}) => {
  const [cloneProgress, setCloneProgress] = useState<GitProgressEvent | null>(
    null
  );

  const [state, setState] = useState<
    "error" | "cloning" | "uninitialized" | "initialized"
  >("uninitialized");
  useEffect(() => {
    async function ensureSampleRepo(dir: string, repoUrl: string) {
      if (!(await isSuccessfullyCloned(dir))) {
        setState("cloning");
        await cloneRepo({ dir, url: repoUrl, onProgress: setCloneProgress });
      }
    }
    // noinspection JSIgnoredPromiseFromCall: error handling done in the function
    init();
    async function init() {
      const initializer =
        (window as any).INITIALIZE_APP ?? // Giving a chance for external fs initialization. Used in e2e tests
        defaultInitializer;
      try {
        await initializer({
          fs,
          git,
          path,
          projectDir: defaultProject.path,
        });
        if (autoCloneSampleRepo) {
          await ensureSampleRepo(autoClonedRepo.path, autoClonedRepo.url);
        }
        console.log("demo repo initialized");
        setState("initialized");
      } catch (e) {
        console.error("could not initialize the demo repo", e);
        setState("error");
      }
    }
  }, []);

  const fraction = cloneProgress?.total
    ? cloneProgress.loaded / cloneProgress.total
    : 0;

  switch (state) {
    case "uninitialized":
      return null;
    case "initialized":
      return <>{children}</>;
    case "cloning":
      return (
        <InlinePopup minWidth={450}>
          <Popup.Layout
            header="Cloning sample git repository"
            content={
              <div style={{ padding: "1rem" }}>
                <ProgressBar
                  name={`Cloning repository ${autoClonedRepo.url}`}
                  isIndeterminate={!cloneProgress}
                  details={
                    fraction
                      ? `${cloneProgress?.phase}: ${Math.round(
                          fraction * 100
                        )}% ${cloneProgress?.loaded}/${cloneProgress?.total}`
                      : cloneProgress?.phase
                  }
                  aria-label={`Progress of cloning sample repo`}
                  value={
                    cloneProgress
                      ? cloneProgress.loaded / cloneProgress.total
                      : 0
                  }
                  maxValue={1}
                />
              </div>
            }
          />
        </InlinePopup>
      );
    case "error":
      return (
        <AlertDialog
          type="error"
          heading="Something went wrong!"
          body="Could not initialize example app"
          buttons={
            <Button
              variant="default"
              onPress={() => {
                window.location.reload();
              }}
            >
              Reload
            </Button>
          }
        />
      );
  }
};

export async function cloneRepo({
  dir,
  url,
  onProgress,
}: Pick<Parameters<typeof clone>[0], "url" | "dir" | "onProgress">) {
  console.log("cloning repo: ");
  await clone({
    fs,
    url,
    http,
    corsProxy: "https://cors.isomorphic-git.org",
    dir,
    onProgress,
    singleBranch: true,
  });
}
