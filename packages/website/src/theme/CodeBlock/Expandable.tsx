import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  position: absolute;
  width: 24px;
  left: 50%;
  bottom: 1rem;
  transform: translate(-50%, 0) rotate(180deg);
`;

const StyledExpandButton = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1), transparent);
  cursor: pointer;
  ${StyledSvg} {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover ${StyledSvg} {
    opacity: 1;
  }
`;
const StyledContainer = styled.div<{ expanded: boolean }>`
  position: relative;
  max-height: ${({ expanded }) => (expanded ? undefined : "200px")};
`;

export function Expandable({
  children,
  expanded,
  onExpand,
  isExpandable,
  setIsExpandable,
}: {
  children: React.ReactNode;
  expanded: boolean;
  onExpand: () => void;
  isExpandable: boolean;
  setIsExpandable: (isExpandable: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const expandable = ref.current?.scrollHeight > ref.current?.offsetHeight;
      if (expandable !== isExpandable) {
        setIsExpandable(expandable);
      }
    }
  });
  return (
    <StyledContainer ref={ref} expanded={expanded}>
      {children}
      {!expanded && isExpandable && (
        <StyledExpandButton onClick={onExpand}>
          <StyledSvg viewBox="0 0 50 50">
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M-20 10 0-10l20 20"
              transform="translate(25 25)"
            />
          </StyledSvg>
        </StyledExpandButton>
      )}
    </StyledContainer>
  );
}
