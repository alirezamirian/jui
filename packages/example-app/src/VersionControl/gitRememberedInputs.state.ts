import { atom } from "recoil";
import { persistentAtomEffect } from "../Project/persistence/persistentAtomEffect";
import { array, object, string } from "@recoiljs/refine";
import { ensureArray, MaybeArray } from "../ensureArray";

/**
 * The shape of the <option> tag in the persistence xml file.
 */
type VisitedUrlsOption = {
  list: {
    UrlAndUserName: MaybeArray<{
      option: [
        { "@name": "url"; "@value": string },
        { "@name": "userName"; "@value": string }
      ];
    }>;
  };
};

interface VisitedUrl {
  url: string;
  username?: string;
}

const visitedUrlsChecker = array(
  object({
    url: string(),
    username: string(),
  })
);

export const gitVisitedUrlsState = atom<ReadonlyArray<VisitedUrl>>({
  key: "git.rememberedInputs.visitedUrls",
  default: [],
  effects: [
    persistentAtomEffect.option<ReadonlyArray<VisitedUrl>, VisitedUrlsOption>({
      storageFile: "vcs.xml", // GitRememberedInputs is user-level configuration, kept here temporarily
      componentName: "GitRememberedInputs",
      optionName: "visitedUrls",
      refine: visitedUrlsChecker,
      read: (option) => {
        return ensureArray(option?.list?.UrlAndUserName)
          .map(({ option }) => ({
            url: ensureArray(option).find(
              (option) => option["@name"] === "url"
            )?.["@value"]!,
            username: ensureArray(option).find(
              (option) => option["@name"] === "userName"
            )?.["@value"],
          }))
          .filter((i) => i.url);
      },
      update: (value) => (option) => {
        return {
          ...option,
          list: {
            UrlAndUserName: value.map(({ url, username }) => ({
              option: [
                { "@name": "url", "@value": url },
                { "@name": "userName", "@value": username ?? "" },
              ],
            })),
          },
        };
      },
    }),
  ],
});

export const cloneParentDirState = atom<string>({
  key: "git.rememberedInputs.cloneParentDir",
  default: "",
  effects: [
    persistentAtomEffect.option<string, { "@value": string }>({
      storageFile: "vcs.xml", // GitRememberedInputs is user-level configuration, kept here temporarily
      componentName: "GitRememberedInputs",
      optionName: "cloneParentDir",
      refine: string(),
      read: (option) => {
        return option?.["@value"] ?? "";
      },
      update: (value) => (option) => {
        return {
          ...option,
          "@value": value,
        };
      },
    }),
  ],
});
