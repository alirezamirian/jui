import { styled, Theme } from "@intellij-platform/core";
import React, { ForwardedRef, HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { vcsRootsAtom } from "../file-status.state";
import { useTheme } from "styled-components";

const StyledRepoColorSquare = styled.span`
  width: 14px;
  height: 14px;
  align-self: center;
  margin-right: 0.2rem;
  position: relative;

  //  after pseudo element is used to create the color mixing implemented here:
  //  https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/vcs-log/impl/src/com/intellij/vcs/log/ui/VcsLogColorManagerImpl.java#L60
  &&:after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.75;
    background: ${({ theme }) =>
      theme.color("Table.background") || (theme.dark ? "#3C3F41" : "#fff")};
  }
`;

const useRepoRootColor = (rootPath: string) => {
  const index = useAtomValue(vcsRootsAtom).findIndex(
    (root) => root.dir === rootPath
  );
  const theme = useTheme() as Theme;
  const colors = [theme.commonColors.red, theme.commonColors.blue];
  return colors[index % colors.length] ?? colors[0];
};

export const RepoColorIcon = React.forwardRef(
  (
    {
      rootPath,
      ...props
    }: {
      rootPath: string;
    } & HTMLAttributes<HTMLSpanElement>,
    ref: ForwardedRef<HTMLElement>
  ) => (
    <StyledRepoColorSquare
      ref={ref}
      {...props}
      style={{ ...props.style, backgroundColor: useRepoRootColor(rootPath) }}
    />
  )
);
