import React, { useContext } from "react";

export const HighlightedTextValueContext = React.createContext<JSX.Element | null>(
  null
);

export const HighlightedTextValue = () => {
  return useContext(HighlightedTextValueContext);
};
