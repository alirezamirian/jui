import {
  X2jOptionsOptional,
  XMLBuilder,
  XmlBuilderOptionsOptional,
  XMLParser,
} from "fast-xml-parser";
import path from "path";
import { groupBy } from "ramda";
import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { RecoilSync } from "recoil-sync";

import { fs } from "../../fs/fs";
import { ensureDir } from "../../fs/fs-utils";
import { currentProjectState } from "../project.state";
import { StorageFiles } from "./persistentAtomEffect";
import { ensureArray } from "../../ensureArray";

type ComponentState = { [key: string]: unknown; "@name": string };
type WorkspaceState = {
  "?xml": { "@version": "1.0"; "@encoding": "UTF-8" };
  project: {
    "@version": string;
    component: Array<ComponentState>;
  };
};

const WORKSPACE_XML_PARSE_OPTIONS: X2jOptionsOptional = {
  attributeNamePrefix: "@",
  ignoreAttributes: false,
  isArray: (tagName, jPath) => jPath === "project.component",
};

const WORKSPACE_XML_BUILD_OPTIONS: XmlBuilderOptionsOptional = {
  format: true,
  attributeNamePrefix: "@",
  ignoreAttributes: false,
};

async function readWorkspace(
  storageFile: string
): Promise<null | WorkspaceState> {
  const xmlParser = new XMLParser(WORKSPACE_XML_PARSE_OPTIONS);
  const workspaceFileExists = await fs.promises.exists(storageFile);
  if (!workspaceFileExists) {
    return null;
  }
  // @ts-expect-error: bad typing in @isomorphic-git/lightning-fs@4.6.0. It's fixed, but not published at the time of writing this
  const xmlData: string = await fs.promises.readFile(storageFile, {
    encoding: "utf8",
  });

  const workspace = xmlParser.parse(xmlData);
  workspace.project = workspace.project || {};
  workspace.project.component = ensureArray(workspace.project.component);
  return workspace;
}
async function writeWorkspace(
  storageFile: string,
  workspaceState: WorkspaceState
): Promise<void> {
  const xmlBuilder = new XMLBuilder(WORKSPACE_XML_BUILD_OPTIONS);

  const xmlString = xmlBuilder.build(workspaceState);
  await ensureDir(fs.promises, path.dirname(storageFile));
  await fs.promises.writeFile(storageFile, xmlString);
}

const storageFileMapping: Record<StorageFiles, string> &
  Record<string, string> = {
  [StorageFiles.WORKSPACE_FILE]: "workspace.xml",
};

export function PersistentStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerDirectory = path.join(
    useRecoilValue(currentProjectState).path,
    ".idea"
  );

  const resolveStorageFile = (storageFile: string) =>
    path.join(
      containerDirectory,
      storageFileMapping[storageFile] || storageFile
    );

  const getWorkspace = (storageFile: string) => {
    // FIXME: caching the first read can cause issues when multiple writes happen, where they override each other.
    const resolvedStorageFile = resolveStorageFile(storageFile);
    return readWorkspace(resolvedStorageFile);
  };

  // preload common storage files
  useEffect(() => {
    getWorkspace(StorageFiles.WORKSPACE_FILE);
  }, []);

  return (
    <RecoilSync
      storeKey="ProjectWorkspace"
      read={async (key: string) => {
        const [storageFile, componentName] = key.split("|");
        const workspace = await getWorkspace(storageFile);
        return workspace?.project.component.find(
          ({ "@name": name }) => name === componentName
        );
      }}
      write={async ({ diff }) => {
        const changesByFile = groupBy(
          ({ storageFile }) => storageFile,
          [...diff.entries()].map(([key, value]) => {
            const [storageFile, componentName] = key.split("|");
            return {
              storageFile,
              componentName,
              value,
            };
          })
        );

        for (const storageFile in changesByFile) {
          const changes = changesByFile[storageFile];
          const workspace: WorkspaceState = (await readWorkspace(
            resolveStorageFile(storageFile)
          )) || {
            "?xml": { "@version": "1.0", "@encoding": "UTF-8" },
            project: { "@version": "4", component: [] },
          };
          for (const { value, componentName } of changes) {
            const components = workspace.project.component;
            const index = components.findIndex(
              ({ "@name": name }) => name === componentName
            );
            const componentState =
              typeof value === "function"
                ? value(components[index] || null)
                : (value as object);
            components.splice(index, index >= 0 ? 1 : 0, {
              "@name": componentName,
              ...componentState,
            });
          }
          await writeWorkspace(resolveStorageFile(storageFile), workspace);
        }
      }}
    >
      {children}
    </RecoilSync>
  );
}
