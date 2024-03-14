export type GitRef =
  | {
      type: "head";
      name: "HEAD" /* just so name consistently exist on all types which makes it more convenient to work it*/;
    }
  | {
      type: "localBranch";
      name: string;
      trackingBranch: string | null;
      isCurrent: boolean;
    }
  | { type: "remoteBranch"; name: string }
  | { type: "tag"; name: string };
