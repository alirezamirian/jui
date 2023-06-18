import { useEventCallback } from "@intellij-platform/core/utils/useEventCallback";
import React, { useEffect } from "react";

/**
 * A workaround for an issue in measuring overlay size, caused by a limitation/bug in how React 17 runs effects when
 * children suspend rendering: https://github.com/facebook/react/issues/21510
 *
 * Here is a simplified demonstration of the issue:
 * Expected behavior (React 18): https://codesandbox.io/s/parent-effects-suspense-v18-38m8p7?file=/src/App.tsx
 * Broken behavior (React 17): https://codesandbox.io/s/parent-effects-suspense-v17-h39g4g
 *
 * The overlay content size measuring runs in an effect, and that effect won't run when the content is rendered after
 * suspense.
 */
export function UNSAFE_React17SuspenseFix({
  measureContentSize,
  children,
}: {
  measureContentSize: () => void;
  children: React.ReactNode;
}) {
  if (React.version.startsWith("17")) {
    return (
      <React.Suspense
        fallback={
          <NullSuspenseFallback afterUnsuspended={measureContentSize} />
        }
      >
        {children}
      </React.Suspense>
    );
  }
  return <>{children}</>;
}

function NullSuspenseFallback({
  afterSuspended: afterSuspendedProp = () => {},
  afterUnsuspended: afterUnsuspendedProp = () => {},
}: {
  afterUnsuspended?: () => void;
  afterSuspended?: () => void;
}) {
  const afterSuspended = useEventCallback(afterSuspendedProp);
  const afterUnsuspended = useEventCallback(afterUnsuspendedProp);
  useEffect(() => {
    afterSuspended?.();
    return () => {
      afterUnsuspended?.();
    };
  }, []);
  return null;
}
