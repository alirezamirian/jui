import { atom, CallbackInterface, selector, useRecoilValue } from "recoil";
import { descend, sortWith } from "ramda";
import { Position } from "monaco-editor";

import {
  currentProjectFilesState,
  projectFilePath,
} from "../Project/project.state";
import { Focusable } from "../common-types";

interface TextEditorState {
  cursorPos: { lineNumber: number; column: number };
}
type EditorState = TextEditorState;

export interface EditorTabState {
  editorState: EditorState;
  filePath: string;
}

// in order to showcase tabs behaviour when many tabs are open. Later on, it should be based on persisted project
// settings.
const temporaryTabsDefaultValue = selector({
  key: "editor.tabs/Default",
  get: ({ get }) =>
    sortWith(
      [
        // first README.md, then ts and js files.
        descend((file) => file.path === get(projectFilePath("README.md"))),
        descend((file) => file.path.endsWith(".ts")),
        descend((file) => file.path.endsWith(".js")),
      ],
      get(currentProjectFilesState).filter((item) => item.type === "file")
    )
      .slice(0, 12)
      // map project file to editor state object
      .map((file) => ({
        filePath: file.path,
        editorState: { cursorPos: { lineNumber: 0, column: 0 } },
      })),
});

// it should become something under "project" state later.
export const editorTabsState = atom<ReadonlyArray<EditorTabState>>({
  key: "editor.tabs",
  default: [],
  effects: [
    ({ getPromise, setSelf, trigger }) => {
      // an effect is used to set the intial value instead of using the selector directly in default value,
      // because otherwise the atom will be linked to the selector (and dynamically updated) until the state is set
      // which can lead to inconsistent behavior based on whether anything in tabs state is changed or not.
      if (trigger === "get") {
        getPromise(temporaryTabsDefaultValue).then((tabs) => setSelf(tabs));
      }
    },
  ],
});

const activeEditorTabIndexState = atom<number>({
  key: "editor.activeTabIndex",
  default: 0,
});

export const activeEditorTabState = selector<EditorTabState | null>({
  key: "editor.activeTab",
  get: ({ get }) => {
    const tabs = get(editorTabsState);
    return tabs[get(activeEditorTabIndexState)] || tabs[0] || null;
  },
});

export const editorCursorPositionState = atom<Position>({
  key: "editor.cursorPosition",
  default: new Position(0, 0),
});

/**
 * could be a global variable also, since there is no re-rendering need for it. It's kept as an atom, just to avoid
 * global variable and its issues.
 */
export const editorRefState = atom<null | Focusable>({
  key: "editor.focusHandle",
  default: null,
});

export interface EditorStateManager {
  openPath(filePath: string, focus?: boolean): void;
  closePath(path: string): void;
  closeOtherTabs(index: number): void;
  closeTab(index: number): void;
  select(index: number): void;
  focus(): void;
}

const openPathCallback =
  ({ snapshot, set }: CallbackInterface) =>
  (filePath: string, shouldFocus = true) => {
    const tabsState = snapshot.getLoadable(editorTabsState).getValue();
    const index = tabsState.findIndex((tab) => tab.filePath === filePath);
    const select = (index: number) => {
      set(activeEditorTabIndexState, index);
    };
    const focus = () => {
      snapshot.getLoadable(editorRefState).valueOrThrow()?.focus();
    };
    if (index > -1) {
      select(index);
    } else {
      const newIndex = tabsState.length;
      set(editorTabsState, (currentState) => [
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

const closeCallback =
  ({ set }: CallbackInterface) =>
  (index: number) =>
    set(editorTabsState, (tabsState) =>
      tabsState.filter((_, tabIndex) => tabIndex !== index)
    );

const closePathCallback =
  (callbackInterface: CallbackInterface) => (filePath: string) => {
    const { set, snapshot, transact_UNSTABLE } = callbackInterface;
    const close = closeCallback(callbackInterface);
    const index = snapshot
      .getLoadable(editorTabsState)
      .getValue()
      .findIndex((tab) => tab.filePath === filePath);
    if (index > -1) {
      transact_UNSTABLE(() => {
        close(index);
        set(activeEditorTabIndexState, Math.max(index - 1, 0));
      });
    }
  };

const closeOtherTabsCallback =
  ({ set }: CallbackInterface) =>
  (index: number) => {
    set(editorTabsState, (tabsState) =>
      tabsState.filter((_, tabIndex) => tabIndex === index)
    );
  };
const select =
  ({ set, snapshot }: CallbackInterface) =>
  (index: number) => {
    const numTabs = snapshot.getLoadable(editorTabsState).getValue().length;
    if (index >= 0 && index < numTabs) {
      set(activeEditorTabIndexState, index);
    }
  };

const focus =
  ({ snapshot }: CallbackInterface) =>
  () => {
    snapshot.getLoadable(editorRefState).valueOrThrow()?.focus();
  };

export const editorManagerState = selector<Omit<EditorStateManager, "tabs">>({
  key: "editor.manager",
  get: ({ getCallback }) => {
    return {
      // TODO: create an action for opening in editor (jump to source)
      openPath: getCallback(openPathCallback),
      closeTab: getCallback(closeCallback),
      closePath: getCallback(closePathCallback),
      closeOtherTabs: getCallback(closeOtherTabsCallback),
      select: getCallback(select),
      focus: getCallback(focus),
    };
  },
});

/**
 * Gives access to editor state manager, in React components. returns a stable editor manager object,
 * that won't cause re-rendering based on editor state changes.
 */
export const useEditorStateManager = (): EditorStateManager =>
  useRecoilValue(editorManagerState);

/**
 * Gives access to editor state and also the manager, as a tuple, analogous to how useState returns
 * a tuple for the state and the setter. Only the setter is an interface.
 */
export const useEditorState = () => {
  return [
    useRecoilValue(editorTabsState),
    useRecoilValue(editorManagerState),
  ] as const;
};
