"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1569],{93918:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>k,contentTitle:()=>u,default:()=>f,frontMatter:()=>c,metadata:()=>h,toc:()=>v});var o=n(7896),i=n(2784),a=n(30876),l=n(7229),d=n(89817),s=n(90077);const r=n(3411).ZP.iframe.withConfig({displayName:"EmbeddedStory__StyledIframe",componentId:"sc-p6vwno-0"})(["width:100%;border:none;"]),w=i.createElement("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24",className:"iconExternalLink__-_-node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"},i.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})),p=e=>{let{height:t=450,storyId:n}=e;const{withBaseUrl:o}=(0,s.C)();return i.createElement(i.Fragment,null,i.createElement(d.Z,{href:"/storybook/?path=/story/"+n,target:"_blank"},"Open in storybook",w),i.createElement(r,{style:{height:t},src:o("/storybook/iframe.html?id="+n+"&args=&viewMode=story")}))};var m=n(58129);const c={},u="ToolWindows",h={unversionedId:"components/ToolWindows",id:"components/ToolWindows",title:"ToolWindows",description:"ToolWindows is the main component in Intellij applications. It's consisted of a main content in the center (typically",source:"@site/docs/components/ToolWindows.mdx",sourceDirName:"components",slug:"/components/ToolWindows",permalink:"/jui/docs/components/ToolWindows",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/ToolWindows.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Theme",permalink:"/jui/docs/components/Theme"},next:{title:"Tree",permalink:"/jui/docs/components/Tree"}},k={},v=[{value:"Simple example",id:"simple-example",level:2},{value:"Tool window components",id:"tool-window-components",level:2},{value:"DefaultToolWindow",id:"defaulttoolwindow",level:3},{value:"MultiViewToolWindow",id:"multiviewtoolwindow",level:3},{value:"Multi view tool window header",id:"multi-view-tool-window-header",level:4},{value:"MultiViewToolWindow story",id:"multiviewtoolwindow-story",level:4},{value:"ToolWindowsState",id:"toolwindowsstate",level:2},{value:"State of a single tool window",id:"state-of-a-single-tool-window",level:3},{value:"Advanced API",id:"advanced-api",level:2},{value:"Hiding tool window bars",id:"hiding-tool-window-bars",level:3},{value:"Wide screen layout",id:"wide-screen-layout",level:3},{value:"useToolWindowState",id:"usetoolwindowstate",level:3}],g={toc:v};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"toolwindows"},"ToolWindows"),(0,a.kt)(l.e,{path:"platform/platform-impl/src/com/intellij/toolWindow/ToolWindowPane.kt",mdxType:"RefToIntellijPlatform"}),(0,a.kt)("p",null,"ToolWindows is the main component in Intellij applications. It's consisted of a main content in the center (typically\nthe editor), and a number of tool windows, typically positioned around the main area. Each side of the main area, can\nhost two groups of tool windows (Primary and Secondary), and tool windows can be moved across all these groups.\nThey can also be rendered as floating windows. Read more about tool windows, in\n",(0,a.kt)("a",{parentName:"p",href:"https://plugins.jetbrains.com/docs/intellij/tool-windows.html?from=jetbrains.org"},"Intellij Platform Plugin SDK"),",\nor in ",(0,a.kt)("a",{parentName:"p",href:"https://jetbrains.github.io/ui/components/tool_window/#tool-window-structure"},"jetbrains design system website"),"."),(0,a.kt)("h2",{id:"simple-example"},"Simple example"),(0,a.kt)("p",null,"Bellow is a simple usage of ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindows"),". Main content goes into ",(0,a.kt)("inlineCode",{parentName:"p"},"children"),", and the state of tool windows is\ncontrolled via ",(0,a.kt)("inlineCode",{parentName:"p"},"toolWindowsState")," prop. Tool windows are identified by a unique string id.\nTry moving tool windows to different anchors."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed noInline",live:!0,themed:!0,noInline:!0},'const StyledContent = styled.div`\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  color: rgba(255, 255, 255, 0.4);\n`;\n\nconst App = () => {\n  const [toolWindowsState, setToolWindowsState] = useState(\n    new ToolWindowsState({\n      Project: toolWindowState({ isVisible: true }),\n      Commit: toolWindowState({ isSplit: true }),\n      Run: toolWindowState({ anchor: "bottom", isVisible: true }),\n    })\n  );\n  return (\n    <ToolWindows\n      toolWindowsState={toolWindowsState}\n      // called when the state is changed because of some UI interaction, e.g. opening/closing a tool window.\n      onToolWindowStateChange={setToolWindowsState}\n      renderWindow={(id) => <StyledContent>{id}</StyledContent>} // a function from id to the content of the tool window\n      renderToolbarButton={(id) => id} // what to render in the tool window tab/button, in the tool window bars\n      height={500} // Use `100vh` if it\'s the only top level component in your app.\n      margin="-1rem" // just to counteract the default padding in Live Preview\n    >\n      <StyledContent style={{ background: "#2b2b2b" }}>\n        Main content\n      </StyledContent>\n    </ToolWindows>\n  );\n};\nrender(<App />);\n')),(0,a.kt)("h2",{id:"tool-window-components"},"Tool window components"),(0,a.kt)("p",null,"While any content can be rendered in a tool window, there are a few built-in components that implement a header and\ncontent tool window view according to\n",(0,a.kt)("a",{parentName:"p",href:"https://jetbrains.github.io/ui/components/tool_window"},"Intellij Platform UI Guidelines"),"."),(0,a.kt)("h3",{id:"defaulttoolwindow"},"DefaultToolWindow"),(0,a.kt)("p",null,"Implements a header and content view, where a title and some action buttons are displayed in the header.\n",(0,a.kt)("inlineCode",{parentName:"p"},"additionalActions")," prop can be used to render extra action buttons before the default action buttons: Options\n(",(0,a.kt)(m.PlatformIcon,{style:{verticalAlign:"middle"},icon:"general/gearPlain",mdxType:"PlatformIcon"}),") and Hide (",(0,a.kt)(m.PlatformIcon,{style:{verticalAlign:"middle"},icon:"general/hideToolWindow",mdxType:"PlatformIcon"}),")."),(0,a.kt)("p",null,"Features provided by Options menu:"),(0,a.kt)("ul",{className:"contains-task-list"},(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",'"Stretch to left" resize action in options menu'),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",'"Stretch to right" resize action in options menu'),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Maximize resize action in options menu"),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",'"Move to" actions in options menu to change the tool window anchor'),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",'"View Mode" actions in options menu to change the ',(0,a.kt)("inlineCode",{parentName:"li"},"viewMode"),' of the tool window between "Dock Pinned",\n"Dock Unpinned", "Undock", and "Float".'),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ","Hide button, which toggles ",(0,a.kt)("inlineCode",{parentName:"li"},"isVisible")," of the tool window state.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed noInline",live:!0,themed:!0,noInline:!0},'const StyledContent = styled.div`\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  color: rgba(255, 255, 255, 0.4);\n`;\n\nconst App = () => {\n  const [toolWindowsState, setToolWindowsState] = useState(\n    new ToolWindowsState({\n      Project: toolWindowState({ isVisible: true }),\n      Commit: toolWindowState({ isSplit: true }),\n      Run: toolWindowState({ anchor: "bottom", isVisible: true }),\n    })\n  );\n  return (\n    <ToolWindows\n      toolWindowsState={toolWindowsState}\n      onToolWindowStateChange={setToolWindowsState}\n      renderWindow={(id) => (\n        <DefaultToolWindow>\n          <StyledContent>{id}</StyledContent>\n        </DefaultToolWindow>\n      )}\n      renderToolbarButton={(id) => id}\n      height={500}\n      margin="-1rem" // just to counteract the default padding in Live Preview\n    >\n      <StyledContent style={{ background: "#2b2b2b" }}>\n        Main content\n      </StyledContent>\n    </ToolWindows>\n  );\n};\nrender(<App />);\n')),(0,a.kt)("h3",{id:"multiviewtoolwindow"},"MultiViewToolWindow"),(0,a.kt)("p",null,"Built on top of ",(0,a.kt)("a",{parentName:"p",href:"#defaulttoolwindow"},"DefaultToolWindow"),", extends it to support multiple views within the same tool\nwindow, switched by either ",(0,a.kt)("a",{parentName:"p",href:"./tabs#tool-window-theme"},"Tabs")," or a dropdown."),(0,a.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"tab grouping")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Grouping tabs in a dropdown is not implemented at the moment, and passing ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"groupTabs")," will throw a warning.\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alirezamirian/jui/issues/18"},"Github issue")))),(0,a.kt)("p",null,"Use ",(0,a.kt)("inlineCode",{parentName:"p"},"MultiViewToolWindow.View")," in a ",(0,a.kt)("inlineCode",{parentName:"p"},"MultiViewToolWindow"),", to render many views. Each view must have a unique\nkey.\nYou can control the active view of a ",(0,a.kt)("inlineCode",{parentName:"p"},"MultiViewToolWindow")," through ",(0,a.kt)("inlineCode",{parentName:"p"},"activeKey"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"onActiveKeyChange")," props.\nOr you can leave it uncontrolled and set ",(0,a.kt)("inlineCode",{parentName:"p"},"defaultActiveKey")," if needed."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'<MultiViewToolWindow>\n  <MultiViewToolWindow.View tabContent={<>First view</>} key="v1">\n    ...\n  </MultiViewToolWindow.View>\n  <MultiViewToolWindow.View tabContent={<>Second view</>} key="v2">\n    ...\n  </MultiViewToolWindow.View>\n</MultiViewToolWindow>\n')),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowTabContent")," can be used in tabContent, to show a tab with an icon, a text and maybe a optional close button."),(0,a.kt)("h4",{id:"multi-view-tool-window-header"},"Multi view tool window header"),(0,a.kt)("p",null,"Similar to ",(0,a.kt)("a",{parentName:"p",href:"#defaulttoolwindow"},"DefaultToolWindow"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"additionalActions")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"headerContent")," props can be used to\ndefine the content that goes into the header of a multi view tool window. View switcher UI (whether\nit be tabs or dropdown) is rendered immediately after ",(0,a.kt)("inlineCode",{parentName:"p"},"headerContent"),".\nIf you need more flexibility, you can pass a render function to ",(0,a.kt)("inlineCode",{parentName:"p"},"headerContent"),". Rendered view switcher\nis then passed to that function to be placed in the returned UI:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"<MultiViewToolWindow\n  headerContent={({ renderedViewSwitcher }) => (\n    <>\n      {<span style={{ marginRight: 4 }}>Some title:</span>}\n      {/* if there is only one view, render something else instead of the content switcher */}\n      {executions.length > 1 ? renderedViewSwitcher : <SomethingElse />}\n    </>\n  )}\n>\n  {executions.map((execution) => (\n    <MultiViewToolWindow.View\n      key={execution.id}\n      tabContent={execution.title}\n    >\n      ...\n    </MultiViewToolWindow.View>\n  ))}\n</MultiViewToolWindow>\n<></> // FIXME: this is a hack for fixing webstorm issue in formatting mdx files.\n")),(0,a.kt)("h4",{id:"multiviewtoolwindow-story"},"MultiViewToolWindow story"),(0,a.kt)(p,{storyId:"components-toolwindow--multi-view",height:450,mdxType:"EmbeddedStory"}),(0,a.kt)("h2",{id:"toolwindowsstate"},"ToolWindowsState"),(0,a.kt)("p",null,"Use ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowsState")," to create immutable state of a number of tool windows. It accepts a mapping from ids to\n",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowState")," objects, and keeps it on a readonly property ",(0,a.kt)("inlineCode",{parentName:"p"},"windows"),". You can use ",(0,a.kt)("inlineCode",{parentName:"p"},"toolWindowState")," helper function\nto create ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowState")," objects.\nThere are many methods on ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowsState")," for supported UI interactions that can change the state.\nAll of these functions return a new instance of ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowsState"),", instead of mutating ",(0,a.kt)("inlineCode",{parentName:"p"},"windows")," property in place."),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Calling ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowsState")," methods doesn't magically mutate the state. It just returns a new ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowsState")," object.\nYou have to set the state yourself from the returned value."))),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Immutability of ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowsState")," is at typescript level, not runtime."))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'const [toolWindowsState, setToolWindowsState] = useState(\n  new ToolWindowsState(keyToWindowState)\n);\nconst toggleFoo = () => setToolWindowsState((state) => state.toggle("foo"));\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live noInline themed",live:!0,noInline:!0,themed:!0},'const windows = {\n  foo: {\n    title: "Foo",\n    initialState: toolWindowState(),\n    element: <DefaultToolWindow headerContent="Foo"></DefaultToolWindow>,\n  },\n  bar: {\n    title: "Bar",\n    initialState: toolWindowState({ anchor: "bottom", isVisible: true }),\n    element: <DefaultToolWindow headerContent="Bar"></DefaultToolWindow>,\n  },\n};\nconst App = () => {\n  const [toolWindowsState, setToolWindowsState] = useState(\n    () =>\n      new ToolWindowsState(\n        Object.fromEntries(\n          Object.entries(windows).map(([id, { initialState }]) => [\n            id,\n            initialState,\n          ])\n        )\n      )\n  );\n\n  const isFooVisible = toolWindowsState.windows.foo.isVisible;\n  const openFoo = () => setToolWindowsState((state) => state.toggle("foo"));\n  return (\n    <ToolWindows\n      toolWindowsState={toolWindowsState}\n      onToolWindowStateChange={setToolWindowsState}\n      renderWindow={(id) => windows[id].element}\n      renderToolbarButton={(id) => windows[id].title}\n      height={500}\n      margin="-1rem" // just to counteract the default padding in Live Preview\n    >\n      <div style={{ padding: "1rem" }}>\n        {\n          <Button onClick={openFoo}>\n            {isFooVisible ? "Close" : "Open"} Foo\n          </Button>\n        }\n      </div>\n    </ToolWindows>\n  );\n};\nrender(<App />);\n')),(0,a.kt)("h3",{id:"state-of-a-single-tool-window"},"State of a single tool window"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindowState")," describes the state of a single tool window, and it's usually created by ",(0,a.kt)("inlineCode",{parentName:"p"},"toolWindowState")," helper\nfunction. It's used when creating ",(0,a.kt)("a",{parentName:"p",href:"#toolwindowsstate"},"ToolWindowsState")," objects."),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"No more than one ",(0,a.kt)("strong",{parentName:"p"},"docked")," tool window within the same group (the same ",(0,a.kt)("inlineCode",{parentName:"p"},"anchor")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"isSplit"),") can be visible.\nSetting ",(0,a.kt)("inlineCode",{parentName:"p"},"isVisible")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," for more than one window in the same group causes a render error in ",(0,a.kt)("inlineCode",{parentName:"p"},"ToolWindows"),"."))),(0,a.kt)("p",null,"Here are some example usages of ",(0,a.kt)("inlineCode",{parentName:"p"},"toolWindowState"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// closed docked and pinned tool window in the Primary group of the left side.\ntoolWindowState();\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'// open unpinned docked tool window in the Secondary group of the bottom side\ntoolWindowState({\n  anchor: "bottom",\n  viewMode: "docked_unpinned", // docked (not an overlay), but unpinned, meaning that it will be closed when lost focus.\n  isSplit: true, // Secondary group\n  isVisible: true,\n});\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'// open unpinned docked tool window in the Secondary group of the bottom side\ntoolWindowState({\n  anchor: "bottom",\n  viewMode: "undock", // An overlay over other tool windows and the main content. An undock tool window is unpinned too.\n  weight: 0.7, // Gets 70% of the available space of its side ("bottom"). The visible window from the Secondary\n  // group (if any) will take 30% of the width.\n\n  floatingBounds: {\n    // Defines the boundaries of the tool window if view mode is changed to "float". Note that a window state can have\n    // `floatingBounds`, even though its viewMode is not "float", this allows for "remembering" the full state, even if a\n    // a piece of state is not actively in use because of the value of some other pieces.\n    left: 300,\n    top: 300,\n    width: 600,\n    height: 300,\n  },\n});\n')),(0,a.kt)("h2",{id:"advanced-api"},"Advanced API"),(0,a.kt)("h3",{id:"hiding-tool-window-bars"},"Hiding tool window bars"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"hideToolWindowBars")," prop can be used to implement\n",(0,a.kt)("a",{parentName:"p",href:"https://www.jetbrains.com/help/idea/tool-windows.html#show_hide_tool_window_bars"},"quick access button")," for showing\ntool windows. Quick access button itself is not available out of the box at the moment."),(0,a.kt)("h3",{id:"wide-screen-layout"},"Wide screen layout"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"useWidescreenLayout")," can be used to\n",(0,a.kt)("a",{parentName:"p",href:"https://www.jetbrains.com/help/idea/manipulating-the-tool-windows.html#wide-screen"},"optimize for wide-screen monitors"),"."),(0,a.kt)("h3",{id:"usetoolwindowstate"},"useToolWindowState"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"useToolWindowState")," can be used from any content within a tool window, to access the state of the tool window.\nIt also provides some functions for updating the state. These functions are used in\n",(0,a.kt)("a",{parentName:"p",href:"#defaulttoolwindow"},"DefaultToolWindow")," header."))}f.isMDXComponent=!0}}]);
//# sourceMappingURL=972e5777.ad9b9642.js.map