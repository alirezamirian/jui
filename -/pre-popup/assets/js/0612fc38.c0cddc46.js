"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7695],{26788:(e,t,n)=>{n.d(t,{e:()=>o});var i=n(2784);const o=e=>{let{path:t,name:n}=e;return i.createElement("a",{href:"https://github.com/JetBrains/intellij-community/blob/master/"+t,target:"_blank"},n||t.split("/").pop())};o.__docgenInfo={description:"To make relation between things in jui and original reference impl in Intellij Platform",methods:[],displayName:"RefToIntellijPlatform",props:{path:{required:!0,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""}}}},50349:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var i=n(28427),o=(n(2784),n(30876));n(26788),n(30439);const a={},r="Menu",l={unversionedId:"components/Menu",id:"components/Menu",title:"Menu",description:"Features",source:"@site/docs/components/Menu.mdx",sourceDirName:"components",slug:"/components/Menu",permalink:"/jui/-/pre-popup/docs/components/Menu",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Menu.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"List",permalink:"/jui/-/pre-popup/docs/components/List"},next:{title:"ModalWindow",permalink:"/jui/-/pre-popup/docs/components/ModalWindow"}},m={},s=[{value:"Features",id:"features",level:3},{value:"Remaining",id:"remaining",level:4},{value:"Known differences",id:"known-differences",level:4},{value:"Menu",id:"menu-1",level:2},{value:"Static API",id:"static-api",level:3},{value:"Dynamic API",id:"dynamic-api",level:3},{value:"MenuItemLayout",id:"menuitemlayout",level:3},{value:"Selection",id:"selection",level:3},{value:"Disabled items",id:"disabled-items",level:3},{value:"Full Example",id:"full-example",level:3},{value:"MenuTrigger",id:"menutrigger",level:2},{value:"Positioning options",id:"positioning-options",level:3},{value:"Controlled and uncontrolled",id:"controlled-and-uncontrolled",level:3},{value:"Focus restoration",id:"focus-restoration",level:3},{value:"ContextMenu",id:"contextmenu",level:2}],u={toc:s};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"menu"},"Menu"),(0,o.kt)("h3",{id:"features"},"Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Nested menu items"),(0,o.kt)("li",{parentName:"ul"},"Check-able menu items"),(0,o.kt)("li",{parentName:"ul"},"Default menu layout with icon, text and keyboard shortcut"),(0,o.kt)("li",{parentName:"ul"},"Full keyboard support"),(0,o.kt)("li",{parentName:"ul"},"Viewport-aware positioning with respect to a trigger.")),(0,o.kt)("h4",{id:"remaining"},"Remaining"),(0,o.kt)("ul",{className:"contains-task-list"},(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Advanced hover behaviour, which detects attempt to go to submenu and doesn't close the menu on mouse out.")),(0,o.kt)("h4",{id:"known-differences"},"Known differences"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"In the reference impl, hovering over disabled items removes previously highlighted menu item. Here it preserves\nit."),(0,o.kt)("li",{parentName:"ul"},"In the reference impl, there is a delay in opening submenu"),(0,o.kt)("li",{parentName:"ul"},"Moving mouse out of the menu de-highlights currently highlighted menu, if it's not a menu item with a nested menu.\nHere menu items are not de-highlighted when mouse goes away from the menu.")),(0,o.kt)("h2",{id:"menu-1"},"Menu"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Menu")," component implements the UI of the menu itself. While ",(0,o.kt)("a",{parentName:"p",href:"#menutrigger"},"MenuTrigger")," implements how the menu is opened via a\ntrigger and positioned with respect to it."),(0,o.kt)("p",null,"Similar to all ",(0,o.kt)("a",{parentName:"p",href:"../guides/Collections"},"collection components"),", there are two ways for defining menu items: as jsx, in\nchildren (static), and via ",(0,o.kt)("inlineCode",{parentName:"p"},"items")," prop (dynamic)."),(0,o.kt)("h3",{id:"static-api"},"Static API"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Item")," component can be rendered in the children of ",(0,o.kt)("inlineCode",{parentName:"p"},"Menu")," to define the menu items. It's best suited for the use cases\nwhere the menu items are static. Use ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," to give each item a unique identifier, which is used in props on ",(0,o.kt)("inlineCode",{parentName:"p"},"onAction"),",\nor ",(0,o.kt)("inlineCode",{parentName:"p"},"disabledKeys"),". If ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," is not provided, an index-based auto-generated key will be assigned to each item."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"If the content of an ",(0,o.kt)("inlineCode",{parentName:"p"},"Item")," is not plain text, use ",(0,o.kt)("inlineCode",{parentName:"p"},"textValue")," to specify the plain text value for the item. It's needed\nfor making the menu item accessible via type-to-select.")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Render ",(0,o.kt)("inlineCode",{parentName:"p"},"Item"),"s inside another ",(0,o.kt)("inlineCode",{parentName:"p"},"Item")," to create nested menu. The parent item's content is provided via ",(0,o.kt)("inlineCode",{parentName:"p"},"title")," prop, in\nthis case.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'// import { Item, Menu } from "@intellij-platform/core";\n\n<Menu>\n  <Item key="copy">Copy</Item>\n  <Item key="cut" textValue="Cut">\n    <span>Cut</span>\n  </Item>\n  <Item title="History">\n    <Item>Show History</Item>\n    <Item>Put Label</Item>\n  </Item>\n</Menu>\n')),(0,o.kt)("h3",{id:"dynamic-api"},"Dynamic API"),(0,o.kt)("p",null,"While you can also dynamically map a list of objects to rendered ",(0,o.kt)("inlineCode",{parentName:"p"},"Item"),"s, ",(0,o.kt)("inlineCode",{parentName:"p"},"items")," prop is designed for dynamically\nrendering menu items based on an array of objects. Then you use a render function in children, to specify how each\nitem should be mapped to an ",(0,o.kt)("inlineCode",{parentName:"p"},"Item")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Section"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'// import { Item, Menu } from "@intellij-platform/core";\n\n<Menu\n  items={[\n    { name: "Copy" },\n    { name: "Cut" },\n    {\n      name: "History",\n      children: [{ name: "Show History" }, { name: "Put Label" }],\n    },\n  ]}\n>\n  {(item) => (\n    <Item key={item.name} childItems={item.children}>\n      {item.name}\n    </Item>\n  )}\n</Menu>\n')),(0,o.kt)("h3",{id:"menuitemlayout"},"MenuItemLayout"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"MenuItemLayout")," can be rendered inside ",(0,o.kt)("inlineCode",{parentName:"p"},"Item"),", when plain text is not enough for a menu item. ",(0,o.kt)("inlineCode",{parentName:"p"},"MenuItemLayout")," has\nthree parts:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"An icon rendered before the menu item text"),(0,o.kt)("li",{parentName:"ul"},"The text content of the menu item"),(0,o.kt)("li",{parentName:"ul"},"Shortcut rendered on the right side.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'<Menu>\n  <Item>\n    <MenuItemLayout\n      icon={<PlatformIcon icon={"actions/copy"} />}\n      content="Copy"\n      shortcut={"\u2318C"}\n    />\n  </Item>\n</Menu>\n')),(0,o.kt)("h3",{id:"selection"},"Selection"),(0,o.kt)("p",null,"Menu items can be marked as selected via ",(0,o.kt)("inlineCode",{parentName:"p"},"selectedKeys"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'<Menu selectedKeys={["enablePreviewTab"]}>\n  <Item key="enablePreviewTab">Enable Preview Tab</Item>\n  <Item key="fileNesting">File Nesting...</Item>\n</Menu>\n')),(0,o.kt)("p",null,"There is no ",(0,o.kt)("inlineCode",{parentName:"p"},"onSelectedKeys")," change callback. You should use ",(0,o.kt)("inlineCode",{parentName:"p"},"onAction")," and adjust ",(0,o.kt)("inlineCode",{parentName:"p"},"selectedKeys")," if needed."),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"If a selected menu item renders ",(0,o.kt)("inlineCode",{parentName:"p"},"MenuItemLayout")," with an icon, the checkmark icon will replace the menu item icon.")),(0,o.kt)("h3",{id:"disabled-items"},"Disabled items"),(0,o.kt)("p",null,"Menu items can be disabled through ",(0,o.kt)("inlineCode",{parentName:"p"},"disabledKeys")," prop on the ",(0,o.kt)("inlineCode",{parentName:"p"},"Menu"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'<Menu disabledKeys={["paste"]}>\n  <Item key="copy">Copy</Item>\n  <Item key="paste">Paste</Item>\n  <Item key="cut">Cut</Item>\n</Menu>\n')),(0,o.kt)("h3",{id:"full-example"},"Full Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'<Menu\n  disabledKeys={["jumpToExternalEditor"]}\n  onAction={(key) => alert(`Selected: ${key}`)}\n>\n  <Item textValue="Cut">\n    <MenuItemLayout\n      icon={<PlatformIcon icon={"actions/menu-cut"} />}\n      content="Cut"\n      shortcut={"\u2318X"}\n    />\n  </Item>\n  <Item textValue="Copy">\n    <MenuItemLayout\n      icon={<PlatformIcon icon={"actions/copy"} />}\n      content="Copy"\n      shortcut={"\u2318C"}\n    />\n  </Item>\n  <Item textValue="Paste">\n    <MenuItemLayout\n      icon={<PlatformIcon icon={"actions/menu-paste"} />}\n      content="Paste"\n      shortcut={"\u2318V"}\n    />\n  </Item>\n  <Divider />\n  <Item>Reformat Code</Item>\n  <Item textValue="Optimize Imports">\n    <MenuItemLayout content="Optimize Imports" shortcut={"\u2303\u2325O"} />\n  </Item>\n  <Item textValue="Delete">\n    <MenuItemLayout content="Delete" shortcut={"\u232b"} />\n  </Item>\n  <Divider />\n  <Item textValue="Compare with...">\n    <MenuItemLayout\n      icon={<PlatformIcon icon={"actions/diff"} />}\n      content="Compare with..."\n    />\n  </Item>\n  <Divider />\n  <Item key="jumpToExternalEditor" textValue="Jump to external editor">\n    <MenuItemLayout content="Jump to external editor" shortcut={"\u2325\u2318F4"} />\n  </Item>\n  <Divider />\n  <Item title={<MenuItemLayout content="History" />}>\n    <Item>Show History</Item>\n    <Item>Put label</Item>\n  </Item>\n</Menu>\n')),(0,o.kt)("h2",{id:"menutrigger"},"MenuTrigger"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"MenuTrigger")," links a menu to a trigger for the menu. It handles the opening/closing logic and renders the menu as an\noverlay, positioned with respect to the trigger element. ",(0,o.kt)("inlineCode",{parentName:"p"},"children")," of ",(0,o.kt)("inlineCode",{parentName:"p"},"MenuTrigger")," must be a render function which\nrenders the trigger. It's invoked with props and ref to be passed down to the trigger element."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Currently, menu is closed when a menu action is triggered. For some actions (e.g. toggleable view options), that's not\nthe best UX. In future releases, there will be a way to control if the menu should be kept open after the triggered\naction.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live themed",live:!0,themed:!0},'<MenuTrigger\n  renderMenu={({ menuProps }) => (\n    <Menu\n      {...menuProps}\n      onAction={(key) => {\n        console.log(key);\n      }}\n    >\n      <Item textValue="Cut">\n        <MenuItemLayout\n          icon={<PlatformIcon icon={"actions/menu-cut"} />}\n          content="Cut"\n          shortcut={"\u2318X"}\n        />\n      </Item>\n      <Item textValue="Copy">\n        <MenuItemLayout\n          icon={<PlatformIcon icon={"actions/copy"} />}\n          content="Copy"\n          shortcut={"\u2318C"}\n        />\n      </Item>\n      <Item textValue="Paste">\n        <MenuItemLayout\n          icon={<PlatformIcon icon={"actions/menu-paste"} />}\n          content="Paste"\n          shortcut={"\u2318V"}\n        />\n      </Item>\n    </Menu>\n  )}\n>\n  {(props, ref) => (\n    <ActionButton {...props} ref={ref}>\n      <PlatformIcon icon={"general/gearPlain"} />\n    </ActionButton>\n  )}\n</MenuTrigger>\n')),(0,o.kt)("h3",{id:"positioning-options"},"Positioning options"),(0,o.kt)("p",null,"TODO"),(0,o.kt)("h3",{id:"controlled-and-uncontrolled"},"Controlled and uncontrolled"),(0,o.kt)("p",null,"TODO"),(0,o.kt)("h3",{id:"focus-restoration"},"Focus restoration"),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"restoreFocus")," to have focus restored to the trigger, after the menu is closed. While it's an accessibility best\npractice to restore the focus, ",(0,o.kt)("inlineCode",{parentName:"p"},"restoreFocus")," is ",(0,o.kt)("inlineCode",{parentName:"p"},"false")," by default. That is based on the observed majority of the use\ncases in Intellij Platform applications."),(0,o.kt)("h2",{id:"contextmenu"},"ContextMenu"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ContextMenuContainer")," provides a generic container component that is capable of opening a context menu. You can use it\nas a wrapper for ",(0,o.kt)("a",{parentName:"p",href:"./List"},"List"),", ",(0,o.kt)("a",{parentName:"p",href:"./Tree"},"Tree"),", or anything else, to let them have a context menu."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live noPadding",live:!0,noPadding:!0},'<ContextMenuContainer\n  renderMenu={() => (\n    <Menu>\n      <Item textValue="Open in Right Split">\n        <MenuItemLayout\n          icon={<PlatformIcon icon={"actions/splitVertically.svg"} />}\n          content="Open in Right Split"\n          shortcut={"\u21e7\u23ce"}\n        />\n      </Item>\n      <Item textValue="Open in Right Split">\n        <MenuItemLayout\n          content="Open in Split with Chooser..."\n          shortcut={"\u2325\u21e7\u23ce"}\n        />\n      </Item>\n      <Item title="Open in">\n        <Item>Finder</Item>\n        <Item>Terminal</Item>\n        <Item textValue="Github">\n          <MenuItemLayout\n            icon={<PlatformIcon icon={"vcs/vendors/github.svg"} />}\n            content="Github"\n          />\n        </Item>\n      </Item>\n    </Menu>\n  )}\n>\n  <div style={{ padding: "5vw", textAlign: "center" }}>\n    Right click somewhere to open the context menu.\n  </div>\n</ContextMenuContainer>\n')),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"In future versions, there might be an integrated support for context menu in List, Tree, etc. But for now it's done\njust by composition of those components and ",(0,o.kt)("inlineCode",{parentName:"p"},"ContextMenuContainer"),". A caveat to have in mind is the extra wrapper\nelement that will be added if you want context menu, which may need some styling to have no effect on the layout.")))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=0612fc38.c0cddc46.js.map