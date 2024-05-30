"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8754],{46269:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var o=n(7896),s=(n(2784),n(30876));const a={},i="Tree",r={unversionedId:"components/Tree",id:"components/Tree",title:"Tree",description:"SpeedSearchTree",source:"@site/docs/components/Tree.mdx",sourceDirName:"components",slug:"/components/Tree",permalink:"/jui/docs/components/Tree",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Tree.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tooltip",permalink:"/jui/docs/components/Tooltip"},next:{title:"Mnemonic",permalink:"/jui/docs/advanced/Mnemonic"}},c={},l=[{value:"SpeedSearchTree",id:"speedsearchtree",level:2},{value:"ItemLayout",id:"itemlayout",level:2},{value:"Context Menu",id:"context-menu",level:2},{value:"Advanced use",id:"advanced-use",level:2},{value:"Custom list component with useList and useSpeedSearchList",id:"custom-list-component-with-uselist-and-usespeedsearchlist",level:3}],m={toc:l};function u(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"tree"},"Tree"),(0,s.kt)("h2",{id:"speedsearchtree"},"SpeedSearchTree"),(0,s.kt)("h2",{id:"itemlayout"},"ItemLayout"),(0,s.kt)("p",null,"While you can render any custom content in ",(0,s.kt)("inlineCode",{parentName:"p"},"Item"),"s of a tree, ",(0,s.kt)("inlineCode",{parentName:"p"},"ItemLayout")," is a useful helper component implementing\nthe most common cases. Render different parts of an item, such as icon, text, etc. inside a ",(0,s.kt)("inlineCode",{parentName:"p"},"ItemLayout")," and it handles\nthe layout, and the spacing between them. Some common parts that require a special style are implemented as components\naccessible on ",(0,s.kt)("inlineCode",{parentName:"p"},"ItemLayout"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'<SpeedSearchTree selectionMode="multiple">\n  <Item textValue="jui">\n    <ItemLayout>\n      <PlatformIcon icon="nodes/folder" />\n      <HighlightedTextValue />\n      <ItemLayout.Hint>~/workspace/jui</ItemLayout.Hint>\n    </ItemLayout>\n  </Item>\n</SpeedSearchTree>\n')),(0,s.kt)("h2",{id:"context-menu"},"Context Menu"),(0,s.kt)("p",null,"In order to have context menu for tree nodes, just wrap the tree in a ",(0,s.kt)("inlineCode",{parentName:"p"},"ContextMenuContainer"),". When the context menu\nis triggered on an item, the selection is also updated right before the context menu opens, so you can render the\ncontext menu based on the selected tree node(s)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed noPadding",live:!0,themed:!0,noPadding:!0},'function TreeContextMenuExample() {\n  const treeItems = [\n    {\n      type: "file",\n      name: "ToolWindowState.test.ts",\n      items: [\n        {\n          type: "spec",\n          name: "tool window state",\n          items: [\n            {\n              type: "case",\n              name: "hide or show return the same state if the key doesn\'t exist in the state",\n            },\n            {\n              type: "case",\n              name: "hide returns the same state if the window is already not visible",\n            },\n            {\n              type: "case",\n              name: "hiding a tool window only toggles the visibility of that window",\n            },\n          ],\n        },\n      ],\n    },\n  ];\n  const getAllKeys = (items) =>\n    items.flatMap((item) => [item.name, ...getAllKeys(item.items || [])]);\n  const allKeys = getAllKeys(treeItems);\n  const [selectedKeys, setSelectedKeys] = useState(new Set());\n\n  return (\n    <ContextMenuContainer\n      renderMenu={() => {\n        const selectedKey = Array.from(selectedKeys)[0];\n        if (!selectedKey) {\n          return (\n            <Menu>\n              <Item>Nothing here</Item>\n            </Menu>\n          );\n        }\n        return (\n          <Menu>\n            <Item textValue={`Run \'${selectedKey}\'`}>\n              <MenuItemLayout\n                icon={<PlatformIcon icon="debugger/threadRunning.svg" />}\n                content={`Run \'${selectedKey}\'`}\n                shortcut="\u2303\u21e7R"\n              />\n            </Item>\n            <Item textValue={`Debug \'${selectedKey}\'`}>\n              <MenuItemLayout\n                icon={<PlatformIcon icon="actions/startDebugger.svg" />}\n                content={`Debug \'${selectedKey}\'`}\n                shortcut="\u2303\u21e7D"\n              />\n            </Item>\n            <Divider />\n            <Item textValue="Jump to source">\n              <MenuItemLayout\n                icon={<PlatformIcon icon="actions/editSource.svg" />}\n                content="Jump to source"\n                shortcut="\u2318\u2193"\n              />\n            </Item>\n          </Menu>\n        );\n      }}\n    >\n      <SpeedSearchTree\n        items={treeItems}\n        fillAvailableSpace\n        selectionMode="single"\n        defaultExpandedKeys={allKeys}\n        keepSearchActiveOnBlur\n        selectedKeys={selectedKeys}\n        onSelectionChange={setSelectedKeys}\n      >\n        {(item) => (\n          <Item key={item.name} textValue={item.name} childItems={item.items}>\n            <ItemLayout>\n              <PlatformIcon icon="runConfigurations/testPassed.svg" />\n              <HighlightedTextValue />\n            </ItemLayout>\n          </Item>\n        )}\n      </SpeedSearchTree>\n    </ContextMenuContainer>\n  );\n}\n')),(0,s.kt)("h2",{id:"advanced-use"},"Advanced use"),(0,s.kt)("h3",{id:"custom-list-component-with-uselist-and-usespeedsearchlist"},"Custom list component with useList and useSpeedSearchList"))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=65a4d95d.fdfd0b97.js.map