"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[705],{47295:(e,t,n)=>{n.d(t,{Ui:()=>d,en:()=>p});var i=n(75545),a=n(2784),s=n(69979),o=n(6308),l=n(2333),r=n(62336),c=n(97202),m=n(70570);const d=e=>{let{children:t,themeName:n="darcula"}=e;const i={light:r,highContrast:l,darcula:o}[n],d=(0,a.useMemo)((()=>new c.Q(i)),[i]);return u(),a.createElement(s.Z,{fallback:a.createElement(a.Fragment,null,"Loading...")},(()=>a.createElement(m.f,{theme:d},t)))},p=e=>{let{children:t}=e;return a.createElement(d,null,a.createElement(k,null,t))},u=()=>{(0,a.useEffect)((()=>{const e="example-context-patch";if(!document.body.classList.contains(e))try{document.querySelectorAll("link[rel=stylesheet]").forEach((e=>{if(e.sheet)for(let t=0;t<e.sheet.cssRules.length;t++){const n=e.sheet.cssRules.item(t);n?.cssText?.startsWith("body:not(.navigation-with-keyboard)")&&e.sheet.deleteRule(t)}})),document.body.classList.add(e)}catch(t){console.error("Could not undo useKeyboardNavigation")}}),[])};var k=(0,i.ZP)("div").withConfig({displayName:"ExampleContext___StyledDiv",componentId:"sc-14mtscb-0"})(["background:",";"],(e=>{let{theme:t}=e;return t.color("*.background")}));d.__docgenInfo={description:"",methods:[],displayName:"ExampleContext",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1}}},p.__docgenInfo={description:"TODO: add a surrounding UI for examples, with tools for theme selection for example.",methods:[],displayName:"Example"}},26828:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var i=n(7896),a=(n(2784),n(30876));n(47295);const s={},o="Link",l={unversionedId:"components/Link",id:"components/Link",title:"Link",description:"Link component implementation. It uses a focusable interactive span",source:"@site/docs/components/Link.mdx",sourceDirName:"components",slug:"/components/Link",permalink:"/jui/docs/components/Link",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Link.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"LabeledControlsAlignmentProvider",permalink:"/jui/docs/components/LabeledControlsAlignmentProvider"},next:{title:"List",permalink:"/jui/docs/components/List"}},r={},c=[{value:"Remaining features",id:"remaining-features",level:4},{value:"Live example",id:"live-example",level:3}],m={toc:c},d="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,i.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"link"},"Link"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://jetbrains.github.io/ui/controls/link/"},"Link component")," implementation. It uses a focusable interactive span\nwith necessary a11y attributes, and supports disabled state."),(0,a.kt)("h4",{id:"remaining-features"},"Remaining features"),(0,a.kt)("ul",{className:"contains-task-list"},(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,a.kt)("inlineCode",{parentName:"li"},"preventFocusOnPress")),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Support for using normal html anchor link. At least external link is a use case."),(0,a.kt)("li",{parentName:"ul",className:"task-list-item"},(0,a.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",'Support for icon at left and right. A few specific icons like "externalLink", "ContextHelp", or "DropdownLink"\nare supported in ',(0,a.kt)("a",{parentName:"li",href:"https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/platform-api/src/com/intellij/ui/components/ActionLink.kt#L60-L63"},(0,a.kt)("inlineCode",{parentName:"a"},"ActionLink")," implementation"))),(0,a.kt)("h3",{id:"live-example"},"Live example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed",live:!0,themed:!0},"<>\n  <Link onPress={console.log}>Configure servers...</Link> <br />\n  <Link onPress={console.log} isDisabled>\n    Disabled link\n  </Link> <br />\n</>\n")))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=17cf897a.d3df602c.js.map