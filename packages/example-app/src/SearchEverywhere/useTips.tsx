import { useMemo, useState } from "react";
import {
  CommonActionId,
  shortcutToString,
  useKeymap,
} from "@intellij-platform/core";

const tips = [
  {
    actionId: CommonActionId.EXPAND_SELECTION,
    title: "Press $shortcut to expand selection",
  },
  {
    actionId: CommonActionId.SHRINK_SELECTION,
    title: "Press $shortcut to shrink selection",
  },
];

export const useTips = () => {
  const keymap = useKeymap();

  const renderedTips = useMemo(
    () =>
      tips
        .map(({ actionId, title }) => ({
          keyboardShortcut: keymap?.[actionId]?.find(
            (shortcut) => shortcut.type === "keyboard"
          ),
          title,
        }))
        .filter(({ keyboardShortcut }) => keyboardShortcut)
        .map(({ keyboardShortcut, title }) =>
          title.replace("$shortcut", shortcutToString(keyboardShortcut!))
        ),
    [keymap]
  );
  const [index, setIndex] = useState(
    Math.floor(Math.random() * renderedTips.length)
  );
  return {
    current: renderedTips[index],
    next: () => {
      const tmpIndex = Math.floor(Math.random() * (renderedTips.length - 1));
      const newIndex = tmpIndex < index ? tmpIndex : tmpIndex + 1; // making sure index will be changed
      console.log("changing index to", newIndex, "tmpIndex", tmpIndex);
      setIndex(newIndex);
    },
  };
};
