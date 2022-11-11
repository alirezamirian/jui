import { Keymap } from "@intellij-platform/core/ActionSystem";

export const exampleAppKeymap: Keymap = {
  ActivateProjectWindow: [
    { type: "keyboard", firstKeyStroke: { key: "1", modifiers: ["Meta"] } },
  ],
  ActivateCommitWindow: [
    { type: "keyboard", firstKeyStroke: { key: "0", modifiers: ["Meta"] } },
  ],
  ActivateTerminalWindow: [
    { type: "keyboard", firstKeyStroke: { key: "F12", modifiers: ["Alt"] } },
  ],
};
