"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["1759"],{64244:function(e,n,t){t.r(n),t.d(n,{default:()=>u,frontMatter:()=>a,metadata:()=>s,assets:()=>c,toc:()=>l,contentTitle:()=>r});var s=JSON.parse('{"id":"components/Tree","title":"Tree","description":"SpeedSearchTree","source":"@site/docs/components/Tree.mdx","sourceDirName":"components","slug":"/components/Tree","permalink":"/jui/-/pre-push/docs/components/Tree","draft":false,"unlisted":false,"editUrl":"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Tree.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Tooltip","permalink":"/jui/-/pre-push/docs/components/Tooltip"},"next":{"title":"Mnemonic","permalink":"/jui/-/pre-push/docs/advanced/Mnemonic"}}'),o=t("52322"),i=t("22840");let a={},r="Tree",c={},l=[{value:"SpeedSearchTree",id:"speedsearchtree",level:2},{value:"ItemLayout",id:"itemlayout",level:2},{value:"Context Menu",id:"context-menu",level:2},{value:"Advanced use",id:"advanced-use",level:2},{value:"Custom list component with useList and useSpeedSearchList",id:"custom-list-component-with-uselist-and-usespeedsearchlist",level:3}];function d(e){let n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"tree",children:"Tree"})}),"\n",(0,o.jsx)(n.h2,{id:"speedsearchtree",children:"SpeedSearchTree"}),"\n",(0,o.jsx)(n.h2,{id:"itemlayout",children:"ItemLayout"}),"\n",(0,o.jsxs)(n.p,{children:["While you can render any custom content in ",(0,o.jsx)(n.code,{children:"Item"}),"s of a tree, ",(0,o.jsx)(n.code,{children:"ItemLayout"})," is a useful helper component implementing\nthe most common cases. Render different parts of an item, such as icon, text, etc. inside a ",(0,o.jsx)(n.code,{children:"ItemLayout"})," and it handles\nthe layout, and the spacing between them. Some common parts that require a special style are implemented as components\naccessible on ",(0,o.jsx)(n.code,{children:"ItemLayout"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",metastring:"live themed",live:!0,children:'<SpeedSearchTree selectionMode="multiple">\n  <Item textValue="jui">\n    <ItemLayout>\n      <PlatformIcon icon="nodes/folder" />\n      <HighlightedTextValue />\n      <ItemLayout.Hint>~/workspace/jui</ItemLayout.Hint>\n    </ItemLayout>\n  </Item>\n</SpeedSearchTree>\n'})}),"\n",(0,o.jsx)(n.h2,{id:"context-menu",children:"Context Menu"}),"\n",(0,o.jsxs)(n.p,{children:["In order to have context menu for tree nodes, just wrap the tree in a ",(0,o.jsx)(n.code,{children:"ContextMenuContainer"}),". When the context menu\nis triggered on an item, the selection is also updated right before the context menu opens, so you can render the\ncontext menu based on the selected tree node(s)."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",metastring:"live themed noPadding",live:!0,children:'function TreeContextMenuExample() {\n  const treeItems = [\n    {\n      type: "file",\n      name: "ToolWindowState.test.ts",\n      items: [\n        {\n          type: "spec",\n          name: "tool window state",\n          items: [\n            {\n              type: "case",\n              name: "hide or show return the same state if the key doesn\'t exist in the state",\n            },\n            {\n              type: "case",\n              name: "hide returns the same state if the window is already not visible",\n            },\n            {\n              type: "case",\n              name: "hiding a tool window only toggles the visibility of that window",\n            },\n          ],\n        },\n      ],\n    },\n  ];\n  const getAllKeys = (items) =>\n    items.flatMap((item) => [item.name, ...getAllKeys(item.items || [])]);\n  const allKeys = getAllKeys(treeItems);\n  const [selectedKeys, setSelectedKeys] = useState(new Set());\n\n  return (\n    <ContextMenuContainer\n      renderMenu={() => {\n        const selectedKey = Array.from(selectedKeys)[0];\n        if (!selectedKey) {\n          return (\n            <Menu>\n              <Item>Nothing here</Item>\n            </Menu>\n          );\n        }\n        return (\n          <Menu>\n            <Item textValue={`Run \'${selectedKey}\'`}>\n              <MenuItemLayout\n                icon={<PlatformIcon icon="debugger/threadRunning.svg" />}\n                content={`Run \'${selectedKey}\'`}\n                shortcut="\u2303\u21E7R"\n              />\n            </Item>\n            <Item textValue={`Debug \'${selectedKey}\'`}>\n              <MenuItemLayout\n                icon={<PlatformIcon icon="actions/startDebugger.svg" />}\n                content={`Debug \'${selectedKey}\'`}\n                shortcut="\u2303\u21E7D"\n              />\n            </Item>\n            <Divider />\n            <Item textValue="Jump to source">\n              <MenuItemLayout\n                icon={<PlatformIcon icon="actions/editSource.svg" />}\n                content="Jump to source"\n                shortcut="\u2318\u2193"\n              />\n            </Item>\n          </Menu>\n        );\n      }}\n    >\n      <SpeedSearchTree\n        items={treeItems}\n        fillAvailableSpace\n        selectionMode="single"\n        defaultExpandedKeys={allKeys}\n        keepSearchActiveOnBlur\n        selectedKeys={selectedKeys}\n        onSelectionChange={setSelectedKeys}\n      >\n        {(item) => (\n          <Item key={item.name} textValue={item.name} childItems={item.items}>\n            <ItemLayout>\n              <PlatformIcon icon="runConfigurations/testPassed.svg" />\n              <HighlightedTextValue />\n            </ItemLayout>\n          </Item>\n        )}\n      </SpeedSearchTree>\n    </ContextMenuContainer>\n  );\n}\n'})}),"\n",(0,o.jsx)(n.h2,{id:"advanced-use",children:"Advanced use"}),"\n",(0,o.jsx)(n.h3,{id:"custom-list-component-with-uselist-and-usespeedsearchlist",children:"Custom list component with useList and useSpeedSearchList"})]})}function u(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}}}]);
//# sourceMappingURL=65a4d95d.f80a3a8a.js.map