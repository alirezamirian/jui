import React from "react";
import { Selection } from "@react-types/shared";

export function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        height: "calc(100vh - 25px)",
      }}
    >
      {children}
    </div>
  );
}

export function SelectionLog({ selection }: { selection: Selection }) {
  return (
    <pre>
      {selection instanceof Set && (
        <div>{JSON.stringify([...selection], null, 2)}</div>
      )}
      {JSON.stringify(selection, null, 2)}
    </pre>
  );
}
