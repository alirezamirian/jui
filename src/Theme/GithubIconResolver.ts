import { IconResolver } from "./types";

export class GithubIconResolver implements IconResolver {
  async resolveThemeIcon(icon: string): Promise<string> {
    return resolve(
      `https://raw.githubusercontent.com/JetBrains/intellij-community/master/platform/platform-impl/src/${icon}`
    );
  }

  async resolvePlatformIcon(srcRelativeIconPath: string): Promise<string> {
    return resolve(
      `//https://raw.githubusercontent.com/JetBrains/intellij-community/master/platform/icons/src/${srcRelativeIconPath}`
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
