import { selectorFamily } from "recoil";
import git from "isomorphic-git";
import { fs } from "../fs/fs";

export type GitUser = { name: string; email: string };

export function areUsersEqual(
  user1: GitUser | null | undefined,
  user2: GitUser | null | undefined
): boolean {
  return (
    Boolean(user1) &&
    user1?.email === user2?.email &&
    user1?.name === user2?.name
  );
}
export function areSamePerson(user1: GitUser, user2: GitUser): boolean {
  return (
    getNameInStandardForm(user1.name) === getNameInStandardForm(user2.name)
  );
}
const NAME_PATTERN = "(\\w+)[\\p{Punct}\\s](\\w+)";

function getNameInStandardForm(name: string) {
  const firstAndLastName = getFirstAndLastName(name);
  if (firstAndLastName != null) {
    const [firstName, lastName] = firstAndLastName;
    return firstName.toLowerCase() + " " + lastName.toLowerCase(); // synonyms detection is currently english-only
  }
  return nameToLowerCase(name);
}

const PRINTABLE_ASCII_PATTERN = "[ -~]*";
function nameToLowerCase(name: string) {
  if (!name.match(PRINTABLE_ASCII_PATTERN)) return name;
  return name.toLowerCase();
}
function getFirstAndLastName(name: string) {
  const matches = name.match(NAME_PATTERN);
  if (matches) {
    return [matches[1], matches[2]];
  }
  return null;
}
export const gitRepoUserState = selectorFamily<GitUser, string>({
  key: "vcs/repo-user",
  get: (repoRoot: string) => async () => {
    const name = await git.getConfig({ fs, dir: repoRoot, path: "user.name" });
    const email = await git.getConfig({
      fs,
      dir: repoRoot,
      path: "user.email",
    });
    return {
      name: name ?? "",
      email: email ?? "",
    };
  },
});
