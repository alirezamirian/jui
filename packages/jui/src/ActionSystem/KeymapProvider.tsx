import React, { useContext } from "react";
import { Shortcut } from "./Shortcut";
import { defaultKeymap } from "./defaultKeymap";

export interface Keymap {
  [actionId: string]: ReadonlyArray<Shortcut>;
}

export const KeymapContext = React.createContext<Keymap | null>(defaultKeymap);

export const KeymapProvider: React.FC<{
  keymap: Keymap;
  children?: React.ReactNode;
}> = ({ keymap: keymapProp, children }) => {
  const parentKeyMap = useContext(KeymapContext);
  const keymap = Object.assign(Object.create(parentKeyMap), keymapProp);
  return (
    <KeymapContext.Provider value={keymap}>{children}</KeymapContext.Provider>
  );
};

export const useKeymap = () => useContext(KeymapContext);
