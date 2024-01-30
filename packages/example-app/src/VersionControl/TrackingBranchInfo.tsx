import path from "path";
import React from "react";

import { LocalBranch } from "./Branches/branches.state";

export function TrackingBranchInfo({
  branches,
}: {
  branches: Array<{ repoRoot: string; branch: LocalBranch }>;
}) {
  return (
    <table style={{ borderSpacing: 0 }}>
      {branches.map(({ branch, repoRoot }) => {
        const mapping = branch.trackingBranch
          ? `${branch.name} → ${branch.trackingBranch}`
          : branches.length > 1
          ? `${branch.name} (no tracking branch)`
          : "No tracking branch";

        return branches.length > 1 ? (
          <tr key={repoRoot}>
            <td>{path.basename(repoRoot)}: &nbsp;</td>
            <td>{mapping}</td>
          </tr>
        ) : (
          <tr key={repoRoot}>
            <td>{mapping}</td>
          </tr>
        );
      })}
    </table>
  );
}
