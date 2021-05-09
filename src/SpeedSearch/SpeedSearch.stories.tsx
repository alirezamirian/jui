import React, { useMemo, useState } from "react";
import { Meta } from "@storybook/react";
import { SpeedSearch } from "./SpeedSearch";
import { minusculeMatch } from "../minusculeMatch";
import { TextWithHighlights } from "../TextWithHighlights/TextWithHighlights";
import { styled } from "../styled";

export default {
  title: "SpeedSearch",
  component: SpeedSearch,
} as Meta;

const SpeedSearchContainer = styled(SpeedSearch)`
  width: 400px;
  background: ${({ theme }) => theme.color("Panel.background")};
  color: ${({ theme }) => theme.color("*.textForeground")};
`;
export const Default = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SpeedSearchContainer
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      stickySearch
    >
      <ul>
        <li>
          <SearchableText searchTerm={searchTerm}>Item one.</SearchableText>
        </li>
        <li>
          <SearchableText searchTerm={searchTerm}>Item two.</SearchableText>{" "}
          <input />
        </li>
        <li>
          <SearchableText searchTerm={searchTerm}>Paco de lucia</SearchableText>{" "}
          <button>test</button>
        </li>
        <li>
          <SearchableText searchTerm={searchTerm}>
            Paco de lucia, godOfTheGuitar
          </SearchableText>{" "}
          <button>test</button>
        </li>
        <li>
          <input type="checkbox" />
          <SearchableText searchTerm={searchTerm}>Item four</SearchableText>
        </li>
      </ul>
    </SpeedSearchContainer>
  );
};

function SearchableText({
  children,
  searchTerm,
}: {
  children: string;
  searchTerm: string;
}) {
  const highlights = useMemo(() => minusculeMatch(children, searchTerm), [
    children,
    searchTerm,
  ]);
  return (
    <TextWithHighlights highlights={highlights}>{children}</TextWithHighlights>
  );
}

Default.args = {};
