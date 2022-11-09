import React, { useContext } from "react";
import { Shortcut } from "@intellij-platform/core/ActionSystem/Shortcut";
import { defaultKeymap } from "@intellij-platform/core/ActionSystem/defaultKeymap";

export interface Keymap {
  [actionId: string]: ReadonlyArray<Shortcut>;
}

export const KeymapContext = React.createContext<Keymap | null>(defaultKeymap);

export const KeymapProvider: React.FC<{ keymap: Keymap }> = ({
  keymap: keymapProp,
  children,
}) => {
  const parentKeyMap = useContext(KeymapContext);
  const keymap = Object.assign(Object.create(parentKeyMap), keymapProp);
  return (
    <KeymapContext.Provider value={keymap}>{children}</KeymapContext.Provider>
  );
};

export const useKeymap = () => useContext(KeymapContext);
