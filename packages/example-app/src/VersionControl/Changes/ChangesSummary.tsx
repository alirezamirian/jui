import React from "react";
import { StatusColor } from "../FileStatusColor";
import { AnyChange, Change } from "./Change";

export const ChangesSummary = ({
  changes,
}: {
  changes: ReadonlyArray<AnyChange>;
}) => {
  const modifiedCount = changes.filter(
    (change) => Change.fileStatus(change) === "MODIFIED"
  ).length;
  const addedCount = changes.filter(Change.isAddition).length;
  const deletedCount = changes.filter(Change.isDeletion).length;

  return (
    <>
      {addedCount > 0 && (
        <StatusColor status="ADDED">{addedCount} added</StatusColor>
      )}
      {modifiedCount > 0 && (
        <StatusColor status="MODIFIED">{modifiedCount} modified</StatusColor>
      )}
      {deletedCount > 0 && (
        <StatusColor status="DELETED">{deletedCount} deleted</StatusColor>
      )}
    </>
  );
};
