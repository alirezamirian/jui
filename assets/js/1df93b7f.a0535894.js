"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3237],{47295:(e,t,a)=>{a.d(t,{Ui:()=>d,en:()=>u});var n=a(75545),l=a(2784),r=a(69979),c=a(6308),o=a(2333),i=a(62336),s=a(97202),m=a(32216);const d=e=>{let{children:t,themeName:a="darcula"}=e;const n={light:i,highContrast:o,darcula:c}[a],d=(0,l.useMemo)((()=>new s.Q(n)),[n]);return p(),l.createElement(r.Z,{fallback:l.createElement(l.Fragment,null,"Loading...")},(()=>l.createElement(m.f,{theme:d},t)))},u=e=>{let{children:t}=e;return l.createElement(d,null,l.createElement(h,null,t))},p=()=>{(0,l.useEffect)((()=>{const e="example-context-patch";if(!document.body.classList.contains(e))try{document.querySelectorAll("link[rel=stylesheet]").forEach((e=>{for(let a=0;a<e.sheet.cssRules.length;a++){var t;null!=(t=e.sheet.cssRules.item(a).cssText)&&t.startsWith("body:not(.navigation-with-keyboard)")&&e.sheet.deleteRule(a)}})),document.body.classList.add(e)}catch(t){console.error("Could not undo useKeyboardNavigation")}}),[])};var h=(0,n.ZP)("div").withConfig({displayName:"ExampleContext___StyledDiv",componentId:"sc-14mtscb-0"})(["background:",";"],(e=>{let{theme:t}=e;return t.color("*.background")}));d.__docgenInfo={description:"",methods:[],displayName:"ExampleContext",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1}}},u.__docgenInfo={description:"TODO: add a surrounding UI for examples, with tools for theme selection for example.",methods:[],displayName:"Example"}},54772:(e,t,a)=>{a.d(t,{R:()=>o});var n=a(2784),l=a(69979),r=a(47295);const c=n.lazy((()=>Promise.all([a.e(532),a.e(4862),a.e(7746),a.e(9773),a.e(9895)]).then(a.bind(a,9895)))),o=e=>{let{themeName:t="darcula",children:a=(e=>e),...o}=e;return n.createElement(l.Z,null,(()=>n.createElement(r.Ui,{themeName:t},n.createElement(n.Suspense,{fallback:"loading..."},a(n.createElement(c,o))))))};o.__docgenInfo={description:"",methods:[],displayName:"LazyExampleApp",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1,tsType:{name:'ComponentProps["themeName"]',raw:'ComponentProps<typeof ExampleContext>["themeName"]'},description:""},children:{defaultValue:{value:"(i) => i",computed:!1},required:!1,tsType:{name:"signature",type:"function",raw:"(app: React.ReactNode) => React.ReactNode",signature:{arguments:[{name:"app",type:{name:"ReactReactNode",raw:"React.ReactNode"}}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}}},58910:(e,t,a)=>{a.r(t),a.d(t,{default:()=>F});var n=a(2784),l=a(6277),r=a(71037),c=a(89817),o=a(37614);const i="heroBanner_hcU4",s="buttons_r4b9",m="link_ggJa";var d=a(7896);const u="features_BvT3",p="featureSvg_lQDb",h=[{title:"Pixel perfect UI match",image:"img/undraw_docusaurus_tree.svg",description:n.createElement(n.Fragment,null,"Unless you inspect and see it's DOM elements, it's hard to tell what you are looking at is not the original Java implementation.")},{title:"Intellij Platform's UX, React's DX",image:"img/undraw_docusaurus_react.svg",description:n.createElement(n.Fragment,null,"Amazing keyboard-first UX of Intellij Platform, in a descriptive and declarative style, which works great for UI applications.")},{title:"Drop-in support for themes",image:"img/undraw_docusaurus_mountain.svg",description:n.createElement(n.Fragment,null,"All components respect and use theme properties like their corresponding Java implementation. You can use it with"," ",n.createElement("a",{href:"https://plugins.jetbrains.com/search?tags=Theme",target:"_blank"},"any theme")," ","in form of a json file and it works.")}];function g(e){let{title:t,image:a,description:r}=e;return n.createElement("div",{className:(0,l.Z)("col col--4")},n.createElement("div",{className:"text--center"},n.createElement("img",{className:p,alt:t,src:a})),n.createElement("div",{className:"text--center padding-horiz--md"},n.createElement("h3",null,t),n.createElement("p",null,r)))}function E(){return n.createElement("section",{className:u},n.createElement("div",{className:"container"},n.createElement("div",{className:"row"},h.map(((e,t)=>n.createElement(g,(0,d.Z)({key:t},e)))))))}E.__docgenInfo={description:"",methods:[],displayName:"HomepageFeatures"};const f="window_NADi",N="titlebar_qsPr",_="title_piPU",b="buttons_BXDb",v="close_gkzt",w="closebutton_s8eE",y="minimize_h4zw",x="minimizebutton_daN5",k="zoom_FarZ",I="zoombutton_EIcH";function R(e){let{children:t,title:a,...r}=e;const c=e=>e.preventDefault();return n.createElement("div",(0,d.Z)({},r,{className:(0,l.Z)(f,r.className)}),n.createElement("div",{className:N},n.createElement("div",{className:b},n.createElement("div",{className:v},n.createElement("a",{className:w,href:"",onClick:c},n.createElement("span",null,n.createElement("strong",null,"x")))),n.createElement("div",{className:y},n.createElement("a",{className:x,href:"",onClick:c},n.createElement("span",null,n.createElement("strong",null,"\u2013")))),n.createElement("div",{className:k},n.createElement("a",{className:I,href:"",onClick:c},n.createElement("span",null,n.createElement("strong",null,"+"))))),n.createElement("div",{className:_},a)),n.createElement("div",null,t))}R.__docgenInfo={description:"",methods:[],displayName:"WindowFrame",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var C=a(54772),P=a(75545);const Z=P.ZP.section.withConfig({displayName:"PageSection2__Section",componentId:"sc-e9jz7u-0"})(['margin:2rem 0;padding:100px 0;position:relative;&::before{content:"";background:#eee;width:100%;height:100%;position:absolute;z-index:-1;top:0;transform:skewY(-5deg);}']),z=P.ZP.h2.attrs({className:"hero__title"}).withConfig({displayName:"PageSection2__Title",componentId:"sc-e9jz7u-1"})([""]),j=P.ZP.p.withConfig({displayName:"PageSection2__Subtitle",componentId:"sc-e9jz7u-2"})(["color:rgb(107,114,128);font-size:1.25rem;"]),D=P.ZP.div.attrs({className:"container"}).withConfig({displayName:"PageSection2__Container",componentId:"sc-e9jz7u-3"})(["text-align:center;color:rgba(17,24,39);"]),S=Object.assign(Z,{Title:z,Subtitle:j,Container:D}),T=e=>{e.preventDefault(),document.getElementById("demo-app").scrollIntoView({behavior:"smooth"})};function U(){const{siteConfig:e}=(0,o.Z)();return n.createElement("header",{className:(0,l.Z)("hero hero--dark",i)},n.createElement("div",{className:"container"},n.createElement("h1",{className:"hero__title"},e.title),n.createElement("p",{className:"hero__subtitle"},(t=e.tagline,a={text:"Intellij Platform",element:n.createElement(c.Z,{href:"https://www.jetbrains.com/opensource/idea/",className:m,target:"_blank"},"Intellij Platform")},n.createElement(n.Fragment,null,t.replace(a.text,`===${a.text}===`).split("===").map((e=>n.createElement(n.Fragment,{key:e},e===a.text?a.element:e)))))),n.createElement("div",{className:s},n.createElement(c.Z,{className:"button button--secondary button--lg",to:"/docs/getting-started"},"Get started"),n.createElement(c.Z,{to:"/example-app",onClick:T,className:"button button--secondary button--lg"},"Jump to demo"))));var t,a}function F(){return n.createElement("div",{onClickCapture:e=>{!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.target instanceof HTMLAnchorElement&&e.target.href.includes("/example-app")&&T(e)}},n.createElement(r.Z,null,n.createElement(U,null),n.createElement("main",null,n.createElement(E,null),n.createElement(S,null,n.createElement(S.Container,null,n.createElement(S.Title,{id:"demo-app"},"Demo Application"),n.createElement(S.Subtitle,null,"Bellow is an example application built with JUI. It mimics Webstorm, and although it has some functionality implemented as well, the main purpose is to show case features and components JUI offers, rather than being a real IDE.")),n.createElement(q,null,n.createElement(C.R,{height:"calc(100vh - 200px)"}))))))}const q=(0,P.ZP)(R).withConfig({displayName:"pages__ExampleWindowFrame",componentId:"sc-1t9q8o9-0"})(["margin-top:2rem;width:clamp(85%,1200px,calc(100vw - 1rem));min-height:calc(100vh - 200px);"]);F.__docgenInfo={description:"",methods:[],displayName:"Home"}}}]);
//# sourceMappingURL=1df93b7f.a0535894.js.map