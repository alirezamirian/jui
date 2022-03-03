import { styled } from "@intellij-platform/core/styled";
import { Theme, UnknownThemeProp } from "@intellij-platform/core/Theme";
import { StyledHoverContainer } from "@intellij-platform/core/Icon";

const CORNER_RADIUS = 12; // it used to be 8. After introduction of Notifications tool window, it's 12

const bgColor = ({ theme }: { theme: Theme }) =>
  theme.color(
    "Notification.background",
    !theme.dark ? "rgb(242,242,242)" : "#4E5052"
  );

export const StyledHeaderActions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: inherit;
  padding: 0.375rem 0.5rem 0;
  &::before {
    content: "";
    position: absolute;
    right: 100%;
    background: linear-gradient(90deg, transparent, ${bgColor});
    width: 20px;
    height: 100%;
    z-index: 1;
    top: 0;
  }
`;

export const StyledBalloonContainer = styled.div`
  line-height: 1.2;
  box-sizing: border-box;
  overflow: hidden; // header actions overflows a little at the top right rounded corner
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); // shadow doesn't seem to be themed
  padding: 0.5rem 0;
  border: 1px solid
    ${({ theme }) =>
      theme.color(
        "Notification.borderColor",
        !theme.dark ? "#B2B2B2CD" : "#565A5CCD"
      )};
  border-radius: ${({ theme }) =>
    `${
      (theme.value<number>("Notification.arc" as UnknownThemeProp) ??
        CORNER_RADIUS) / 2
    }px`};
  //display: inline-flex;
  width: 23.3125rem;
  position: relative;
  background-color: ${bgColor};
  color: ${({ theme }) =>
    theme.color(
      "Notification.foreground" as UnknownThemeProp,
      !theme.dark ? "#000" : "rgb(191,191,191)"
    )};

  ${StyledHeaderActions} {
    display: none;
  }
  &:hover ${StyledHeaderActions} {
    display: initial;
  }
`;

export const StyledIconContainer = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 0.5rem;
`;

export const StyledBalloonHeader = styled.div`
  line-height: 1rem;
  font-weight: bold;
  margin: 0 2.125rem 0.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; // this is not the case in original impl, but it's a clear improvement
`;

export const StyledBalloonBody = styled.div<{
  lineClamp: number | false;
}>`
  margin: 0 2.125rem 0 2.125rem;
  line-height: 1rem;
  display: inline;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp};
  word-break: ${({ lineClamp }) => lineClamp === 1 && "break-all"};
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

export const StyledBalloonFooter = styled.div`
  margin: 0.375rem 1.875rem 0 2.125rem;
  display: inline-flex;
  white-space: nowrap;
  overflow: hidden;
  gap: 1rem;

  // could be -webkit-fill-available too, if it has good support. Probably it doesn't tho
  max-width: calc(100% - 3.5rem);
`;

export const StyledToggleIconContainer = styled.span`
  display: inline-flex;
  position: absolute;
  right: 0.5rem;
  bottom: 0;
  background-color: ${bgColor};
  padding-left: 0.5rem;
`;

export const StyledToggleExpandButtonContainer = styled(StyledHoverContainer)`
  display: block;
  position: relative; // for icon absolute positioning
  cursor: pointer;
  flex: 1;
`;

export const StyledToggleExpandButtonFooterContainer = styled(
  StyledToggleExpandButtonContainer
)`
  min-height: 1.5rem;
  margin: -0.5rem 0;
  position: relative;
  z-index: 1;
  ${StyledToggleIconContainer} {
    bottom: 0.5rem;
  }
  ${StyledBalloonFooter} {
    margin-top: 0.875rem;
    margin-bottom: 0.5rem;
  }
  ${StyledBalloonFooter}:hover + * .icon[data-hover] {
    display: none;
  }
  ${StyledBalloonFooter}:hover + * .icon {
    display: unset;
  }
`;
