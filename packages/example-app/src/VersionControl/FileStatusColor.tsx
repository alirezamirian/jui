import React from "react";
import { useAtomValue } from "jotai";
import { useTheme } from "styled-components";
import { Theme } from "@intellij-platform/core";
import { fileStatusAtoms } from "./file-status.state";
import { FileStatus } from "./file-status";
import { unwrap } from "jotai/utils";

export const useStatusColor = (status: FileStatus) => {
  const theme = useTheme() as Theme;
  switch (status) {
    case "MODIFIED":
      return theme.dark ? "#6897bb" : "#0032a0"; // FILESTATUS_MODIFIED key from colorScheme
    case "ADDED":
      return theme.dark ? "#629755" : "#0a7700"; // FILESTATUS_ADDED key from colorScheme
    case "DELETED":
      return theme.dark ? "#6c6c6c" : "#616161"; // FILESTATUS_DELETED key from colorScheme
    case "UNKNOWN":
      return theme.dark ? "#d1675a" : "#993300"; // FILESTATUS_UNKNOWN key from colorScheme
  }
  return undefined;
};
export const useFileStatusColor = (filepath: string): string | undefined => {
  const fileStatus = useAtomValue(unwrap(fileStatusAtoms(filepath)));
  return useStatusColor(fileStatus ?? "NOT_CHANGED");
};

export const FileStatusColor: React.FC<{
  filepath: string;
  children?: React.ReactNode;
}> = ({ children, filepath }) => {
  const color = useFileStatusColor(filepath);
  return <span style={{ color }}>{children}</span>;
};

export const StatusColor: React.FC<{
  status: FileStatus;
  children?: React.ReactNode;
}> = ({ children, status }) => {
  const theme = useTheme() as Theme;
  const color = theme.currentForegroundAware(useStatusColor(status));
  return <span style={{ color }}>{children}</span>;
};
