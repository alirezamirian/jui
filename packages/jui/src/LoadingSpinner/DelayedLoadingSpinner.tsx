import React, { ReactNode, useEffect, useState } from "react";
import {
  LoadingSpinner,
  LoadingSpinnerProps,
} from "@intellij-platform/core/LoadingSpinner/LoadingSpinner";

export interface DelayedLoadingSpinnerProps extends LoadingSpinnerProps {
  /**
   * delay for showing the loading spinner in ms.
   * @default {@link DEFAULT_LOADING_DELAY_MS}
   */
  delay?: number;
}

export const DEFAULT_LOADING_DELAY_MS = 300;

/**
 * {@link LoadingSpinner}, delayed
 */
export function DelayedLoadingSpinner({
  delay = DEFAULT_LOADING_DELAY_MS,
  ...props
}: DelayedLoadingSpinnerProps) {
  return (
    <Delayed delay={delay}>
      <LoadingSpinner {...props} />
    </Delayed>
  );
}

/**
 * Renders children with a delay
 */
function Delayed({ children, delay }: { children: ReactNode; delay: number }) {
  const [waitedEnough, setWaitedEnough] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitedEnough(true);
    }, delay); // the effect is intentionally made non-reactive to delay,
    // since it doesn't make sense to start the wait from scratch if delay changes after the children
    // is already rendered.
    return () => clearTimeout(timer);
  }, []);
  if (waitedEnough) {
    return <>{children}</>;
  }
  return null;
}
