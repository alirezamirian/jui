import { Anchor } from "./utils";
import React, { useMemo, useState } from "react";
import { ToolWindowStripeButton } from "./ToolWindowStripeButton";
import { StyledSpacer, StyledToolWindowStripe } from "./StyledToolWindowStripe";

type StripeButtons =
  | React.ReactComponentElement<typeof ToolWindowStripeButton>
  | React.ReactComponentElement<typeof ToolWindowStripeButton>[];

interface ToolWindowStripeProps {
  anchor: Anchor;
  children: StripeButtons;
  split?: StripeButtons;
}

export const ToolWindowStripeContext = React.createContext<{
  anchor: Anchor;
} | null>(null);

export function ToolWindowStripe({
  anchor,
  children,
  split,
}: ToolWindowStripeProps) {
  const contextValue = useMemo(() => ({ anchor: anchor }), [anchor]);
  const [canDrop, setCanDrop] = useState(false);
  return (
    <StyledToolWindowStripe
      anchor={anchor}
      acceptsDrop={canDrop}
      onClick={() => setCanDrop((canDrop) => !canDrop)}
    >
      <ToolWindowStripeContext.Provider value={contextValue}>
        {children}
        <StyledSpacer />
        {split}
      </ToolWindowStripeContext.Provider>
    </StyledToolWindowStripe>
  );
}
