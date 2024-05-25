import React from "react";
import {
  Link,
  PlatformIcon,
  styled,
  usePerformAction,
} from "@intellij-platform/core";
import { notImplemented } from "../../../Project/notImplemented";
import { VcsActionIds } from "../../VcsActionIds";

const StyledContainer = styled.div`
  min-height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  white-space: nowrap;
`;
export function ChangesViewZeroState() {
  const performAction = usePerformAction();
  return (
    <StyledContainer>
      <div style={{ textAlign: "center" }}>
        To commit changes,{" "}
        <Link onPress={() => performAction(VcsActionIds.GIT_INIT)}>
          Create Git repository...
        </Link>
        <br />
        For recent changes, see{" "}
        <Link onPress={notImplemented}>Local History...</Link>
        <br />
        <br />
        <PlatformIcon
          style={{ verticalAlign: "text-top" }}
          icon="general/contextHelp.svg"
        />{" "}
        <Link onPress={notImplemented}>Version Control integration</Link>{" "}
      </div>
    </StyledContainer>
  );
}
