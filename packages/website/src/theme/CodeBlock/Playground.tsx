/**
 * NOTE: this file is copied from Docusaurus repo, to customize the live code blocks UI, since the exported
 * functionality doesn't allow for the needed customizations.
 * Original file: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-live-codeblock/src/theme/Playground/index.tsx
 */

import React, { useState } from "react";
import clsx from "clsx";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import Translate from "@docusaurus/Translate";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  ErrorBoundaryTryAgainButton,
  usePrismTheme,
} from "@docusaurus/theme-common";
import ErrorBoundary from "@docusaurus/ErrorBoundary";

import type { Props } from "@theme/Playground";
import type { Props as ErrorProps } from "@theme/Error";

import styles from "@docusaurus/theme-live-codeblock/lib/theme/Playground/styles.module.css";
import { Expandable } from "./Expandable";
import {
  PlatformIcon,
  IconButton,
  ThemeProvider,
  Theme,
  ActionTooltip,
  TooltipTrigger,
} from "@intellij-platform/core";
import lightThemeJson from "@intellij-platform/core/themes/intellijlaf.theme.json";

function Header({
  children,
  icons,
}: {
  children: React.ReactNode;
  icons?: React.ReactNode;
}) {
  return (
    <div className={clsx(styles.playgroundHeader)} style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>{children}</span>
      {icons}
    </div>
  );
}

function LivePreviewLoader() {
  // Is it worth improving/translating?
  return <div>Loading...</div>;
}

function ErrorFallback({ error, tryAgain }: ErrorProps): JSX.Element {
  return (
    <div className={styles.errorFallback}>
      <p>{error.message}</p>
      <ErrorBoundaryTryAgainButton onClick={tryAgain} />
    </div>
  );
}

function Preview() {
  // No SSR for the live preview
  // See https://github.com/facebook/docusaurus/issues/5747
  return (
    <BrowserOnly fallback={<LivePreviewLoader />}>
      {() => (
        <>
          <ErrorBoundary fallback={(params) => <ErrorFallback {...params} />}>
            <LivePreview />
          </ErrorBoundary>
          <LiveError />
        </>
      )}
    </BrowserOnly>
  );
}

function ResultWithHeader() {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks"
        >
          Result
        </Translate>
      </Header>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <Preview />
      </div>
    </>
  );
}

function ThemedLiveEditor({
  expanded,
  isExpandable,
  onExpand,
  setIsExpandable,
}: {
  expanded: boolean;
  isExpandable: boolean;
  onExpand: () => void;
  setIsExpandable: (expandable: boolean) => void;
}) {
  const isBrowser = useIsBrowser();
  return (
    <Expandable
      expanded={expanded}
      isExpandable={isExpandable}
      onExpand={onExpand}
      setIsExpandable={setIsExpandable}
    >
      <LiveEditor
        // We force remount the editor on hydration,
        // otherwise dark prism theme is not applied
        key={String(isBrowser)}
        className={styles.playgroundEditor}
      />
    </Expandable>
  );
}

function EditorWithHeader() {
  const [expanded, setExpanded] = useState(false);
  const [expandable, setExpandable] = useState(false);
  return (
    <>
      <Header
        icons={
          <ThemeProvider theme={new Theme(lightThemeJson as any)}>
            {(expanded || expandable) && (
              <TooltipTrigger
                tooltip={
                  <ActionTooltip
                    actionName={expanded ? "Collapse code" : "Expand code"}
                  />
                }
              >
                <IconButton
                  onPress={() => setExpanded((expanded) => !expanded)}
                >
                  <PlatformIcon
                    icon={
                      expanded ? "actions/collapseall" : "actions/expandall"
                    }
                  />
                </IconButton>
              </TooltipTrigger>
            )}
          </ThemeProvider>
        }
      >
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks"
        >
          Live Editor
        </Translate>
      </Header>
      <ThemedLiveEditor
        expanded={expanded}
        onExpand={() => setExpanded(true)}
        isExpandable={expandable}
        setIsExpandable={setExpandable}
      />
    </>
  );
}

export default function Playground({
  children,
  transformCode,
  ref,
  ...props
}: Props): JSX.Element {
  const prismTheme = usePrismTheme();

  const noInline = props.metastring?.includes("noInline") ?? false;

  return (
    <>
      <div ref={ref} className={styles.playgroundContainer}>
        <LiveProvider
          code={children.replace(/\n$/, "")}
          noInline={noInline}
          transformCode={transformCode ?? ((code) => `${code};`)}
          theme={prismTheme}
          {...props}
        >
          <ResultWithHeader />
          <EditorWithHeader />
        </LiveProvider>
      </div>
    </>
  );
}
