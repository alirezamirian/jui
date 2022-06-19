import React, { useEffect } from "react";

const isLocal = process.env.NODE_ENV === "development";

/**
 * During website's build, storybook build is copied to "/storybook" on the docusaurus build output, and served
 * statically, in prod. Therefore, the links to "/storybook" must have a target "_blank" or "_self", causing a hard
 * refresh. There are two reasons this component is added here:
 * - Prevent "/storybook" from being detected as a broken link. Otherwise, we would need to downgrade `onBrokenLinks`
 *   to "warn" to let the build succeed, which is not good.
 * - In local development, redirect to storybook.
 *   If for any reason this component is rendered on production env (for example a link to storybook without proper
 *   `target` is rendered somewhere), the best we can do is to suggest refreshing the page, which should serve
 *   storybook statically.
 */
export default function (): React.ReactNode {
  useEffect(() => {
    if (isLocal) {
      window.location.href = "http://localhost:6008/";
    }
  }, []);
  return isLocal ? (
    "Redirecting to storybook..."
  ) : (
    <div>
      You are not supposed to land on this page. Try refreshing this page.
    </div>
  );
}
