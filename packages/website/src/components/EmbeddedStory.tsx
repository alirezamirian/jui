import Link from "@docusaurus/Link";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import React from "react";
import styled from "styled-components";

const StyledIframe = styled.iframe`
  width: 100%;
  border: none;
`;

const externalLinkIcon = (
  <svg
    width="13.5"
    height="13.5"
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="iconExternalLink__-_-node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"
  >
    <path
      fill="currentColor"
      d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
    ></path>
  </svg>
);
const storybookBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:6008"
    : "/storybook";

/**
 * A component for embedding a story based on storyId.
 *
 * TODO: pass theme based on docusaurus theme.
 */
export const EmbeddedStory = ({
  height = 450,
  storyId,
}: {
  storyId: string;
  height?: number;
}) => {
  const { withBaseUrl } = useBaseUrlUtils();
  return (
    <>
      <Link
        href={`${storybookBaseUrl}/?path=/story/${storyId}`}
        target="_blank"
      >
        Open in storybook
        {externalLinkIcon}
      </Link>
      <StyledIframe
        style={{ height }}
        src={withBaseUrl(
          `${storybookBaseUrl}/iframe.html?id=${storyId}&args=&viewMode=story`
        )}
      />
    </>
  );
};
