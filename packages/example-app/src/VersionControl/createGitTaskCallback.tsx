import type {
  AuthCallback,
  AuthFailureCallback,
  GitAuth,
  GitProgressEvent,
  MessageCallback,
  ProgressCallback,
} from "isomorphic-git";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  InputField,
  LabeledControlsAlignmentProvider,
  ModalWindow,
  styled,
  WindowLayout,
} from "@intellij-platform/core";
import { atomCallback } from "../atom-utils/atomCallback";
import { createTaskCallback } from "../tasks";
import { windowManagerRefAtom } from "../Project/project.state";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const gitAuthenticateCallback = atomCallback(
  ({ get }, url: string, auth: GitAuth): Promise<GitAuth> => {
    return new Promise((resolve, reject) => {
      get(windowManagerRefAtom)
        .current?.open<GitAuth>(({ close }) => {
          const Component =
            gitAuthHandlers.find((handler) => handler.canHandle(url))
              ?.component ?? GenericGitCredentialsHandlerWindow;
          return <Component callback={close} url={url} />;
        })
        .then((credentials) => {
          if (credentials) {
            resolve(credentials);
          } else {
            reject(); // or resolve({cancel: true})?
          }
        });
    });
  }
);

const GITHUB_SCOPES = [
  "repo",
  "gist",
  "read:org",
  "workflow",
  "read:user",
  "user:email",
];
const githubTokenSearchParams = new URLSearchParams();
githubTokenSearchParams.set("description", "JUI GitHub Integration");
githubTokenSearchParams.set(
  "scopes",
  "repo,gist,read:org,workflow,read:user,user:email"
);

function GithubCredentialsHandlerWindow({
  callback,
  url: urlString,
}: GitAuthHandlerProps) {
  const url = URL.parse(urlString);
  const host = url?.host;
  console.log("url", url, "urlString", urlString);
  const username = url?.pathname?.split("/").find(Boolean) ?? "";

  const [token, setToken] = useState("");

  return (
    <ModalWindow
      defaultBounds={{ width: 634 }}
      minHeight="content"
      minWidth={500}
    >
      <WindowLayout
        header="Login to Github"
        content={
          <div style={{ padding: "1rem" }}>
            <LabeledControlsAlignmentProvider>
              <form
                id="credentials"
                onSubmit={(e) => {
                  e.preventDefault();
                  callback({ username, password: token });
                }}
              >
                <StyledContainer>
                  <InputField
                    label="Server:"
                    inputProps={{ readOnly: true }}
                    labelPlacement="before"
                    value={host}
                  />
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <InputField
                      label="Token:"
                      labelPlacement="before"
                      inputProps={{ type: "password" }}
                      contextHelp={`The following scopes must be granted to the token: [${GITHUB_SCOPES.join(
                        ", "
                      )}]`}
                      value={token}
                      onChange={setToken}
                    />
                    <Button
                      href={`https://github.com/settings/tokens/new?${githubTokenSearchParams.toString()}`}
                      target="_blank"
                    >
                      Generate...
                    </Button>
                  </div>
                </StyledContainer>
              </form>
            </LabeledControlsAlignmentProvider>
          </div>
        }
        footer={
          <WindowLayout.Footer
            right={
              <ButtonGroup>
                <Button variant="default" type="submit" form="credentials">
                  Log In
                </Button>
                <Button onPress={() => callback()}>Cancel</Button>
              </ButtonGroup>
            }
          />
        }
      />
    </ModalWindow>
  );
}

interface GitAuthHandler {
  component: React.ComponentType<GitAuthHandlerProps>;
  canHandle: (url: string) => boolean;
}

const gitAuthHandlers: Array<GitAuthHandler> = [
  {
    component: GithubCredentialsHandlerWindow,
    canHandle: (url: string) => url.startsWith("https://github"),
  },
];

type GitAuthHandlerProps = {
  url: string;
  callback: (credentials?: GitAuth) => void;
};

function GenericGitCredentialsHandlerWindow({
  url: urlStr,
  callback,
}: GitAuthHandlerProps) {
  const url = URL.parse(urlStr);
  const [username, setUsername] = useState(url?.username ?? "");
  const [password, setPassword] = useState("");
  return (
    <ModalWindow>
      <WindowLayout
        header={`Login to ${url?.hostname ?? urlStr}`}
        content={
          <div style={{ padding: "1rem" }}>
            <LabeledControlsAlignmentProvider>
              <form
                id="credentials"
                onSubmit={(e) => {
                  e.preventDefault();
                  callback({ username, password });
                }}
              >
                <StyledContainer>
                  <InputField
                    label="Username:"
                    labelPlacement="before"
                    value={username}
                    onChange={setUsername}
                  />
                  <InputField
                    label="Password:"
                    labelPlacement="before"
                    inputProps={{ type: "password" }}
                    value={password}
                    onChange={setPassword}
                  />
                  {/* TODO: checkbox alignment is wrong */}
                  <Checkbox mnemonic="R">Remember</Checkbox>
                </StyledContainer>
              </form>
            </LabeledControlsAlignmentProvider>
          </div>
        }
        footer={
          <WindowLayout.Footer
            right={
              <ButtonGroup>
                <Button variant="default" type="submit" form="credentials">
                  Log In
                </Button>
                <Button onPress={() => callback()}>Cancel</Button>
              </ButtonGroup>
            }
          />
        }
      />
    </ModalWindow>
  );
}
/**
 * A wrapper around createTaskCallback with a different `run` interface,
 * that provides common git operation arguments:
 * - `onProgress` connecting git operation progress to the {@link Task}'s progress.
 */
export const createGitTaskCallback = atomCallback(
  {
    createTaskCallback,
    gitAuthenticateCallback,
  },
  (
    { createTask, gitAuthenticate },
    {
      title,
      run,
      ...otherArgs
    }: {
      title: string;
      run: (gitMethodArgs: {
        onProgress: ProgressCallback & {
          part: (index: number, of: number) => ProgressCallback;
        };
        onAuth: AuthCallback;
        onAuthFailure: AuthFailureCallback;
        onMessage: MessageCallback;
      }) => Promise<void>;
      onFinished?: () => void;
    }
  ) => {
    return createTask(
      { title },
      {
        ...otherArgs,
        run: ({ setIndeterminate, setFraction, setSecondaryText }) => {
          function onProgress(
            progress: GitProgressEvent,
            part: number = 1,
            totalParts: number = 1
          ) {
            const total = (progress.total * part) / totalParts;
            if (total) {
              const fraction = progress.loaded / total;
              setFraction(fraction);
              setSecondaryText(
                `${progress.phase}: ${Math.round(fraction * 100)}% ${
                  progress.loaded
                }/${total}`
              );
            } else {
              setSecondaryText(progress.phase);
              setIndeterminate(true);
            }
          }
          onProgress.part =
            (index: number, of: number) => (progress: GitProgressEvent) =>
              onProgress(progress, index, of);

          return run(
            {
              // TODO: handle onAuthFailure, onAuth, and maybe onMessage
              onProgress,
              onAuth: (url, auth) => gitAuthenticate(url, auth),
              onAuthFailure: (...args) => {
                // useful for multiple methods of authentication
              },
              onMessage: (message) => {
                // TODO: keep logs in an atom to be shown in a "Console" tab in vcs toolwindow.
                console.log("git message:", message);
              },
            }
            /*
              ProgressIndicator or a subset of it could also be provided as
              a second argument if needed in some use cases
            */
          );
        },
      }
    );
  }
);
