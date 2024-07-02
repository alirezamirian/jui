import { Keymap } from "@intellij-platform/core";
import { SearchEverywhereActionIds } from "./SearchEverywhere/SearchEverywhereActionIds";
import { VcsActionIds } from "./VersionControl/VcsActionIds";

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
  ActivateVersionControlWindow: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "Digit9", modifiers: ["Meta"] },
    },
  ],
  ActivateTerminalWindow: [
    { type: "keyboard", firstKeyStroke: { code: "F12", modifiers: ["Alt"] } },
  ],
  [VcsActionIds.ROLLBACK]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyZ", modifiers: ["Alt", "Meta"] },
    },
  ],
  [VcsActionIds.SHOW_DIFF]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyD", modifiers: ["Meta"] },
    },
  ],
  [VcsActionIds.SHELVE_SILENTLY]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "KeyH", modifiers: ["Meta", "Shift"] },
    },
  ],
  [VcsActionIds.UNSHELVE_SILENTLY]: [
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
  [VcsActionIds.RENAME_CHANGELIST]: [
    {
      type: "keyboard",
      firstKeyStroke: { code: "F2" },
    },
  ],
  [VcsActionIds.MOVE_TO_ANOTHER_CHANGELIST]: [
    {
      type: "keyboard",
      firstKeyStroke: { modifiers: ["Meta", "Shift"], code: "KeyM" },
    },
  ],
  [VcsActionIds.SET_DEFAULT_CHANGELIST]: [
    {
      type: "keyboard",
      firstKeyStroke: { modifiers: ["Control"], code: "Space" },
    },
  ],
  [VcsActionIds.REMOVE_CHANGELIST]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        code: "Backspace" /* TODO: in intellij, it's DELETE. Check if it's a special key which matches both backspace and Delete*/,
      },
    },
  ],
  [VcsActionIds.CHECKIN_PROJECT]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "KeyK",
      },
    },
  ],
  [VcsActionIds.ADD_UNVERSIONED]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Alt"],
        code: "KeyA",
      },
    },
  ],
  [VcsActionIds.FOCUS_TEXT_FILTER]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "KeyL",
      },
    },
  ],
  [VcsActionIds.GROUP_BY_DIRECTORY]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Control"],
        code: "KeyP",
      },
    },
  ],
  SafeDelete: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "Backspace" /* TODO: in intellij, it's DELETE. Check if it's a special key which matches both backspace and Delete*/,
      },
    },
  ],
  CopyPaths: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "KeyC",
      },
    },
  ],
  NewElement: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "KeyN",
      },
    },
  ],
};
