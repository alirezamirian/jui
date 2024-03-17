import React from "react";
import { RecoilState, useRecoilState } from "recoil";
import {
  ActionTooltip,
  IconButtonWithMenu,
  Item,
  PlatformIcon,
  Section,
  SpeedSearchMenu,
  TooltipTrigger,
} from "@intellij-platform/core";

import { notImplemented } from "../../../Project/notImplemented";
import {
  authorColumn,
  dateColumn,
  hashColumn,
  vcsTableColumnsVisibilityState,
  vcsTableHighlightMyCommitsState,
  vcsTableReferencesOnTheLeftState,
  vcsTableShowCommitTimestampState,
} from "./CommitsTable.state";

type ToggleDef = {
  name: string;
  state: RecoilState<boolean>;
};
const showToggleDefs = [
  { name: "Commit Timestamp", state: vcsTableShowCommitTimestampState },
  { name: "References on the Left", state: vcsTableReferencesOnTheLeftState },
];
const highlightToggleDefs = [
  { name: "My Commits", state: vcsTableHighlightMyCommitsState },
];
const columnToggleDefs = [authorColumn, hashColumn, dateColumn].map(
  ({ name, id }) => ({
    name,
    state: vcsTableColumnsVisibilityState(id),
  })
);
const useToggleDef = (item: ToggleDef) => {
  const [value, set] = useRecoilState(item.state);
  return { ...item, key: item.state.key.replace(/"/g, "_"), value, set };
};

export function CommitsTableViewOptionsMenuIconButton() {
  const showToggles = showToggleDefs.map(useToggleDef);
  const highlightToggles = highlightToggleDefs.map(useToggleDef);
  const columnToggles = columnToggleDefs.map(useToggleDef);

  const allToggles = showToggles.concat(highlightToggles).concat(columnToggles);
  return (
    <TooltipTrigger tooltip={<ActionTooltip actionName="View Options" />}>
      <IconButtonWithMenu
        renderMenu={({ menuProps }) => {
          return (
            // TODO: keep menu open when (certain) items are toggled. Search for closeOnSelect TODO in menu
            <SpeedSearchMenu
              {...menuProps}
              selectedKeys={allToggles
                .filter(({ value }) => value)
                .map(({ key }) => key)}
              onAction={(key) => {
                const toggle = allToggles.find(
                  ({ key: toggleKey }) => toggleKey === key
                );
                if (toggle) {
                  toggle.set((value) => !value);
                } else {
                  notImplemented();
                }
              }}
            >
              <Section title="Show">
                <Item>Compact References View</Item>
                <Item>Tag Names</Item>
                <Item>Long Edges</Item>
                {
                  showToggles.map(({ name, key }) => (
                    <Item key={key}>{name}</Item>
                  )) as any /* returned type is too broad and couldn't find a quick way to narrow it properly */
                }
                <Item title="Columns">
                  {
                    columnToggles.map(({ name, key }) => (
                      <Item key={key}>{name}</Item>
                    )) as any /* returned type is too broad and couldn't find a quick way to narrow it properly */
                  }
                </Item>
              </Section>
              <Section title="Highlight">
                {
                  highlightToggles.map(({ name, key }) => (
                    <Item key={key}>{name}</Item>
                  )) as any /* returned type is too broad and couldn't find a quick way to narrow it properly */
                }
                <Item>Merge Commits</Item>
                <Item>Current Branch</Item>
                <Item>Not Cherry-Picked Commits</Item>
              </Section>
            </SpeedSearchMenu>
          );
        }}
      >
        <PlatformIcon icon="actions/groupBy.svg" />
      </IconButtonWithMenu>
    </TooltipTrigger>
  );
}
