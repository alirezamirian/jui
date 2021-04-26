import React, { ComponentProps, useContext } from "react";
import { TextWithHighlights } from "../../TextWithHighlights/TextWithHighlights";

export const HighlightedTextValueContext = React.createContext<JSX.Element | null>(
  null
);

export const HighlightedTextValue = () => {
  return useContext(HighlightedTextValueContext);
};
