type TreeItem = {
  name: string;
  children?: TreeItem[];
};
export const treeItems: TreeItem[] = [
  { name: "index.ts" },
  {
    name: "List",
    children: [
      {
        name: "BasicList",
        children: [
          { name: "BasicList.stories.tsx" },
          { name: "BasicList.tsx" },
          { name: "BasicListItem.tsx" },
          { name: "useBasicList.ts" },
        ],
      },
      {
        name: "SpeedSearchList",
        children: [
          { name: "SpeedSearchList.stories.tsx" },
          { name: "SpeedSearchList.tsx" },
          { name: "SpeedSearchListItem.tsx" },
          { name: "useSpeedSearchList.ts" },
        ],
      },
      { name: "ListDivider.tsx" },
    ],
  },
  { name: "Theme", children: [{ name: "createTheme.ts" }] },
];
