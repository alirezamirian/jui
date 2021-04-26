import React, { useContext } from "react";

export const HighlightedTextValueContext = React.createContext<React.ReactNode>(
  null
);

export const HighlightedTextValue: React.FC = () => {
  return <>{useContext(HighlightedTextValueContext)}</>;
};
