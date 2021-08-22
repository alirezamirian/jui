import { IconResolver } from "./types";

export class GithubIconResolver implements IconResolver {
  async resolve(iconPath: string) {
    return resolve(
      `https://raw.githubusercontent.com/JetBrains/intellij-community/master/${iconPath}`
    );
  }
}
async function resolve(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`failed to fetch icon from url: ${url}`);
  }
  return response.text();
}
