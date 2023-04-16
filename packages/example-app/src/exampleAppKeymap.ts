import { Keymap } from "@intellij-platform/core";
import { ChangesViewActionIds } from "./VersionControl/Changes/useChangesViewActions";
import { SearchEverywhereActionIds } from "./SearchEverywhere/SearchEverywhereActionIds";

export const exampleAppKeymap: Keymap = {
  ActivateProjectWindow: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "Digit1", modifiers: ["Meta"] },
    },
  ],
  ActivateCommitWindow: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "Digit0", modifiers: ["Meta"] },
    },
  ],
  ActivateTerminalWindow: [
    { type: "keyboard", firstKeyStroke: { code: "F12", modifiers: ["Alt"] } },
  ],
  [ChangesViewActionIds.ROLLBACK]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyZ", modifiers: ["Alt", "Meta"] },
    },
  ],
  [ChangesViewActionIds.SHOW_DIFF]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyD", modifiers: ["Meta"] },
    },
  ],
  [ChangesViewActionIds.SHELVE_SILENTLY]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyH", modifiers: ["Meta", "Shift"] },
    },
  ],
  [ChangesViewActionIds.UNSHELVE_SILENTLY]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyU", modifiers: ["Meta", "Alt"] },
    },
  ],
  [SearchEverywhereActionIds.PREVIOUS_TAB]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "Tab", modifiers: ["Shift"] },
    },
  ],
  [SearchEverywhereActionIds.NEXT_TAB]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "Tab" },
    },
  ],
};
