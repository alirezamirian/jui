"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["2312"],{54756:function(e,t,n){n.d(t,{Ui:function(){return h},en:function(){return m}});var i=n(20569),o=n(2784),s=n(11538),r=n(93105),a=n(39395),l=n(95651),c=n(82376),u=n(33819),d=n(52322);let h=e=>{let{children:t,themeName:n="darcula"}=e,i={light:l,highContrast:a,darcula:r}[n],h=(0,o.useMemo)(()=>new c.Q(i),[i]);return p(),(0,d.jsx)(s.Z,{fallback:(0,d.jsx)(d.Fragment,{children:"Loading..."}),children:()=>(0,d.jsx)(u.f,{theme:h,children:t})})},m=e=>{let{children:t}=e;return(0,d.jsx)(h,{children:(0,d.jsx)(b,{children:t})})},p=()=>{(0,o.useEffect)(()=>{let e="example-context-patch";if(!document.body.classList.contains(e))try{document.querySelectorAll("link[rel=stylesheet]").forEach(e=>{if(e.sheet)for(let t=0;t<e.sheet.cssRules.length;t++){let n=e.sheet.cssRules.item(t);n?.cssText?.startsWith("body:not(.navigation-with-keyboard)")&&e.sheet.deleteRule(t)}}),document.body.classList.add(e)}catch(e){console.error("Could not undo useKeyboardNavigation")}},[])};var b=(0,i.ZP)("div").withConfig({displayName:"ExampleContext___StyledDiv",componentId:"sc-14mtscb-0"})(["background:",";"],e=>{let{theme:t}=e;return t.color("*.background")});h.__docgenInfo={description:"",methods:[],displayName:"ExampleContext",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1}}},m.__docgenInfo={description:"TODO: add a surrounding UI for examples, with tools for theme selection for example.",methods:[],displayName:"Example"}},20177:function(e,t,n){n.d(t,{e:function(){return o}}),n(2784);var i=n(52322);let o=e=>{let{path:t,name:n}=e;return(0,i.jsx)("a",{href:`https://github.com/JetBrains/intellij-community/blob/master/${t}`,target:"_blank",children:n||t.split("/").pop()})};o.__docgenInfo={description:"To make relation between things in jui and original reference impl in Intellij Platform",methods:[],displayName:"RefToIntellijPlatform",props:{path:{required:!0,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""}}}},38977:function(e,t,n){n.r(t),n.d(t,{default:()=>d,frontMatter:()=>r,metadata:()=>i,assets:()=>l,toc:()=>c,contentTitle:()=>a});var i=JSON.parse('{"id":"components/Button","title":"Button","description":"Standalone Button with a textual label.","source":"@site/docs/components/Button.mdx","sourceDirName":"components","slug":"/components/Button","permalink":"/jui/-/pre-push/docs/components/Button","draft":false,"unlisted":false,"editUrl":"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Button.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Balloon","permalink":"/jui/-/pre-push/docs/components/Balloon"},"next":{"title":"ButtonGroup","permalink":"/jui/-/pre-push/docs/components/ButtonGroup"}}'),o=n("52322"),s=n("22840");n("20177"),n("54756");let r={},a="Button",l={},c=[{value:"Features",id:"features",level:3},{value:"Remaining",id:"remaining",level:4}];function u(e){let t={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",h4:"h4",header:"header",input:"input",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"button",children:"Button"})}),"\n",(0,o.jsxs)(t.p,{children:["Standalone ",(0,o.jsx)(t.a,{href:"https://jetbrains.github.io/ui/controls/button/",children:"Button"})," with a textual label."]}),"\n",(0,o.jsx)(t.h3,{id:"features",children:"Features"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["Support for ",(0,o.jsx)(t.code,{children:"default"})," button UI"]}),"\n",(0,o.jsxs)(t.li,{children:["Focus management options (",(0,o.jsx)(t.code,{children:"preventFocusOnPress"}),", ",(0,o.jsx)(t.code,{children:"excludeFromTabOrder"}),")"]}),"\n",(0,o.jsx)(t.li,{children:"Support for mnemonics."}),"\n"]}),"\n",(0,o.jsx)(t.h4,{id:"remaining",children:"Remaining"}),"\n",(0,o.jsxs)(t.ul,{className:"contains-task-list",children:["\n",(0,o.jsxs)(t.li,{className:"task-list-item",children:[(0,o.jsx)(t.input,{type:"checkbox",disabled:!0})," ",(0,o.jsx)(t.a,{href:"https://jetbrains.github.io/ui/controls/button/#default",children:"Default button behaviour"})," is not implemented yet. It's\njust the appearance at the moment."]}),"\n",(0,o.jsxs)(t.li,{className:"task-list-item",children:[(0,o.jsx)(t.input,{type:"checkbox",disabled:!0})," ","Platform Specific UI. It's based on Mac UI at the moment."]}),"\n"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",metastring:"live themed",live:!0,children:'<>\n  <Button>Button</Button> <br />\n  <br />\n  <Button variant="default">Default</Button> <br />\n  <br />\n  <Button variant="icon">\n    <PlatformIcon icon="actions/help"></PlatformIcon>\n  </Button>\n  <br />\n  <br />\n  <Button isDisabled>Disabled</Button> <br />\n  <br />\n  <Button excludeFromTabOrder>Exclude from tab order</Button> <br />\n  <br />\n  <Button preventFocusOnPress>Prevent focus on press</Button> <br />\n  <br />\n  <Button mnemonic="W" onPress={() => alert("Button triggered by mnemonics")}>\n    With Mnemonics\n  </Button> <br />\n</>\n'})}),"\n",(0,o.jsx)(t.admonition,{title:"Accessibility Caveat",type:"caution",children:(0,o.jsxs)(t.p,{children:["Following the original implementation, there is currently no visual feedback for pressed (active) state. That's more of\nan issue when ",(0,o.jsx)(t.code,{children:"preventFocusOnPress"})," is used."]})}),"\n",(0,o.jsx)(t.admonition,{title:"focus visibility",type:"info",children:(0,o.jsx)(t.p,{children:"Following the original implementation, the focus ring is visible even when the interaction is done by mouse.\nIt's more common to show focus ring only when interacted with keyboard, but focus being always visible\nmitigates accessibility issue above."})})]})}function d(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}}}]);
//# sourceMappingURL=a671def7.01941ccb.js.map