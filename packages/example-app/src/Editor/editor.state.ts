import { atom, selector, useRecoilState } from "recoil";

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

export const useEditor = () => {
  const [tabsState, setTabsState] = useRecoilState(editorTabsState);

  return {
    tabs: tabsState,
    // This should become an action. Something like "open project file", when action system is implemented.
    openPath: (filePath: string) => {
      // for now we just replace the first tab, until editor tabs are implemented.
      setTabsState([
        {
          filePath,
          cursorPos: { lineNumber: 0, column: 0 }, // no persistence of cursor position for now.
        },
      ]);
    },
  };
};
