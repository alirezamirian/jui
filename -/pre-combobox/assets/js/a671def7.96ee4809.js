"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6143],{47295:(e,t,n)=>{n.d(t,{Ui:()=>m,en:()=>d});var o=n(75545),a=n(2784),i=n(69979),r=n(6308),s=n(2333),l=n(62336),u=n(97202),c=n(70570);const m=e=>{let{children:t,themeName:n="darcula"}=e;const o={light:l,highContrast:s,darcula:r}[n],m=(0,a.useMemo)((()=>new u.Q(o)),[o]);return p(),a.createElement(i.Z,{fallback:a.createElement(a.Fragment,null,"Loading...")},(()=>a.createElement(c.f,{theme:m},t)))},d=e=>{let{children:t}=e;return a.createElement(m,null,a.createElement(b,null,t))},p=()=>{(0,a.useEffect)((()=>{const e="example-context-patch";if(!document.body.classList.contains(e))try{document.querySelectorAll("link[rel=stylesheet]").forEach((e=>{if(e.sheet)for(let t=0;t<e.sheet.cssRules.length;t++){const n=e.sheet.cssRules.item(t);n?.cssText?.startsWith("body:not(.navigation-with-keyboard)")&&e.sheet.deleteRule(t)}})),document.body.classList.add(e)}catch(t){console.error("Could not undo useKeyboardNavigation")}}),[])};var b=(0,o.ZP)("div").withConfig({displayName:"ExampleContext___StyledDiv",componentId:"sc-14mtscb-0"})(["background:",";"],(e=>{let{theme:t}=e;return t.color("*.background")}));m.__docgenInfo={description:"",methods:[],displayName:"ExampleContext",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1}}},d.__docgenInfo={description:"TODO: add a surrounding UI for examples, with tools for theme selection for example.",methods:[],displayName:"Example"}},7229:(e,t,n)=>{n.d(t,{e:()=>a});var o=n(2784);const a=e=>{let{path:t,name:n}=e;return o.createElement("a",{href:`https://github.com/JetBrains/intellij-community/blob/master/${t}`,target:"_blank"},n||t.split("/").pop())};a.__docgenInfo={description:"To make relation between things in jui and original reference impl in Intellij Platform",methods:[],displayName:"RefToIntellijPlatform",props:{path:{required:!0,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""}}}},34880:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var o=n(7896),a=(n(2784),n(30876));n(7229),n(47295);const i={},r="Button",s={unversionedId:"components/Button",id:"components/Button",title:"Button",description:"Standalone Button with a textual label.",source:"@site/docs/components/Button.mdx",sourceDirName:"components",slug:"/components/Button",permalink:"/jui/-/pre-combobox/docs/components/Button",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Button.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Balloon",permalink:"/jui/-/pre-combobox/docs/components/Balloon"},next:{title:"ButtonGroup",permalink:"/jui/-/pre-combobox/docs/components/ButtonGroup"}},l={},u=[{value:"Features",id:"features",level:3},{value:"Remaining",id:"remaining",level:4}],c={toc:u},m="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"button"},"Button"),(0,a.kt)("p",null,"Standalone ",(0,a.kt)("a",{parentName:"p",href:"https://jetbrains.github.io/ui/controls/button/"},"Button")," with a textual label."),(0,a.kt)("h3",{id:"features"},"Features"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Support for ",(0,a.kt)("inlineCode",{parentName:"li"},"default")," button UI"),(0,a.kt)("li",{parentName:"ul"},"Focus management options (",(0,a.kt)("inlineCode",{parentName:"li"},"preventFocusOnPress"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"excludeFromTabOrder"),")"),(0,a.kt)("li",{parentName:"ul"},"Support for mnemonics.")),(0,a.kt)("h4",{id:"remaining"},"Remaining"),(0,a.kt)("ul",{className:"contains-task-list"},(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,a.kt)("a",{parentName:"li",href:"https://jetbrains.github.io/ui/controls/button/#default"},"Default button behaviour")," is not implemented yet. It's\njust the appearance at the moment."),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Platform Specific UI. It's based on Mac UI at the moment.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed",live:!0,themed:!0},'<>\n  <Button>Button</Button> <br />\n  <br />\n  <Button variant="default">Default</Button> <br />\n  <br />\n  <Button variant="icon">\n    <PlatformIcon icon="actions/help"></PlatformIcon>\n  </Button>\n  <br />\n  <br />\n  <Button isDisabled>Disabled</Button> <br />\n  <br />\n  <Button excludeFromTabOrder>Exclude from tab order</Button> <br />\n  <br />\n  <Button preventFocusOnPress>Prevent focus on press</Button> <br />\n  <br />\n  <Button mnemonic="W" onPress={() => alert("Button triggered by mnemonics")}>\n    With Mnemonics\n  </Button> <br />\n</>\n')),(0,a.kt)("admonition",{title:"Accessibility Caveat",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Following the original implementation, there is currently no visual feedback for pressed (active) state. That's more of\nan issue when ",(0,a.kt)("inlineCode",{parentName:"p"},"preventFocusOnPress")," is used.")),(0,a.kt)("admonition",{title:"focus visibility",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Following the original implementation, the focus ring is visible even when the interaction is done by mouse.\nIt's more common to show focus ring only when interacted with keyboard, but focus being always visible\nmitigates accessibility issue above.")))}d.isMDXComponent=!0}}]);
//# sourceMappingURL=a671def7.96ee4809.js.map