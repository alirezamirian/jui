import styled from "@emotion/styled";
import React from "react";

const SpeedSearchPopupBase: React.FC<{
  children: string;
  className: string;
}> = ({ children, className }) => (
  <span className={className}>{children.replace(/ /g, "\u00A0")}</span>
);

export const SpeedSearchPopup = styled(SpeedSearchPopupBase)`
  position: absolute;
  background: #6f6f6f;
  border: 1px solid #404040;
  color: #bfbfbf;
  z-index: 1;
  padding: 2px 10px;
  height: 20px;
  transform: translateY(-100%);
`;
