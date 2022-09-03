import React from "react";
import { TooltipTriggerState } from "@react-stately/tooltip";

interface TooltipContextObject {
  state: TooltipTriggerState;
  isInteractive: boolean;
}

export const TooltipContext = React.createContext<TooltipContextObject | null>(
  null
);
