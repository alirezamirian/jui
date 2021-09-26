import React, { SuspenseProps } from "react";
import { LoadingGif } from "./LoadingGif";

export const DefaultSuspense: React.FC<Partial<SuspenseProps>> = ({
  fallback = <LoadingGif />,
  children,
}) => <React.Suspense fallback={fallback}>{children}</React.Suspense>;
