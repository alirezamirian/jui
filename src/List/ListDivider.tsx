import React from "react";
import { StyledVerticalSeparator } from "../StyledSeparator";
import { useSeparator } from "@react-aria/separator";

export const ListDivider: React.FC = () => {
  return (
    <StyledVerticalSeparator
      as={"li"}
      {...useSeparator({ orientation: "vertical" })}
    />
  );
};
