import styled from "@emotion/styled";
import React from "react";
import { getAllRanges, TextRange } from "../TextRange";

const HighlightedMatch = styled.span`
  background: linear-gradient(#b3ab7a, #b69829);
  color: #000;
  border-radius: 3px;
`;

export function TextWithHighlights({
  children,
  highlights,
}: {
  children: string;
  highlights: TextRange[] | null;
}): React.ReactElement {
  const parts: Array<[TextRange, boolean]> = highlights
    ? getAllRanges(highlights, children.length)
    : [[{ from: 0, to: children.length }, false]];
  return (
    <>
      {parts.map(([{ from, to }, highlighted]) => {
        const text = children.slice(from, to + 1);
        return (
          <React.Fragment>
            {highlighted ? <HighlightedMatch>{text}</HighlightedMatch> : text}
          </React.Fragment>
        );
      })}
    </>
  );
}
