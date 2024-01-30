import React from "react";
import {
  ActionTooltip,
  IconButton,
  IconButtonWithMenu,
  Item,
  Menu,
  PlatformIcon,
  Section,
  TooltipTrigger,
} from "@intellij-platform/core";

interface Grouping<K extends string> {
  id: K;
  title: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

export function GroupByActionButton<K extends string>({
  groupings,
  onToggle,
}: {
  groupings: Array<Grouping<K>>;
  onToggle: (id: K) => void;
}) {
  //  TODO: Generalize and make action
  if (groupings.length === 1 && groupings[0].icon) {
    return (
      <TooltipTrigger
        tooltip={
          <ActionTooltip actionName={`Group By ${groupings[0].title}`} />
        }
      >
        <IconButton
          isPressed={groupings[0].isActive}
          onPress={() => onToggle(groupings[0].id)}
        >
          {groupings[0].icon}
        </IconButton>
      </TooltipTrigger>
    );
  }
  return (
    <TooltipTrigger tooltip={<ActionTooltip actionName="Group By" />}>
      <IconButtonWithMenu
        renderMenu={({ menuProps }) => {
          return (
            <Menu
              {...menuProps}
              selectedKeys={groupings
                .filter(({ isActive }) => isActive)
                .map(({ id }) => id)}
              onAction={(key) => {
                const id = groupings.find(({ id }) => id === key)?.id;
                if (id) {
                  onToggle(id);
                }
              }}
            >
              <Section title="Group By">
                {groupings.map(({ id, title }) => (
                  <Item key={id}>{title}</Item>
                ))}
              </Section>
            </Menu>
          );
        }}
      >
        <PlatformIcon icon="actions/groupBy.svg" />
      </IconButtonWithMenu>
    </TooltipTrigger>
  );
}
