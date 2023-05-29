import { BalloonManagerAPI, Link } from "@intellij-platform/core";
import React from "react";

/**
 * For ease of use, and to make notImplemented a simple function, not a hook, we set balloon manager in Project.
 * It's intentionally kept in a separate file, to avoid circular dependency caused by many components importing
 * Project.tsx
 */
export const _balloonManagerRef: { value: null | BalloonManagerAPI } = {
  value: null,
};
export function notImplemented() {
  _balloonManagerRef.value?.show({
    icon: "Warning",
    title: "Unimplemented action",
    body: "This action is not implemented yet.",
    actions: (
      <>
        <Link
          /* TODO: Open a documentation about why some actions are not implemented. */
          onPress={notImplemented}
        >
          Read more...
        </Link>
      </>
    ),
  });
}
