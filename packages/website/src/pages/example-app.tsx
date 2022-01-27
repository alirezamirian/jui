import React, { ComponentProps, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { PlatformIcon, styled, Color } from "@intellij-platform/core";
import {
  ExampleContext,
  ExampleContextThemeName,
} from "../components/ExampleContext";
import styles from "../components/example-container-styles.module.css";

const App = React.lazy(() => import("../../../example-app/src"));

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.color("*.background")};
`;

const StyledBanner = styled.div`
  background: ${({ theme }) =>
    new Color(theme.color("*.background")).darker().toString()};
  color: ${({ theme }) => theme.color("*.foreground")};
  display: flex;
`;

const BannerLinkButton = styled(Link)`
  color: inherit;
  padding: 0 6px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  &:hover {
    background: ${({ theme }) =>
      theme.color("ActionButton.hoverBackground", "#DFDFDF")};
    color: inherit;
    text-decoration: none;
  }
`;

const StyledSpacer = styled.span`
  flex: 1;
`;

export default function ExampleAppPage(): JSX.Element {
  const [themeName, setThemeName] = useState<
    ComponentProps<typeof ExampleContext>["themeName"]
  >("darcula");

  return (
    <>
      <BrowserOnly>
        {() => (
          <ExampleContext themeName={themeName}>
            <React.Suspense fallback="loading...">
              <ColumnContainer className={styles.exampleContainer}>
                <StyledBanner>
                  <BannerLinkButton to="/">
                    <PlatformIcon icon="actions/exit.svg" />
                    &nbsp; Quit example app
                  </BannerLinkButton>
                  <StyledSpacer />
                  <label>
                    Theme: &nbsp;
                    <select
                      value={themeName}
                      onChange={({ target }) =>
                        setThemeName(target.value as ExampleContextThemeName)
                      }
                    >
                      <option value="darcula">Darcula</option>
                      <option value="light">Light</option>
                      <option value="highContrast">High Contrast</option>
                    </select>
                  </label>
                </StyledBanner>
                <App />
              </ColumnContainer>
            </React.Suspense>
          </ExampleContext>
        )}
      </BrowserOnly>
    </>
  );
}
