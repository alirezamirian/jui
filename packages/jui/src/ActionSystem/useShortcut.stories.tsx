import { Meta, Story } from "@storybook/react";
import React, { useEffect, useRef } from "react";
import { Color } from "@intellij-platform/core/Theme";
import { styled } from "@intellij-platform/core/styled";
import { useShortcuts } from "./useShortcut";
import { shortcutToString } from "./shortcutToString";
import { isKeyboardShortcut } from "./Shortcut";

type Args = {
  shortcuts: Parameters<typeof useShortcuts>[0];
  onAction: Parameters<typeof useShortcuts>[1];
};
export default {
  title: "ActionSystem/useShortcut",
  args: {},
  argTypes: {
    onAction: {
      type: "function",
    },
  },
} as Meta<Args>;

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.color("*.foreground")};
  padding: 0.5rem;
  &:focus {
    outline: none;
    background: ${({ theme }) =>
      Color.brighter(theme.commonColors.panelBackground)};
  }
  &:focus::after {
    content: "Focused. Type to trigger keyboard shortcuts";
    position: absolute;
    margin-top: 0.75rem;
    font-size: 0.85em;
    color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  }
  table {
    width: 400px;
    max-width: 100%;
  }
  th {
    text-align: left;
  }
`;
const Template: Story<Args> = ({ onAction, shortcuts }: Args) => {
  const { shortcutHandlerProps } = useShortcuts(shortcuts, onAction);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  });
  return (
    <div {...shortcutHandlerProps}>
      <StyledContainer
        tabIndex={0}
        ref={ref}
        onClick={() => ref.current?.focus()}
      >
        <table>
          <thead>
            <tr>
              <th>Action ID</th>
              <th>Keyboard Shortcuts</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shortcuts).map(([actionId, shortcuts]) => (
              <tr key={actionId}>
                <td>{actionId}</td>
                <td>
                  {shortcuts.filter(isKeyboardShortcut).map((shortcut) => (
                    <code>{shortcutToString(shortcut)}</code>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledContainer>
    </div>
  );
};
export const Default = Template.bind(null);
Default.args = {
  shortcuts: {
    action1: [
      {
        type: "keyboard",
        firstKeyStroke: { modifiers: ["Control"], code: "KeyC" },
      },
    ],
  },
};
export const MultiKeyStroke = Template.bind(null);
MultiKeyStroke.args = {
  shortcuts: {
    action1: [
      {
        type: "keyboard",
        firstKeyStroke: { modifiers: ["Control"], code: "KeyC" },
        secondKeyStroke: { code: "KeyD" },
      },
    ],
  },
};

export const SecondKeyStrokePriority = Template.bind(null);
SecondKeyStrokePriority.args = {
  shortcuts: {
    action1: [{ type: "keyboard", firstKeyStroke: { code: "KeyD" } }],
    action2: [
      {
        type: "keyboard",
        firstKeyStroke: { modifiers: ["Control"], code: "KeyC" },
        secondKeyStroke: { code: "KeyD" },
      },
    ],
  },
};

export const ConflictingShortcuts = Template.bind(null);
ConflictingShortcuts.args = {
  shortcuts: {
    action1: [{ type: "keyboard", firstKeyStroke: { code: "KeyD" } }],
    action2: [{ type: "keyboard", firstKeyStroke: { code: "KeyD" } }],
  },
};
