import React from "react";
import { Change } from "./change-lists.state";
import { StatusColor } from "../FileStatusColor";

export const ChangesSummary = ({
  changes,
}: {
  changes: ReadonlyArray<Change>;
}) => {
  const modifiedCount = changes.filter(
    (change) => change.after.path && change.before.path
  ).length;
  const addedCount = changes.filter(
    (change) => change.after.path && !change.before.path
  ).length;
  const deletedCount = changes.filter(
    (change) => change.before.path && !change.after.path
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
