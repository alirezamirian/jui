import { Keymap } from "@intellij-platform/core/ActionSystem/KeymapProvider";

// TODO: OS specific defaults
// TODO: extract and export action ids
export const defaultKeymap: Keymap = {
  ResizeToolWindowRight: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowRight",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  ResizeToolWindowLeft: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowLeft",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  ResizeToolWindowTop: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowUp",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  ResizeToolWindowBottom: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "ArrowDown",
        modifiers: ["Control", "Alt"],
      },
    },
  ],
  MaximizeToolWindow: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "'",
        modifiers: ["Shift", "Meta"],
      },
    },
  ],
  "TW.focusMainContent": [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "Escape",
      },
    },
  ],
  HideActiveWindow: [
    {
      type: "keyboard",
      firstKeyStroke: {
        key: "Escape",
        modifiers: ["Shift"],
      },
    },
  ],
};
