/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Pixel perfect UI match",
    image: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Unless you inspect and see it's DOM elements, it's hard to tell what you
        are looking at is not the original Java implementation.
      </>
    ),
  },
  {
    title: "Intellij Platform's UX, React's DX",
    image: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        Amazing keyboard-first UX of Intellij Platform, in a descriptive and
        declarative style, which works great for UI applications.
      </>
    ),
  },
  {
    title: "Drop-in support for themes",
    image: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        All components respect and use theme properties like their corresponding
        Java implementation. You can use it with{" "}
        <a
          href="https://plugins.jetbrains.com/search?tags=Theme"
          target="_blank"
        >
          any theme
        </a>{" "}
        in form of a json file and it works.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
