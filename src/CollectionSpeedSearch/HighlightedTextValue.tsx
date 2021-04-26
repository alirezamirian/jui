import React, { ComponentProps, useContext } from "react";
import { TextWithHighlights } from "../TextWithHighlights/TextWithHighlights";

export const HighlightedTextValueContext = React.createContext<React.ReactElement<
  ComponentProps<typeof TextWithHighlights>,
  typeof TextWithHighlights
> | null>(null);

export const HighlightedTextValue = () => {
  return useContext(HighlightedTextValueContext);
};
