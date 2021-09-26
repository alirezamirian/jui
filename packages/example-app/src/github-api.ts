export interface GithubFileTreeItemBase {
  path: string;
  mode: string;
  sha: string;
  url: string;
}

export interface GithubFileTreeDirItem extends GithubFileTreeItemBase {
  type: "tree";
}
export interface GithubFileTreeFileItem extends GithubFileTreeItemBase {
  type: "blob";
  size: number;
}

export type GithubFileTreeItem = GithubFileTreeDirItem | GithubFileTreeFileItem;

export interface GithubFileTreeResult {
  sha: string;
  url: string;
  tree: GithubFileTreeItem[];
  truncated: boolean;
}

interface GithubContentsFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file";
  content: string;
  encoding: "base64" | unknown;
}
export async function getContentTree(
  repoSlug: string,
  ref = "main"
): Promise<GithubFileTreeResult> {
  const response = await fetch(
    `https://api.github.com/repos/${repoSlug}/git/trees/${ref}?recursive=1`
  );
  if (!response.ok) {
    throw response; // can be improved
  }
  return response.json();
}

export async function getFileContent(
  repoSlug: string,
  path: string,
  ref = "main"
): Promise<string> {
  const response = await fetch(
    `https://api.github.com/repos/${repoSlug}/contents/${path}?ref=${ref}`
  );
  if (!response.ok) {
    throw response; // can be improved
  }
  const data: GithubContentsFile = await response.json();
  if (Array.isArray(data) || data.type !== "file") {
    throw new Error(`Provided path doesn't point to a file: "${path}"`);
  }
  return atob(data.content);
}
