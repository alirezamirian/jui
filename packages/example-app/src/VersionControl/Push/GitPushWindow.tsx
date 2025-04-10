import {
  BalloonActionLink,
  Button,
  Checkbox,
  Dropdown,
  Item,
  ModalWindow,
  ThreeViewSplitter,
  WindowLayout,
} from "@intellij-platform/core";
import { atom, useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { windowStateAtom } from "../../persistence/common/windowStateAtom";
import { vcsRootsAtom } from "../file-status.state";
import { PushLogTree } from "./PushLogTree";
import { getShortRepositoryName } from "../repo-utils";
import { HelpButton } from "../../HelpButton";
import {
  _balloonManagerRef,
  notImplemented,
} from "../../Project/notImplemented";
import { appPropertyAtom } from "../../persistence/common/propertiesComponentAtom";
import { PushLogDetails } from "./PushLogDetails";
import { commitNodesAtom, pushesAtom } from "./PushLog.state";
import git, { Errors } from "isomorphic-git";
import http from "isomorphic-git/http/web";
import { fs } from "../../fs/fs";
import { atomCallback } from "../../atom-utils/atomCallback";
import { createGitTaskCallback } from "../createGitTaskCallback";
import { unwrap, useAtomCallback } from "jotai/utils";
import {
  repoBranchesAtom,
  repoCurrentBranchNameAtom,
} from "../Branches/branches.state";
import { IntlMessageFormat } from "intl-messageformat";

const firstViewSizeAtom = appPropertyAtom.number(
  "Vcs.Push.Splitter.Tree.Proportion",
  0.5
);
const gitWindowBoundsAtom = windowStateAtom("Vcs.Push.Dialog.v2");

const pushCallback = atomCallback(
  {
    createGitTaskCallback,
  },
  async ({ get, set, createGitTask }) => {
    const pushes = await get(pushesAtom);
    const multiRepo = get(vcsRootsAtom).length > 1;
    createGitTask({
      title: "Pushing...",
      run: async ({ onProgress, ...handlers }) => {
        const errors = new Map<string, unknown>();
        for (const args of pushes) {
          await git
            .push({
              fs,
              http,
              onProgress: onProgress.part(pushes.indexOf(args), pushes.length),
              ...handlers,
              ...args,
            })
            .then((r) => {
              console.log("push result", r);
              // TODO: handle push error
              return r;
            })
            .catch((e) => {
              console.error("Git push error. args:", args, "error:", e);
              errors.set(args.dir, e);
            });
        }
        const singleSuccessfulPush = !multiRepo && errors.size === 0;
        const params = {
          ...pushes[0],
          source: await get(repoCurrentBranchNameAtom(pushes[0].dir)),
        };
        _balloonManagerRef.value?.showSticky({
          icon: errors.size > 0 ? "Error" : "Info",
          title:
            errors.size > 0
              ? errors.size < pushes.length
                ? `Push partially failed`
                : "Push failed"
              : singleSuccessfulPush
              ? getPushResultMessage(params)
              : "Push successful",
          body:
            !singleSuccessfulPush &&
            pushes.map((push) => {
              const { dir, url, remote } = push;
              const error = errors.get(dir);
              // TODO: handle "push rejected"
              return (
                <div key={dir}>
                  {multiRepo && <>{getShortRepositoryName({ dir })}: </>}
                  {error
                    ? getPushErrorMessage({ error, url: url ?? remote })
                    : getPushResultMessage(params)}
                </div>
              );
            }),
          actions: (
            <>
              <BalloonActionLink onPress={notImplemented}>
                Show details in console
              </BalloonActionLink>
            </>
          ),
        });
      },
      onFinished: () => {
        pushes.map(({ dir }) => {
          set(repoBranchesAtom(dir));
        });
      },
    });
    function getPushResultMessage({
      remoteRef,
      remote,
      dir,
      source,
      isNew,
    }: (typeof pushes)[number] & { source: string | void }) {
      const isForce = false; // TODO
      const pushedCommitLength = get(
        commitNodesAtom({ repoPath: dir })
      )?.length;
      const isUpToDate = !pushedCommitLength; // TODO: is there a way to tell this from push result?
      return isUpToDate
        ? "Everything is up to date"
        : `${isForce ? "Force pushed" : "Pushed"} ${
            isNew
              ? source
              : `${new IntlMessageFormat(
                  `{count, plural,
                        =1 {commit}
                        other {# commits}
                          }`,
                  "en-US"
                ).format({ count: pushedCommitLength })}`
          } to${isNew ? " new branch" : ""} ${remote}/${remoteRef}`;
    }
  }
);

function getPushErrorMessage({ error, url }: { error: unknown; url: string }) {
  return `${getErrorMessage(error)} ${
    error instanceof Errors.HttpError && error.data.statusCode === 401
      ? `Authentication failed for '${url}'`
      : ""
  }`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Errors.HttpError) {
    return `remote: ${error.data.response}`;
  }
  // TODO: improve error messages
  return "Unknown error occurred while pushing";
}

export function GitPushWindow({ close }: { close: () => void }) {
  const repos = useAtomValue(vcsRootsAtom);

  const [firstViewSize, setFirstViewSize] = useAtom(firstViewSizeAtom);

  const [windowState, setWindowState] = useAtom(gitWindowBoundsAtom);

  return (
    <ModalWindow
      bounds={
        windowState?.bounds ?? {
          width: 800,
          height: 450 + /* header and footer*/ 70,
        }
      }
      onBoundsChange={(bounds) => {
        setWindowState({
          bounds,
          screen: {
            left: window.screenX,
            top: window.screenY,
            width: window.outerWidth,
            height: window.outerHeight,
          },
          timestamp: Date.now(),
        });
      }}
    >
      <WindowLayout
        header={
          repos.length === 1
            ? `Push commits to ${getShortRepositoryName(repos[0])}`
            : "Push commits"
        }
        content={
          <ThreeViewSplitter
            firstSize={firstViewSize}
            onFirstResize={setFirstViewSize}
            firstView={<PushLogTree />}
            innerView={<PushLogDetails />}
          />
        }
        footer={<GitPushWindowFooter close={close} />}
      />
    </ModalWindow>
  );
}

const canPushAtom = unwrap(
  atom((get) => get(pushesAtom).then((pushes) => pushes.length > 0)),
  () => false
);

function GitPushWindowFooter({ close }: { close: () => void }) {
  let [shouldPushTags, setShouldPushTags] = useState(false); // local state?
  const push = useAtomCallback(pushCallback);
  const canPush = useAtomValue(canPushAtom);

  return (
    <WindowLayout.Footer
      hasBorder
      left={
        <>
          <HelpButton onPress={() => notImplemented()}></HelpButton>
          <Checkbox
            mnemonic="t"
            isSelected={shouldPushTags}
            onChange={setShouldPushTags}
          >
            Push tags
          </Checkbox>
          <Dropdown
            isDisabled={!shouldPushTags}
            selectedKey="all"
            style={{ width: 145 }}
          >
            <Item key="all">All</Item>
            <Item key="currentBranch">Current Branch</Item>
          </Dropdown>
        </>
      }
      right={
        <>
          <Button onPress={close}>Cancel</Button>
          <Button
            isDisabled={!canPush}
            variant="default"
            mnemonic="P"
            onPress={() => {
              push();
              close();
            }}
          >
            Push
          </Button>
        </>
      }
    />
  );
}
