import React, { ReactNode, useEffect, useState } from "react";

const DEFAULT_LOADING_DELAY_MS = 500; // To be shared later in more places.
export function Delayed({ children }: { children: ReactNode }) {
  const [waitedEnough, setWaitedEnough] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitedEnough(true);
    }, DEFAULT_LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);
  if (waitedEnough) {
    return <>{children}</>;
  }
  return null;
}
