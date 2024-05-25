import React from "react";
import {
  Link,
  PlatformIcon,
  styled,
  usePerformAction,
} from "@intellij-platform/core";
import { notImplemented } from "../../Project/notImplemented";
import { VcsActionIds } from "../VcsActionIds";

const StyledContainer = styled.div`
  min-height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  white-space: nowrap;
`;
export function VersionControlToolWindowZeroState() {
  const performAction = usePerformAction();

  return (
    <StyledContainer>
      <div style={{ textAlign: "center" }}>
        To track changes to code:
        <br />
        <Link onPress={() => performAction(VcsActionIds.GIT_INIT)}>
          Create Git repository...
        </Link>
        <br />
        <Link onPress={notImplemented}>Use Local History...</Link>
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
