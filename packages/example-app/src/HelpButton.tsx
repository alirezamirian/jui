import React from "react";
import {
  Button,
  ButtonProps,
  HelpTooltip,
  TooltipTrigger,
} from "@intellij-platform/core";

export function HelpButton({
  tooltip = "Show help contents",
  ...props
}: Omit<ButtonProps, "variant" | "children"> & { tooltip?: string }) {
  return (
    <TooltipTrigger tooltip={<HelpTooltip helpText={tooltip} />}>
      <Button
        variant="icon"
        aria-label="Help"
        aria-description="Show help contents"
        {...props}
      >
        <span style={{ fontSize: 18 }}>?</span>
      </Button>
    </TooltipTrigger>
  );
}
