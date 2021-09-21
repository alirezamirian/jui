export type Anchor = "left" | "right" | "top" | "bottom";

export const isHorizontal = (anchor: Anchor) =>
  anchor === "top" || anchor === "bottom";

export const theOtherSide = (anchor: Anchor) =>
  ({
    left: "right" as const,
    right: "left" as const,
    top: "bottom" as const,
    bottom: "top" as const,
  }[anchor]);
