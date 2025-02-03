import {
  Button,
  Checkbox,
  Dropdown,
  Item,
  ModalWindow,
  ThreeViewSplitter,
  WindowLayout,
} from "@intellij-platform/core";
import { useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { windowStateAtom } from "../../persistence/common/windowStateAtom";
import { vcsRootsAtom } from "../file-status.state";
import { PushLogTree } from "./PushLogTree";
import { getShortRepositoryName } from "../repo-utils";
import { HelpButton } from "../../HelpButton";
import { notImplemented } from "../../Project/notImplemented";
import { appPropertyAtom } from "../../persistence/common/propertiesComponentAtom";
import { PushLogDetails } from "./PushLogDetails";
import { pushTreeIncludedReposAtom } from "./PushLog.state";

const firstViewSizeAtom = appPropertyAtom.number(
  "Vcs.Push.Splitter.Tree.Proportion",
  0.5
);
const gitWindowBoundsAtom = windowStateAtom("Vcs.Push.Dialog.v2");

export function GitPushWindow({ close }: { close: () => void }) {
  const repos = useAtomValue(vcsRootsAtom);
  let [shouldPushTags, setShouldPushTags] = useState(false); // local state?

  const [firstViewSize, setFirstViewSize] = useAtom(firstViewSizeAtom);

  const [windowState, setWindowState] = useAtom(gitWindowBoundsAtom);

  const selectedRepos = useAtomValue(pushTreeIncludedReposAtom);

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
        footer={
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
                  isDisabled={selectedRepos.length === 0}
                  variant="default"
                  mnemonic="P"
                  onPress={() => {
                    // TODO
                    notImplemented();
                    close();
                  }}
                >
                  Push
                </Button>
              </>
            }
          />
        }
      />
    </ModalWindow>
  );
}
