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
import { CommonActionId } from "@intellij-platform/core/ActionSystem/CommonActionIds";

// TODO: OS specific defaults
// TODO: extract and export action ids
// NOTE: defaultKeymap doesn't belong to ActionSystem semantically. Would be something to be moved to a separate module
export const defaultKeymap: Keymap = {
  [RESIZE_TOOL_WINDOW_RIGHT_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "ArrowRight",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [RESIZE_TOOL_WINDOW_LEFT_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "ArrowLeft",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [RESIZE_TOOL_WINDOW_TOP_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "ArrowUp",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [RESIZE_TOOL_WINDOW_BOTTOM_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "ArrowDown",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  [MAXIMIZE_TOOL_WINDOW_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "Quote",
        modifiers: ["Shift", "Meta"],
      },
    },
  ],
  [FOCUS_EDITOR_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "Escape",
      },
    },
  ],
  [HIDE_ACTIVE_WINDOW_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "Escape",
        modifiers: ["Shift"],
      },
    },
  ],
  [HIDE_ALL_WINDOWS_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "F12",
        modifiers: ["Shift", "Meta"],
      },
    },
  ],
  [JUMP_TO_LAST_WINDOW_ACTION_ID]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "F12",
      },
    },
  ],
  [CommonActionId.EXPAND_SELECTION]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "KeyW",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Alt"],
        code: "ArrowUp",
      },
    },
  ],
  [CommonActionId.SHRINK_SELECTION]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "KeyW",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Alt"],
        code: "ArrowDown",
      },
    },
  ],
  [CommonActionId.EXPAND_ALL]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "Equal",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "NumpadAdd",
      },
    },
  ],
  [CommonActionId.COLLAPSE_ALL]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "Minus",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "NumpadSubtract",
      },
    },
  ],
};
