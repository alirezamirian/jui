import path from "path";
import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  Button,
  ComboBox,
  Item,
  LabeledControlsAlignmentProvider,
  ModalWindow,
  styled,
  WindowLayout,
} from "@intellij-platform/core";
import { windowManagerRefAtom } from "../../Project/project.state";
import { fs } from "../../fs/fs";
import { stat } from "../../fs/fs-utils";
import { VcsActionIds } from "../VcsActionIds";
import {
  cloneParentDirAtom,
  gitVisitedUrlsAtom,
} from "../gitRememberedInputs.state";
import { useClone } from "../useClone";
import { PathInputField } from "./PathInputField";
import { actionAtom } from "../../actionAtom";

export const gitCloneActionAtom = actionAtom({
  id: VcsActionIds.GIT_CLONE,
  title: "Clone...",
  actionPerformed: async ({ get }) => {
    const windowManager = get(windowManagerRefAtom);
    windowManager.current?.open(({ close }) => (
      <GitCloneWindow close={close} />
    ));
  },
});

export const cloneAnotherRepoActionAtom = actionAtom({
  id: "ExampleApp.cloneExampleRepo",
  title: "Clone another repository...",
  isSearchable: false,
  actionPerformed: ({ get }) => {
    const windowManager = get(windowManagerRefAtom);
    windowManager.current?.open(({ close }) => (
      <GitCloneWindow
        close={close}
        url="https://github.com/thurwitz/example-branches.git"
      />
    ));
  },
});

const StyledContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
`;

function GitCloneWindow({
  close,
  url: urlProp,
}: {
  close: () => void;
  url?: string;
}) {
  const [url, setUrl] = useState(urlProp ?? "");
  const [parentDir, setCloneParentDirState] = useAtom(cloneParentDirAtom);
  const [visitedUrls, setVisitedUrls] = useAtom(gitVisitedUrlsAtom);
  const [directory, setDirectory] = useState("");
  const [autoFillDirectory, setAutoFillDirectory] = useState(true);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const dirInputRef = useRef<HTMLInputElement>(null);
  const urlError = validateRepoUrl(url);
  const [dirError, setDirError] = useState("");

  const clone = useClone();

  useEffect(() => {
    if (autoFillDirectory) {
      const repoName =
        url
          .split(/\/{1,2}/)
          .pop()
          ?.replace(/\.git$/, "") ?? "";
      setDirectory(repoName ? path.join(parentDir, repoName) : parentDir);
    }
  }, [parentDir, url, autoFillDirectory]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidationErrors(true);
    // Note: in the reference impl, validation is live, here it's upon submission.
    // Error is cleared upon change, like in NewFilePopup.
    const dirValidationError = await validateCloneDirectory(directory);
    if (dirValidationError) {
      setDirError(dirValidationError);
      dirInputRef.current?.focus();
      return;
    }
    if (urlError) {
      urlInputRef.current?.focus();
      return;
    }
    setCloneParentDirState(path.dirname(directory));
    setVisitedUrls((urls) =>
      urls.find((visitedUrl) => visitedUrl.url === url)
        ? urls
        : urls.concat({ url })
    );
    clone({
      url,
      dir: directory,
      onSuccess: () => {
        setVisitedUrls((visitedUrls) =>
          visitedUrls.map(({ url }) => url).includes(url)
            ? visitedUrls
            : [...visitedUrls, { url, username: "" }]
        );
      },
    });
    close();
  };

  return (
    <ModalWindow minWidth={600} minHeight="content">
      <WindowLayout
        header="Get from Version Control"
        content={
          <LabeledControlsAlignmentProvider>
            <form id="clone_form" onSubmit={onSubmit}>
              <StyledContainer>
                <ComboBox
                  inputRef={urlInputRef}
                  autoFocus
                  label="URL:"
                  value={url}
                  validationState={
                    urlError && showValidationErrors ? "error" : "valid"
                  }
                  validationMessage={showValidationErrors && urlError}
                  onValueChange={(value) => {
                    setUrl(value);
                  }}
                  items={visitedUrls}
                >
                  {({ url }) => <Item key={url}>{url}</Item>}
                </ComboBox>
                <PathInputField
                  inputRef={dirInputRef}
                  label="Directory:"
                  value={directory}
                  validationState={
                    dirError && showValidationErrors ? "error" : "valid"
                  }
                  validationMessage={showValidationErrors && dirError}
                  onChange={(value) => {
                    setDirectory(value);
                    setAutoFillDirectory(false);
                    setDirError("");
                  }}
                />
              </StyledContainer>
            </form>
          </LabeledControlsAlignmentProvider>
        }
        footer={
          <WindowLayout.Footer
            right={
              <>
                <Button onPress={close}>Cancel</Button>
                <Button
                  variant="default"
                  isDisabled={!directory || !url}
                  type="submit"
                  form="clone_form"
                >
                  Clone
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}

async function validateCloneDirectory(directory: string) {
  const stats = await stat(directory);
  if (!stats) {
    return null;
  }
  if (!stats.isDirectory()) {
    return "Destination is not a directory";
  }
  const entries = await fs.promises.readdir(directory);
  return entries.length > 0
    ? "The directory already exists and is not empty"
    : null;
}
const SSH_URL_PATTERN = new RegExp(`^git@[\\w.-]+:[\\w./-]+\\.git$`);
function validateRepoUrl(url: string): string | null {
  url = sanitizeCloneUrl(url);
  try {
    new URL(url);
    return null;
  } catch (e) {
    if (SSH_URL_PATTERN.test(url)) {
      return null;
    }
  }
  return "Repository URL is a malformed URL";
}

function sanitizeCloneUrl(url: string): string {
  return removePrefix(removePrefix(url.trim(), "git clone"), "hg clone");
}

function removePrefix(str: string, prefix: string): string {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
}
