import React, { MutableRefObject } from "react";
import copyToClipboard from "clipboard-copy";
import { editor } from "monaco-editor";
import {
  ActionContext,
  ActionGroupDefinition,
  CommonActionId,
  PlatformIcon,
  useCreateDefaultActionGroup,
} from "@intellij-platform/core";
import { notNull } from "@intellij-platform/core/utils/array-utils";

import { notImplemented } from "../Project/notImplemented";
import { AppActionIds } from "../appActionIds";
import { editorActionIds } from "./editorActionIds";

export function useEditorActionGroup(
  editorRef: MutableRefObject<editor.ICodeEditor | undefined>
): ActionGroupDefinition {
  const createDefaultActionGroup = useCreateDefaultActionGroup();
  const editor = editorRef.current;
  const selection = editor?.getSelection();

  const selectedText = selection // FIXME: needs to become reactive
    ? editor?.getModel()?.getValueInRange(selection)
    : "";

  return createDefaultActionGroup({
    id: "EditorPopupMenu",
    title: "Editor Popup Menu",
    description: "Editor Popup Menu",
    children: (
      [
        createDefaultActionGroup({
          id: "ShowIntentionsGroup",
          title: "Show Intentions Group",
          isSearchable: false,
          menuPresentation: "section",
          children: [
            {
              id: "ShowIntentionActions",
              title: "Show Context Actions",
              icon: <PlatformIcon icon="actions/intentionBulbGrey.svg" />,
              actionPerformed: () => {
                notImplemented();
              },
            },
          ],
        }),
        selectedText
          ? {
              id: CommonActionId.COPY,
              title: "Copy",
              icon: <PlatformIcon icon="actions/copy" />,
              actionPerformed: () => {
                const selection = editor?.getSelection();
                const selectedText = selection
                  ? editor?.getModel()?.getValueInRange(selection)
                  : "";
                if (selectedText) {
                  copyToClipboard(selectedText);
                }
              },
            }
          : null,
        {
          id: CommonActionId.PASTE,
          title: "Paste",
          icon: <PlatformIcon icon="actions/menu-paste" />,
          actionPerformed: () => {
            // Note: There doesn't seem to be a way to trigger the default paste action
            // (without prompting for clipboard API), from a menu UI.
            // So, selecting "Paste" menu item will ask for clipboard permission, and
            // that's the same in the default Monaco context menu as well.
            // The difference here is that pasting with ctrl+V works without permission
            // by default, but because we are handling ctrl+V through the keymap,
            // even pasting by the shortcut will require permission now.
            editor?.focus();
            editor?.trigger(
              "keyboard",
              "editor.action.clipboardPasteAction",
              {}
            );
          },
        },
        createDefaultActionGroup({
          id: "Copy.Paste.Special",
          title: "Copy / Paste Special",
          description: "Copy / Paste Special Editor Actions",
          menuPresentation: "submenu",
          children: [
            {
              id: CommonActionId.COPY_REFERENCE,
              title: "Copy Reference",
              description:
                "Copy reference to selected class, method or function, or a relative path to selected file",
              actionPerformed: () => {
                notImplemented();
              },
            },
            {
              // TODO: this action should be scoped to the entire app.
              //  move it when referencing actions in groups is possible
              id: AppActionIds.PASTE_MULTIPLE,
              title: "Paste from history",
              description: "Paste from recent clipboards",
              actionPerformed: () => {
                notImplemented();
              },
            },
          ],
        }),
        "divider",
        createDefaultActionGroup({
          id: "FoldingGroup",
          title: "Folding",
          menuPresentation: "submenu",
          children: [
            {
              id: editorActionIds.EXPAND_REGION,
              title: "Expand",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.unfold",
                  {}
                );
              },
            },
            {
              id: editorActionIds.EXPAND_REGION_RECURSIVELY,
              title: "Expand Recursively",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.unfoldRecursively",
                  {}
                );
              },
            },
            {
              id: editorActionIds.EXPAND_ALL_REGIONS,
              title: "Expand All",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.unfoldAll",
                  {}
                );
              },
            },
            "divider",
            {
              id: editorActionIds.COLLAPSE_REGION,
              title: "Collapse",
              actionPerformed: (context) => {
                editorRef.current?.trigger(source(context), "editor.fold", {});
              },
            },
            {
              id: editorActionIds.COLLAPSE_REGION_RECURSIVELY,
              title: "Collapse Recursively",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.foldRecursively",
                  {}
                );
              },
            },
            {
              id: editorActionIds.COLLAPSE_ALL_REGIONS,
              title: "Collapse All",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.foldAll",
                  {}
                );
              },
            },
            "divider",
            createDefaultActionGroup({
              id: editorActionIds.EXPAND_ALL_TO_LEVEL,
              title: "Expand all to level",
              menuPresentation: "submenu",
              children: ([1, 2, 3, 4, 5] as const).map((level) => ({
                id: editorActionIds[`EXPAND_ALL_TO_LEVEL${level}`],
                title: `${level}`,
                actionPerformed: (context) => {
                  editorRef.current?.trigger(
                    source(context),
                    `editor.foldLevel${level}`,
                    {}
                  );
                },
              })),
            }),
            "divider",
            {
              id: editorActionIds.COLLAPSE_DOC_COMMENTS,
              title: "Collapse Doc Comments",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.foldAllBlockComments",
                  {}
                );
              },
            },
            "divider",
            {
              id: editorActionIds.TOGGLE_FOLDING,
              title: "Toggle Folding",
              actionPerformed: (context) => {
                editorRef.current?.trigger(
                  source(context),
                  "editor.toggleFold",
                  {}
                );
              },
            },
          ],
        }),
        createDefaultActionGroup({
          id: "EditorLangPopupMenu",
          title: "EditorLangPopupMenu",
          menuPresentation: "section",
          children: [
            {
              id: AppActionIds.GENERATE,
              title: "Generate...",
              actionPerformed: () => {
                notImplemented();
              },
            },
          ],
        }),
        "divider",
        {
          id: editorActionIds.CompareClipboardWithSelection,
          title: "Compare with Clipboard",
          description: "Compare current selection with clipboard",
          icon: <PlatformIcon icon="actions/diffWithClipboard.svg" />,
          actionPerformed: () => {
            notImplemented();
          },
        },
      ] as const
    ).filter(notNull),
  });
}

function source(context: ActionContext): "keyboard" | "mouse" | "" {
  if (!context.event) {
    return "";
  }
  return context.event?.type?.includes("key") ? "keyboard" : "mouse";
}
