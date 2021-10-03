import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilState,
  useSetRecoilState,
} from "recoil";

interface EditorTabState {
  cursorPos: { lineNumber: number; column: number };
  filePath: string;
}

// it should become something under "project" state later.
const editorTabsState = atom<EditorTabState[]>({
  key: "editor.tabs",
  default: [],
});

const activeEditorTabIndexState = atom<number>({
  key: "editor.activeTabIndex",
  default: 0,
});

export const activeEditorTabState = selector({
  key: "editor.activeTab",
  get: ({ get }) => get(editorTabsState)[get(activeEditorTabIndexState)],
});

type Focusable = { focus: () => void };

/**
 * could be a global variable also, since there is no re-rendering need for it. It's kept as an atom, just to avoid
 * global variable and its issues.
 */
export const focusableEditorState = atom<null | Focusable>({
  key: "editor.focusHandle",
  default: null,
});

export interface EditorStateManager {
  tabs: EditorTabState[];
  openPath(filePath: string, focus?: boolean): void;
  closePath(path: string): void;
  closeTab(index: number): void;
  select(index: number): void;
}

export const useEditorStateManager = (): EditorStateManager => {
  const [tabsState, setTabsState] = useRecoilState(editorTabsState);
  const setActiveTabIndex = useSetRecoilState(activeEditorTabIndexState);
  const focus = useRecoilCallback(
    ({ snapshot }) => () => {
      snapshot.getLoadable(focusableEditorState).valueOrThrow()?.focus();
    },
    []
  );

  const select = (index: number) => {
    setActiveTabIndex(index);
  };
  const closePath = (filePath: string) => {
    const index = tabsState.findIndex((tab) => tab.filePath === filePath);
    if (index > -1) {
      closeTab(index);
    }
  };
  const openPath = (filePath: string, shouldFocus = true) => {
    const index = tabsState.findIndex((tab) => tab.filePath === filePath);
    if (index > -1) {
      select(index);
    } else {
      const newIndex = tabsState.length;
      setTabsState((currentState) => [
        ...currentState,
        {
          filePath,
          cursorPos: { lineNumber: 0, column: 0 }, // no persistence of cursor position for now.
        },
      ]);
      select(newIndex);
    }
    if (shouldFocus) {
      focus();
    }
  };
  const closeTab = (index: number) => {
    setTabsState((tabsState) =>
      tabsState.filter((_, tabIndex) => tabIndex !== index)
    );
  };
  return {
    tabs: tabsState,
    // This should become an action. Something like "open project file", when action system is implemented.
    openPath,
    closePath,
    closeTab,
    select,
  };
};
