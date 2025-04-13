import { z } from "zod";
import { atomWithPersistence } from "../persistence/atomWithPersistence";
import { list, maybeArray } from "../persistence/schema-utils";
import { focusAtom } from "jotai-optics";

interface VisitedUrl {
  url: string;
  username?: string;
}

const visitedUrlsSchema = z.object({
  "@name": z.enum(["visitedUrls"]),
  list: list(
    z.object({
      option: maybeArray(
        z.union([
          z.object({
            "@name": z.enum(["url"]),
            "@value": z.string(),
          }),
          z.object({
            "@name": z.enum(["userName"]),
            "@value": z.string(),
          }),
        ])
      ),
    }),
    "UrlAndUserName"
  ),
});
const cloneParentDirSchema = z.object({
  "@name": z.enum(["cloneParentDir"]),
  "@value": z.string(),
});
const gitRememberedInputsSchema = z.object({
  option: maybeArray(z.union([visitedUrlsSchema, cloneParentDirSchema])),
});

type VisitedUrlsOption = (typeof visitedUrlsSchema)["_output"];
type CloneParentDirOption = (typeof cloneParentDirSchema)["_output"];

type GitRememberedInput = {
  visitedUrls: VisitedUrl[];
  cloneParentDir: string;
};
const gitRememberedInputsAtom = atomWithPersistence(
  {
    storageFile: "vcs.xml", // GitRememberedInputs is user-level configuration, kept here temporarily
    componentName: "GitRememberedInputs",
    schema: gitRememberedInputsSchema,
    read: ({ option: options } = { option: [] }): GitRememberedInput => {
      return {
        visitedUrls:
          options
            ?.find(
              (option): option is VisitedUrlsOption =>
                option["@name"] === "visitedUrls"
            )
            ?.list.UrlAndUserName.map(
              ({ option }): { url: string; username?: string | undefined } => ({
                url: option.find((option) => option["@name"] === "url")?.[
                  "@value"
                ]!,
                username: option.find(
                  (option) => option["@name"] === "userName"
                )?.["@value"],
              })
            )
            .filter((i) => i.url) ?? [],
        cloneParentDir:
          options?.find(
            (option): option is CloneParentDirOption =>
              option["@name"] === "cloneParentDir"
          )?.["@value"] ?? "",
      };
    },
    write: (value, state): (typeof gitRememberedInputsSchema)["_output"] => {
      return {
        ...state,
        option:
          state.option?.map((option) => {
            if (option["@name"] === "cloneParentDir" && value.cloneParentDir) {
              return {
                "@name": "cloneParentDir",
                "@value": value.cloneParentDir,
              };
            }
            if (option["@name"] === "visitedUrls" && value.visitedUrls) {
              return {
                "@name": "visitedUrls",
                list: {
                  UrlAndUserName: value.visitedUrls.map(
                    ({ url, username }) => ({
                      option: [
                        { "@name": "url", "@value": url },
                        { "@name": "userName", "@value": username ?? "" },
                      ],
                    })
                  ),
                },
              };
            }
            return option;
          }) ?? [],
      };
    },
  },
  {
    visitedUrls: [],
    cloneParentDir: "",
  } as GitRememberedInput
);

export const gitVisitedUrlsAtom = focusAtom(gitRememberedInputsAtom, (optic) =>
  optic.path("visitedUrls")
);

export const cloneParentDirAtom = focusAtom(gitRememberedInputsAtom, (optic) =>
  optic.path("cloneParentDir")
);
