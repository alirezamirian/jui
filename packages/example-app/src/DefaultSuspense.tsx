import React, { SuspenseProps } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "@intellij-platform/core";

const Loading = styled(LoadingSpinner)`
  width: fit-content;
  display: block;
  margin: auto;
`;
export const DefaultSuspense: React.FC<Partial<SuspenseProps>> = ({
  fallback = <Loading />,
  children,
}) => <React.Suspense fallback={fallback}>{children}</React.Suspense>;
