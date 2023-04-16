import React from "react";
import { useKeymap } from "./KeymapProvider";
import { shortcutToString } from "./shortcutToString";

/**
 * Renders the first keyboard shortcut for the action specified by {@param actionId}, based on the keymap context.
 * if {@param children} is provided, treats it as a render function that receives the shortcut string.
 */
export const ActionShortcut = ({
  actionId,
  children,
}: {
  actionId: string;
  children?: (shortcut: string) => React.ReactNode;
}) => {
  const getShortcut = useGetActionShortcut();
  const shortcutString = getShortcut(actionId);
  return (
    <>
      {shortcutString && (children ? children(shortcutString) : shortcutString)}
    </>
  );
};

/**
 * Returns a function that gets first keyboard shortcut for the action specified by `actionId`, based on the
 * keymap context.
 */
export const useGetActionShortcut = (): ((actionId: string) => string) => {
  const keymap = useKeymap();
  return (actionId: string) => {
    const keyboardShortcut = keymap?.[actionId]?.find(
      ({ type }) => type === "keyboard"
    );
    return keyboardShortcut ? shortcutToString(keyboardShortcut) : "";
  };
};
