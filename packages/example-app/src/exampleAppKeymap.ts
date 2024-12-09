import { Keymap } from "@intellij-platform/core";
import { SearchEverywhereActionIds } from "./SearchEverywhere/SearchEverywhereActionIds";
import { VcsActionIds } from "./VersionControl/VcsActionIds";
import { AppActionIds } from "./appActionIds";
import { editorActionIds } from "./Editor/editorActionIds";
import { projectActionIds } from "./Project/projectActionIds";

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
  [AppActionIds.PASTE_MULTIPLE]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "KeyV",
      },
    },
  ],
  [projectActionIds.NewElement]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "KeyN",
      },
    },
  ],
  [AppActionIds.GENERATE]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "KeyN",
      },
    },
  ],
  [editorActionIds.EXPAND_REGION]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "NumpadAdd",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta"],
        code: "Equal",
      },
    },
  ],
  [editorActionIds.EXPAND_REGION_RECURSIVELY]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Alt"],
        code: "NumpadAdd",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Alt"],
        code: "Equal",
      },
    },
  ],
  [editorActionIds.EXPAND_ALL_REGIONS]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "NumpadAdd",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "Equal",
      },
    },
  ],
  ...([1, 2, 3, 4, 5] as const).reduce((result, level) => {
    result[editorActionIds[`EXPAND_ALL_TO_LEVEL${level}`]] = [
      {
        type: "keyboard",
        firstKeyStroke: {
          modifiers: ["Alt", "Meta"],
          code: "Multiply",
        },
        secondKeyStroke: {
          code: `Digit${level}`,
        },
      },
      {
        type: "keyboard",
        firstKeyStroke: {
          modifiers: ["Alt", "Meta"],
          code: "Multiply",
        },
        secondKeyStroke: {
          code: `Numpad${level}`,
        },
      },
    ];
    return result;
  }, {} as Keymap),
  [editorActionIds.COLLAPSE_REGION]: [
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
  [editorActionIds.COLLAPSE_REGION_RECURSIVELY]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Alt"],
        code: "Minus",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Alt"],
        code: "NumpadSubtract",
      },
    },
  ],
  [editorActionIds.COLLAPSE_ALL_REGIONS]: [
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "Minus",
      },
    },
    {
      type: "keyboard",
      firstKeyStroke: {
        modifiers: ["Meta", "Shift"],
        code: "NumpadSubtract",
      },
    },
  ],
};
