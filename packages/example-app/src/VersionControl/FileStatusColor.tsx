import { useTheme } from "styled-components";
import { Theme } from "@intellij-platform/core";
import { useRecoilValue } from "recoil";
import { fileStatusState } from "./file-status.state";
import React from "react";
import { FileStatus } from "./file-status";

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
  const fileStatus = useRecoilValue(fileStatusState(filepath));
  return useStatusColor(fileStatus);
};

export const FileStatusColor: React.FC<{ filepath: string }> = ({
  children,
  filepath,
}) => {
  const color = useFileStatusColor(filepath);
  return <span style={{ color }}>{children}</span>;
};

export const StatusColor: React.FC<{ status: FileStatus }> = ({
  children,
  status,
}) => {
  const color = useStatusColor(status);
  return <span style={{ color }}>{children}</span>;
};
