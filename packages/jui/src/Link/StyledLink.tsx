import { Theme, UnknownThemeProp } from "@intellij-platform/core/Theme";
import { styled } from "@intellij-platform/core/styled";

const getDefaultLinkColor = ({ theme }: { theme: Theme }) =>
  theme.currentForegroundAware(theme.commonColors.linkForegroundEnabled);

export const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  outline: none;
  // &:focus-visible didn't work as expected, so FocusRing is used
  &.focus-visible {
    outline: 1px solid
      ${({ theme }) =>
        theme.color(
          "Link.focusedBorderColor" as UnknownThemeProp<"Link.focusedBorderColor">,
          theme.commonColors.focusBorderColor
        )};
    border-radius: 2px; // Registry.intValue("ide.link.button.focus.round.arc", 4)
  }
  color: ${getDefaultLinkColor};

  // When rendered in a container with custom background (e.g. in selected List/Tree items), render with underline.
  // Based on the observation in Git Push window, but seems like something that could be baked into Link component
  // rather than per-case customization and/or through an option.
  @container style(--jui-background) {
    text-decoration: underline;
  }

  &:hover,
  &.hover /* for testing purposes*/ {
    text-decoration: underline;
    color: ${({ theme }) =>
      theme.currentForegroundAware(
        theme.color(
          "Link.hoverForeground",
          theme.color(
            "link.hover.foreground" as UnknownThemeProp<"link.hover.foreground">,
            "" /*FIXME: check*/
          )
        )
      )};
  }
  &:active,
  &.active {
    color: ${({ theme }) =>
      theme.currentForegroundAware(
        theme.color(
          "Link.pressedForeground",
          theme.color(
            "link.pressed.foreground" as UnknownThemeProp<"link.pressed.foreground">,
            !theme.dark ? "#F00000" : "#BA6F25"
          )
        )
      )};
  }
  &:disabled,
  &.disabled {
    cursor: default;
    text-decoration: none;
    color: ${({ theme }) =>
      theme.color(
        "Link.disabledForeground" as UnknownThemeProp<"Link.disabledForeground">,
        theme.color(
          "Label.disabledForeground",
          theme.color("Label.disabledText", "#999")
        )
      )};
  }
  // We may need to refine this to allow passing visited as a prop for links that don't have href, and not apply the
  // styles in that case, since it seems no href is considered visited by default. Although, in all main themes
  // Link.visitedForeground is set to the default link color.
  &:visited,
  &.visited {
    color: ${({ theme }) =>
      theme.currentForegroundAware(
        theme.color(
          "Link.visitedForeground",
          theme.color(
            "link.visited.foreground" as UnknownThemeProp<"link.visited.foreground">,
            !theme.dark ? "#800080" : "#9776A9"
          )
        )
      )};
  }
`;
