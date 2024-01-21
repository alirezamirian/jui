import React from "react";

import { defaultKeymap, shortcutToString } from "@intellij-platform/core";

/**
 * Shows the default shortcut for a given action id.
 */
export const DefaultShortcut = ({ actionId }: { actionId: string }) => {
  return <code>{shortcutToString(defaultKeymap[actionId][0])}</code>;
};
