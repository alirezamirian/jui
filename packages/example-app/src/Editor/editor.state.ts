import { atom, Getter, Setter, useAtomValue } from "jotai";
import { withAtomEffect } from "jotai-effect";
import { descend, sortWith } from "ramda";
import { Position } from "monaco-editor";

import {
  currentProjectFilesAtom,
  projectFilePath,
} from "../Project/project.state";
import { Focusable } from "../common-types";
import { atomWithGetCallback } from "../atom-utils/atomWithGetCallback";

interface TextEditorState {
  cursorPos: { lineNumber: number; column: number };
}
type EditorState = TextEditorState;

export interface EditorTabState {
  editorState: EditorState;
  filePath: string;
}

// it should become something under "project" state later.
export const editorTabsAtom = withAtomEffect(
  atom<ReadonlyArray<EditorTabState>>([]),
  (get, set) => {
    // in order to showcase tabs behaviour when many tabs are open. Later on, it should be based on persisted project
    // settings.
    // an effect is used to set the intial value instead of using the selector directly in default value,
    // because otherwise the atom will be linked to the selector (and dynamically updated) until the state is set
    // which can lead to inconsistent behavior based on whether anything in tabs state is changed or not.
    get.peek(currentProjectFilesAtom).then((currentProjectFiles) => {
      set(
        editorTabsAtom,
        sortWith(
          [
            // first README.md, then ts and js files.
            descend((file) => file.path === get(projectFilePath("README.md"))),
            descend((file) => file.path.endsWith(".ts")),
            descend((file) => file.path.endsWith(".js")),
          ],
          currentProjectFiles.filter((item) => item.type === "file")
        )
          .filter((file) => !file.path.includes(".idea"))
          .slice(0, 12)
          // map project file to editor state object
          .map((file) => ({
            filePath: file.path,
            editorState: { cursorPos: { lineNumber: 0, column: 0 } },
          }))
      );
    });
  }
);

const activeEditorTabIndexState = atom<number>(0);

export const activeEditorTabAtom = atom<EditorTabState | null>((get) => {
  const tabs = get(editorTabsAtom);
  return tabs[get(activeEditorTabIndexState)] || tabs[0] || null;
});

export const editorCursorPositionState = atom<Position>(new Position(0, 0));

/**
 * could be a global variable also, since there is no re-rendering need for it. It's kept as an atom, just to avoid
 * global variable and its issues.
 */
export const editorRefAtom = atom<null | Focusable>(null);

export interface EditorStateManager {
  openPath(filePath: string, focus?: boolean): void;
  closePath(path: string): void;
  closeOtherTabs(index: number): void;
  closeTab(index: number): void;
  select(index: number): void;
  focus(): void;
}

const openPathCallback = (
  get: Getter,
  set: Setter,
  filePath: string,
  shouldFocus = true
) => {
  const tabsState = get(editorTabsAtom);
  const index = tabsState.findIndex((tab) => tab.filePath === filePath);
  const select = (index: number) => {
    set(activeEditorTabIndexState, index);
  };
  const focus = () => {
    get(editorRefAtom)?.focus();
  };
  if (index > -1) {
    select(index);
  } else {
    const newIndex = tabsState.length;
    set(editorTabsAtom, (currentState) => [
      ...currentState,
      {
        filePath,
        editorState: { cursorPos: { lineNumber: 0, column: 0 } }, // no persistence of cursor position for now.
      },
    ]);
    select(newIndex);
  }
  if (shouldFocus) {
    // Without setTimeout editor gets focused immediately and "Enter" key press (if openPath is called in a keyboard
    // event handler) is picked up by editor, adding unwanted new line.
    setTimeout(focus);
  }
};

const closeCallback = (_get: Getter, set: Setter, index: number) =>
  set(editorTabsAtom, (tabsState) =>
    tabsState.filter((_, tabIndex) => tabIndex !== index)
  );

const closePathCallback = (get: Getter, set: Setter, filePath: string) => {
  const index = get(editorTabsAtom).findIndex(
    (tab) => tab.filePath === filePath
  );
  if (index > -1) {
    closeCallback(get, set, index);
    set(activeEditorTabIndexState, Math.max(index - 1, 0));
  }
};

const closeOtherTabsCallback = (get: Getter, set: Setter, index: number) => {
  set(editorTabsAtom, (tabsState) =>
    tabsState.filter((_, tabIndex) => tabIndex === index)
  );
};

const selectTabCallback = (get: Getter, set: Setter, index: number) => {
  const numTabs = get(editorTabsAtom).length;
  if (index >= 0 && index < numTabs) {
    set(activeEditorTabIndexState, index);
  }
};

const focusTabCallback = (get: Getter, set: Setter) => {
  get(editorRefAtom)?.focus();
};

export const editorManagerAtom = atomWithGetCallback(
  (_get, { getCallback }): EditorStateManager => {
    // TODO: create an action for opening in editor (jump to source)
    return {
      openPath: getCallback(openPathCallback),
      closeTab: getCallback(closeCallback),
      select: getCallback(selectTabCallback),
      focus: getCallback(focusTabCallback),
      closeOtherTabs: getCallback(closeOtherTabsCallback),
      closePath: getCallback(closePathCallback),
    };
  }
);

/**
 * Gives access to editor state manager, in React components. returns a stable editor manager object,
 * that won't cause re-rendering based on editor state changes.
 */
export const useEditorStateManager = (): EditorStateManager =>
  useAtomValue(editorManagerAtom);

/**
 * Gives access to editor state and also the manager, as a tuple, analogous to how useState returns
 * a tuple for the state and the setter. Only the setter is an interface.
 */
export const useEditorState = (): readonly [
  readonly EditorTabState[],
  EditorStateManager
] => {
  return [
    useAtomValue(editorTabsAtom),
    useAtomValue(editorManagerAtom),
  ] as const;
};
