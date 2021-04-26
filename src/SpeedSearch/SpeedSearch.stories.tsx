import React, { useMemo, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { SpeedSearch } from "./SpeedSearch";
import { minusculeMatch } from "../minusculeMatch";
import { TextWithHighlights } from "../TextWithHighlights/TextWithHighlights";
import { useSpeedSearchState } from "./useSpeedSearch";

export default {
  title: "SpeedSearch",
  component: SpeedSearch,
} as Meta;

export const Default = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SpeedSearch
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      stickySearch
      containerProps={{
        style: { background: "#3b3f41", color: "#bbb", width: 400 },
      }}
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
    </SpeedSearch>
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
