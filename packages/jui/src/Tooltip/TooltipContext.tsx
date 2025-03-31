import React, { CSSProperties } from "react";
import { TooltipTriggerState } from "@react-stately/tooltip";
import { PositionAria } from "@react-aria/overlays";

interface TooltipContextObject {
  state: TooltipTriggerState;
  isInteractive: boolean;
  placement: NonNullable<PositionAria["placement"]> | undefined;
  pointerPositionStyle?: CSSProperties;
}

export const TooltipContext = React.createContext<TooltipContextObject | null>(
  null
);
