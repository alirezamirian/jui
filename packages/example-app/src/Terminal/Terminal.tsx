import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import * as Xterm from "xterm";
import { XTerm } from "xterm-for-react";

const useTerminalXtermOptions = (): Xterm.ITerminalOptions => {
  return useMemo(
    () => ({
      theme: {
        background: "rgb(43,43,43)", // CONSOLE_BACKGROUND_KEY from color scheme
        selection: "#214283", // SELECTION_BACKGROUND?
        // TODO: more colors
      },
      fontFamily: "sans-serif",
      letterSpacing: -8,
      fontSize: 12,
      lineHeight: 1.3,
      cursorStyle: "block",
      cursorBlink: true,
      cursorWidth: 8,
      rendererType: "dom",
    }),
    []
  );
};

const StyledXterm = styled(XTerm)`
  height: 100%;
  background: rgb(43, 43, 43); // CONSOLE_BACKGROUND_KEY from color scheme
`;
export const Terminal = (): React.ReactElement => {
  const [input, setInput] = useState("");
  const xtermRef = useRef<XTerm | null>(null);

  const options = useTerminalXtermOptions();
  const PROMPT = "$ ";
  useEffect(() => {
    setTimeout(() => {
      xtermRef.current?.terminal.resize(80, 10);
      xtermRef.current?.terminal.write(PROMPT);
    }, 3000);
  }, []);
  return (
    <StyledXterm
      ref={xtermRef}
      options={options}
      onData={(data) => {
        const code = data.charCodeAt(0);
        // If the user hits empty and there is something typed echo it.
        if (code === 13) {
          if (input.length > 0) {
            xtermRef.current?.terminal.write("\r\nYou typed: '" + input + "'");
          }
          xtermRef.current?.terminal.write("\r\n" + PROMPT);
          setInput("");
        } else if (code < 32 || code === 127) {
          // Disable control Keys such as arrow keys
          return;
        } else {
          // Add general key press characters to the terminal
          xtermRef.current?.terminal.write(data);
          setInput(input + data);
        }
      }}
    />
  );
};
