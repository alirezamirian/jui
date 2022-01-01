import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { PlatformIcon, styled, Color } from "@intellij-platform/core";
import React from "react";
import { ExampleContext } from "../components/ExampleContext";

const App = React.lazy(() => import("../../../example-app/src"));

const StyleNormalizer = styled.div`
  font-family: sans-serif;
  font-size: 14px;
`;
const ColumnContainer = styled(StyleNormalizer)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledBanner = styled.div`
  background: ${({ theme }) =>
    new Color(theme.color("*.background")).darker().toString()};
  color: ${({ theme }) => theme.color("*.foreground")};
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

export default function ExampleAppPage(): JSX.Element {
  return (
    <>
      <BrowserOnly>
        {() => (
          <ExampleContext>
            <React.Suspense fallback="loading...">
              <ColumnContainer>
                <StyledBanner>
                  <BannerLinkButton to="/">
                    <PlatformIcon icon="actions/exit.svg" />
                    &nbsp; Quit example app
                  </BannerLinkButton>
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
