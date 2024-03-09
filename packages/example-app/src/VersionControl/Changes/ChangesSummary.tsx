import React from "react";
import { StatusColor } from "../FileStatusColor";
import { Change } from "./Change";

export const ChangesSummary = ({
  changes,
}: {
  changes: ReadonlyArray<Change>;
}) => {
  const modifiedCount = changes.filter(
    (change) => change.after && change.before
  ).length;
  const addedCount = changes.filter(
    (change) => change.after && !change.before
  ).length;
  const deletedCount = changes.filter(
    (change) => change.before && !change.after
  ).length;

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
