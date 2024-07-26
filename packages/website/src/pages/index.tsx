import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./_index/index.module.css";
import HomepageFeatures from "./_index/HomepageFeatures";
import { WindowFrame } from "./_index/WindowFrame/WindowFrame";
import { LazyExampleApp } from "../components/LazyExampleApp";
import styled from "styled-components";
import {
  PageSection2,
  PageSection2 as SectionType,
} from "./_index/PageSection2";

const demoAppClickHandler = (e) => {
  e.preventDefault();
  document.getElementById("demo-app").scrollIntoView({ behavior: "smooth" });
};
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--dark", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">
          {linkify(siteConfig.tagline, {
            text: "Intellij Platform",
            element: (
              <Link
                href="https://www.jetbrains.com/opensource/idea/"
                className={styles.link}
                target="_blank"
              >
                Intellij Platform
              </Link>
            ),
          })}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get started
          </Link>
          <Link
            to="/example-app"
            onClick={demoAppClickHandler}
            className="button button--secondary button--lg"
          >
            Jump to demo
          </Link>
        </div>
      </div>
    </header>
  );
}

function linkify(
  input: string,
  link: { text: string; element: React.ReactElement } // can be extended to accept an array of links
): React.ReactElement {
  return (
    <>
      {input
        .replace(link.text, `===${link.text}===`)
        .split("===")
        .map((part) => (
          <React.Fragment key={part}>
            {part === link.text ? link.element : part}
          </React.Fragment>
        ))}
    </>
  );
}

export default function Home(): JSX.Element {
  return (
    <div
      onClickCapture={(e) => {
        if (
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey &&
          !e.altKey &&
          e.target instanceof HTMLAnchorElement &&
          e.target.href.includes("/example-app")
        ) {
          demoAppClickHandler(e);
        }
      }}
    >
      <Layout>
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <PageSection2>
            <PageSection2.Container>
              <PageSection2.Title id="demo-app">
                Demo Application
              </PageSection2.Title>
              <SectionType.Subtitle>
                Bellow is an example application built with JUI. It mimics
                Webstorm, and although it has some functionality implemented as
                well, the main purpose is to show case features and components
                JUI offers, rather than being a real IDE.
              </SectionType.Subtitle>
            </PageSection2.Container>
            <ExampleWindowFrame>
              <LazyExampleApp
                height="calc(100vh - 200px)"
                autoCloneSampleRepo
              />
            </ExampleWindowFrame>
          </PageSection2>
        </main>
      </Layout>
    </div>
  );
}

const ExampleWindowFrame = styled(WindowFrame)`
  margin-top: 2rem;
  width: clamp(85%, 1200px, calc(100vw - 1rem));
  min-height: calc(100vh - 200px);
`;
