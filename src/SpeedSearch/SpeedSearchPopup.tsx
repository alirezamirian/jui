import styled from "@emotion/styled";
import React from "react";

export interface SpeedSearchPopupProps {
  children: string | undefined;
  match?: boolean;
  active: boolean | undefined;
}

export const SpeedSearchPopup: React.FC<SpeedSearchPopupProps> = ({
  active,
  match,
  children,
}) =>
  active ? (
    <StyledSpeedSearchPopup match={match}>
      {(children || "").replace(/ /g, "\u00A0")}
    </StyledSpeedSearchPopup>
  ) : null;

const StyledSpeedSearchPopup = styled.span`
  position: absolute;
  background: #6f6f6f;
  border: 1px solid #404040;
  color: ${({ match }: { match?: boolean }) =>
    match ? "#bfbfbf" : "#FF555D"}; // TODO: theme
  z-index: 1;
  padding: 2px 10px;
  height: 20px;
  transform: translateY(-100%);
`;
