import React, { useMemo, useState } from "react";
import { Meta } from "@storybook/react";
import { SpeedSearch } from "./SpeedSearch";
import { minusculeMatch } from "../minusculeMatch";
import { TextWithHighlights } from "../TextWithHighlights/TextWithHighlights";
import { styled } from "../styled";

export default {
  title: "Components/SpeedSearch",
  component: SpeedSearch,
} as Meta;

const SpeedSearchContainer = styled(SpeedSearch)`
  width: 400px;
  margin-top: 25px;
  background: ${({ theme }) => theme.commonColors.panelBackground};
  color: ${({ theme }) => theme.color("*.textForeground")};
`;
export const Default = ({
  onSearchTermChange,
  onActiveChange,
}: {
  onSearchTermChange?: (searchTerm: string) => void;
  onActiveChange?: (active: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);

  return (
    <SpeedSearchContainer
      searchTerm={searchTerm}
      onSearchTermChange={(searchTerm) => {
        setSearchTerm(searchTerm);
        onSearchTermChange?.(searchTerm);
      }}
      active={active}
      onActiveChange={(active) => {
        setActive(active);
        onActiveChange?.(active);
      }}
      match // search is done within the searchable text component in this dummy example, and we don't have information about match.
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
