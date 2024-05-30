import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { styled } from "@intellij-platform/core";
import {
  MnemonicTrigger,
  MnemonicProps,
  MnemonicText,
} from "./MnemonicTrigger";

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.color("*.foreground")};
`;
export default {
  title: "Components/Mnemonic",
  component: MnemonicTrigger,
  args: {
    children: "Disconnect",
    mnemonic: "D",
    onTriggered: () => alert("Triggered!"),
  },
  render: (props) => (
    <StyledContainer>
      <MnemonicTrigger {...props} />
    </StyledContainer>
  ),
  argTypes: {},
} as Meta<MnemonicProps>;

export const Default: StoryObj<MnemonicProps> = {};

export const NonTextContent: StoryObj<MnemonicProps> = {
  args: {
    children: (
      <span>
        <MnemonicText>Disconnect</MnemonicText>
      </span>
    ),
  },
};
export const Multiple: StoryObj<MnemonicProps> = {
  render: () => {
    return (
      <StyledContainer style={{ display: "flex", gap: "1rem" }}>
        <span>
          <MnemonicTrigger
            mnemonic="C"
            onTriggered={() => alert('Triggered "Cancel"')}
          >
            Cancel
          </MnemonicTrigger>
        </span>
        <span>
          <MnemonicTrigger
            mnemonic="D"
            onTriggered={() => alert('Triggered "Disconnect"')}
          >
            Disconnect
          </MnemonicTrigger>
        </span>
        <span>
          <MnemonicTrigger
            mnemonic="T"
            onTriggered={() => alert('Triggered "Terminate"')}
          >
            Terminate
          </MnemonicTrigger>
        </span>
      </StyledContainer>
    );
  },
};
