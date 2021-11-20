import React from "react";

/**
 * To make relation between things in jui and original reference impl in Intellij Platform
 */
export const RefToIntellijPlatform = ({
  path,
  name,
}: {
  path: string;
  name?: string;
}) => {
  return (
    // TODO: make it some nice box with an icon and a hint text which says something like "Intellij Platform" or
    //  "Reference" or something better :D
    <a
      href={`https://github.com/JetBrains/intellij-community/blob/master/${path}`}
      target="_blank"
    >
      {name || path.split("/").pop()}
    </a>
  );
};
