import { styled } from "@intellij-platform/core";

export const StyledCurrentBranchTag = styled.span`
  display: inline-flex;
  align-self: center;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.25rem;

  background: ${({ theme }) =>
    theme.currentBackgroundAware(
      // FIXME: color-mix algorithm used here seems to be different from how colors are mixed in the reference impl.
      `color-mix(in srgb, ${theme.color(
        "VersionControl.Log.Commit.currentBranchBackground",
        theme.dark ? "rgb(63, 71, 73)" : "rgb(228, 250, 255)"
      )}, ${theme.color(
        "VersionControl.RefLabel.backgroundBase",
        theme.dark ? "#fff" : "#000"
      )} ${
        (theme.value<number>("VersionControl.RefLabel.backgroundBrightness") ??
          0.08) * 100
      }%)`
    )};
  color: ${({ theme }) =>
    theme.currentForegroundAware(
      theme.color(
        "VersionControl.RefLabel.foreground",
        theme.dark ? "#909090" : "#7a7a7a"
      )
    )};
`;
