import { Keymap } from "@intellij-platform/core/ActionSystem/KeymapProvider";
import {
  FOCUS_EDITOR_ACTION_ID,
  HIDE_ACTIVE_WINDOW_ACTION_ID,
  HIDE_ALL_WINDOWS_ACTION_ID,
  JUMP_TO_LAST_WINDOW_ACTION_ID,
  MAXIMIZE_TOOL_WINDOW_ACTION_ID,
  RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID,
  RESIZE_TOOL_WINDOW_LEFT_ACTION_ID,
  RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID,
  RESIZE_TOOL_WINDOW_TOP_ACTION_ID,
  // For some reason importing from shorter paths doesn't work as expected in cypress ¯\_(ツ)_/¯
  // Weirdly, `import *` works in that case.
} from "@intellij-platform/core/ToolWindowsImpl/ToolWindowActionIds";

// TODO: OS specific defaults
// TODO: extract and export action ids
// NOTE: defaultKeymap doesn't belong to ActionSystem semantically. Would be something to be moved to a separate module
export const defaultKeymap: Keymap = {
  [RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowRight",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [RESIZE_TOOL_WINDOW_LEFT_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowLeft",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [RESIZE_TOOL_WINDOW_TOP_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowUp",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowDown",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [MAXIMIZE_TOOL_WINDOW_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "'",
        modifiers: ["Shift", "Meta"],
      },
    },
  ],
  [FOCUS_EDITOR_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "Escape",
      },
    },
  ],
  [HIDE_ACTIVE_WINDOW_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "Escape",
        modifiers: ["Shift"],
      },
    },
  ],
  [HIDE_ALL_WINDOWS_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "F12",
        modifiers: ["Shift", "Meta"],
      },
    },
  ],
  [JUMP_TO_LAST_WINDOW_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "F12",
      },
    },
  ],
  ExpandSelection: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        key: "W",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Alt"],
        key: "ArrowUp",
      },
    },
  ],
  ShrinkSelection: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        key: "W",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Alt"],
        key: "ArrowDown",
      },
    },
  ],
};
