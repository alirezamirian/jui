export type Anchor = "left" | "right" | "top" | "bottom";

export const getAnchorOrientation = (
  anchor: Anchor
): "horizontal" | "vertical" =>
  isHorizontalToolWindow(anchor) ? "horizontal" : "vertical";

export const isHorizontalToolWindow = (anchor: Anchor) =>
  anchor === "top" || anchor === "bottom";

export const theOtherSide = (anchor: Anchor) =>
  ({
    left: "right" as const,
    right: "left" as const,
    top: "bottom" as const,
    bottom: "top" as const,
  }[anchor]);
