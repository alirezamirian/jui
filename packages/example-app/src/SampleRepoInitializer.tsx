import React, { useEffect, useState } from "react";
import { sampleRepo } from "./Project/project.state";
import { fs } from "./fs/fs";
import { clone } from "isomorphic-git";
import http from "isomorphic-git/http/web";
import styled from "styled-components";
import { WINDOW_SHADOW } from "@intellij-platform/core";

const StyledDialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.color("*.background")};
  color: ${({ theme }) => theme.color("*.foreground")};
  ${WINDOW_SHADOW};
  text-align: center;
  line-height: 1.5;
`;
const StyledDialogHeader = styled.div`
  background: ${({ theme }) => theme.color("Popup.Header.activeBackground")};
  padding: 4px;
  text-align: center;
`;
const StyledDialogContent = styled.div`
  padding: 8px 16px;
`;

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

export const SampleRepoInitializer: React.FC = ({ children }) => {
  const [state, setState] = useState<
    "error" | "cloning" | "uninitialized" | "initialized"
  >("uninitialized");
  useEffect(() => {
    async function init(dir: string, repoUrl: string) {
      if (!(await isSuccessfullyCloned(dir))) {
        setState("cloning");
        await cloneRepo({ dir, url: repoUrl });
      }
    }

    init(sampleRepo.path, sampleRepo.url)
      .then(() => {
        console.log("demo repo initialized");
        setState("initialized");
      })
      .catch((e) => {
        console.error("could not initialize the demo repo", e);
        setState("error");
      });
  }, []);

  if (state === "uninitialized") {
    return null;
  }
  if (state === "initialized") {
    return <>{children}</>;
  }
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <StyledDialog>
        <StyledDialogHeader>Cloning sample repo</StyledDialogHeader>
        <StyledDialogContent>
          {state === "cloning" ? (
            <>
              Cloning <b>{sampleRepo.url}</b>. <br />
              It may take several seconds.
            </>
          ) : (
            <>Something went wrong!</>
          )}
        </StyledDialogContent>
      </StyledDialog>
    </div>
  );
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
