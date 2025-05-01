import { atom } from "jotai";
import React from "react";
import { descend, prop, sortWith } from "ramda";
import {
  Item,
  ItemLayout,
  MenuItemLayout,
  PlatformIcon,
  Popup,
  PopupLayout,
  SpeedSearchMenu,
} from "@intellij-platform/core";

import { projectPopupManagerRefAtom } from "../project.state";
import { actionAtom } from "../../actionAtom";
import { _balloonManagerRef } from "../notImplemented";

type Version = { name: string; date: Date; url: string };
const versionsAtom = atom(async (): Promise<Version[]> => {
  const response = await fetch(
    "https://api.github.com/repos/alirezamirian/jui/tags"
  );
  if (!response.ok) throw response;
  const tags: Array<{ name: string; commit: { sha: string } }> =
    await response.json();
  return sortWith(
    [descend(prop("date"))],
    await Promise.all(
      tags.map(async (tag) => {
        const commitResponse = await fetch(
          `https://api.github.com/repos/alirezamirian/jui/commits/${tag.commit.sha}`
        );
        if (!commitResponse.ok) throw commitResponse;
        const commit = await commitResponse.json();
        const normalizedTagName = tag.name.replace(/^docs\//, "");
        return {
          name: normalizedTagName,
          url: `https://alirezamirian.github.io/jui/-/${normalizedTagName}/example-app`,
          date: new Date(commit.commit.author.date),
        };
      })
    )
  );
});

export const switchAppVersionAtom = actionAtom({
  id: "example-app.switchVersion",
  icon: <PlatformIcon icon="fileTypes/text" />, // FIXME
  title: "Switch version",
  description: "Change to other versions of this demo app",
  actionPerformed: async ({ get }) => {
    const popupManager = get(projectPopupManagerRefAtom).current;
    if (!popupManager) {
      throw new Error("Could not find popup manager");
    }
    try {
      const tags = await get(versionsAtom);
      popupManager.show(({ close }) => (
        <SwitchVersionPopup close={close} tags={tags} />
      ));
    } catch (error) {
      const getMessage = (error: unknown) => {
        if (error instanceof Response) {
          const rateLimitResetHeader = error.headers.get("x-ratelimit-reset");
          return `Github API rate limit is reached. Try again ${
            rateLimitResetHeader
              ? `after ${new Date(
                  parseInt(rateLimitResetHeader) * 1000
                ).toLocaleTimeString()}`
              : "later"
          }.`;
        }
        return "Unexpected error happened while fetching versions data.";
      };
      _balloonManagerRef.value?.show({
        icon: "Error",
        title: "Could not fetch versions",
        body: getMessage(error),
      });
    }
  },
});

function SwitchVersionPopup({
  tags,
  close,
}: {
  close: () => void;
  tags: Version[];
}) {
  return (
    <Popup>
      <PopupLayout
        header={
          <Popup.Header>
            {/* FIXME: the default padding makes sense to come from Popup.Header */}
            <div style={{ padding: "0 .5rem" }}>Switch demo app version</div>
          </Popup.Header>
        }
        content={
          <SpeedSearchMenu
            items={tags}
            fillAvailableSpace
            onAction={(url) => {
              window.location.href = `${url}`;
              close();
            }}
          >
            {(version) => (
              <Item key={version.url} textValue={version.name}>
                <MenuItemLayout
                  content={version.name}
                  shortcut={
                    <ItemLayout.Hint>
                      {version.date.toLocaleDateString()}
                    </ItemLayout.Hint>
                  }
                />
              </Item>
            )}
          </SpeedSearchMenu>
        }
      />
    </Popup>
  );
}
