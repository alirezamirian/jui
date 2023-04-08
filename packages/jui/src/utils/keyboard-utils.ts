import React from "react";
import { isMac } from "@react-aria/utils";

/**
 * TODO: The current name is not accurate, and can be confusing. Rename to something better.
 */
export function isCtrlKeyPressed(
  e: { metaKey: boolean; ctrlKey: boolean } | undefined
) {
  if (isMac()) {
    return e?.metaKey;
  }

  return e?.ctrlKey;
}

export function hasAnyModifier(e: KeyboardEvent | React.KeyboardEvent) {
  return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
}
