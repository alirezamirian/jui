import { Theme } from "@intellij-platform/core/Theme";

export const WITH_POINTER_BORDER_RADIUS = 4;
export const tooltipBackground = ({ theme }: { theme: Theme }) =>
  theme.color("ToolTip.background", !theme.dark ? "#f2f2f2" : "#3c3f41");
export const tooltipBorderColor = ({ theme }: { theme: Theme }) =>
  theme.color("ToolTip.borderColor", !theme.dark ? "#adadad" : "#636569");
