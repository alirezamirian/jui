import React from "react";
import { StyledVerticalDivider } from "../StyledDivider";
import { useSeparator } from "@react-aria/separator";

export const ListDivider: React.FC = () => {
  return (
    <StyledVerticalDivider
      as={"li"}
      {...useSeparator({ orientation: "vertical" })}
    />
  );
};
