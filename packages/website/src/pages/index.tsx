import React, { ReactNode } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

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
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
