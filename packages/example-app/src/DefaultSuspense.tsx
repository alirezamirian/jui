import React, { SuspenseProps } from "react";
import styled from "styled-components";
import { LoadingGif } from "./LoadingGif";

const Loading = styled(LoadingGif)`
  width: fit-content;
  margin: auto;
`;
export const DefaultSuspense: React.FC<Partial<SuspenseProps>> = ({
  fallback = <Loading />,
  children,
}) => <React.Suspense fallback={fallback}>{children}</React.Suspense>;
