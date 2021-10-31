import React from "react";
import styled from "styled-components";

/**
 * Green circle indicator used with icons.
 * Reference: platform/execution/src/com/intellij/execution/runners/IndicatorIcon.kt
 */
export const StyledIconLiveIndicator = styled.span`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 1000px;
  background: #00ff00;
  box-shadow: 0.5px 0.5px 1px 1px rgba(0, 0, 0, 0.4);
  bottom: 1px;
  right: 1px;
`;
