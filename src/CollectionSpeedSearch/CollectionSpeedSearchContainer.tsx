import styled from "styled-components";
import { SpeedSearchContainer } from "../SpeedSearch/SpeedSearchContainer";

export const CollectionSpeedSearchContainer = styled(SpeedSearchContainer)<{
  fillAvailableSpace?: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: ${({ fillAvailableSpace }) => (fillAvailableSpace ? 1 : undefined)};
`;
