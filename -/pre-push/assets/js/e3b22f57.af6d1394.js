"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["9366"],{12550:function(e,t,r){r.d(t,{k:function(){return n}});let n=r(2784).createContext(null)},39472:function(e,t,r){r.d(t,{qb:function(){return c},vq:function(){return h}});var n=r(2784),o=r(63631),i=r(61236),a=r(38954),s=r(48233),l=r(52322);let c=(e,t)=>{let[r,n]=e.split(".");return`${r}${t}${n?`.${n}`:""}`},u=(e,t)=>{let[r,n]=e.split(".");return t||`${r}_dark${n?`.${n}`:""}`},d=e=>e.startsWith("/")?e.slice(1):`platform/icons/src/${e}`,h=n.forwardRef((e,t)=>{let{icon:r,darkIcon:n,...c}=e,h=(0,s.B)(t),p=(0,o.Fg)().dark?u(r,n):r;return(0,a.Z)({path:d(p),fallbackPath:d(r)},h),(0,l.jsx)(i.M,{...c,ref:h})});h.__docgenInfo={description:'Renders an icon from the predefined list of platform icons.\nicon name must follow the directory structure in platform icons.\n@example <PlatformIcon icon="general/hideToolWindow" />\n@example <PlatformIcon icon="toolbar/pin" />\n@example <PlatformIcon icon="toolbar/pin.svg" />\n@example <PlatformIcon icon="/platform/dvcs-impl/resources/icons/currentBranchLabel.svg" />',methods:[],displayName:"PlatformIcon",props:{icon:{required:!0,tsType:{name:"string"},description:'Icon path in intellij platform repo.\nIf starts with "/", the path will be from the repo root. Otherwise, it\'s relative to "platform/icons/src".\n".svg" extension is optional.'},darkIcon:{required:!1,tsType:{name:"string"},description:"Similar to icon, but for dark themes."}},composes:["IconProps"]}},61236:function(e,t,r){r.d(t,{M:function(){return o}});var n=r(63631);let o=n.zo.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: ${e=>{let{size:t=16}=e;return`${t}px`}};
  height: ${e=>{let{size:t=16}=e;return`${t}px`}};
  position: relative; // to allow absolute positioned indicators and overlays on icon
  cursor: ${e=>{let{role:t}=e;return"button"===t?"pointer":void 0}};
`},38954:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(2784),o=r(63631),i=r(12550);function a(e,t){let{path:r,fallbackPath:a}=e,l=(0,o.Fg)(),c=(0,n.useContext)(i.k),u=c?.isSelected||c?.isContainerFocused,[d,h]=(0,n.useState)(null);(0,n.useLayoutEffect)(()=>{let e=t.current;if(e){if(e.ariaBusy=null===d?"true":null,e.querySelector("svg")?.remove(),d){let t=document.createElement("svg");e.appendChild(t),t.outerHTML=function(e){let t=(1e3*Math.random()).toFixed(0);return[...e.matchAll(/id="(.*?)"/g)].reduce((e,r)=>{let[n,o]=r,i=`${o}-${t}`;return s(`id="${o}"`,`id="${i}"`,s(`url(#${o})`,`url(#${i})`,e))},e)}(d)}}else console.log(`unexpected state - ${r}`)},[d]),(0,n.useEffect)(()=>{let e=!1;return(async()=>{if(!r){console.error("icon path is empty");return}h(null);let t=await l.getSvgIcon(r,u).catch(e=>{if(a)return l.getSvgIcon(a,u);throw e}).catch(e=>(console.error(`Could not resolve icon "${r}"`,e),""));e||h(t)})().catch(console.error),()=>{e=!0}},[r,u])}function s(e,t,r){let n=r.replace(e,t),o=n.replace(e,t);return n===o?n:s(e,t,o)}},19155:function(e,t,r){r.d(t,{I:()=>u});let n="[0-9]{0,3}.?[0-9]*",o=(e,t)=>e?t<3?parseInt(e):Math.round(255*Math.min(parseFloat(e),1)):void 0,i=e=>e.match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)?.slice(1,5).map(e=>e?parseInt(e,16):void 0),a=e=>e.match(/^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i)?.slice(1,4).map(e=>e?parseInt(e+e,16):void 0),s=e=>e.match(RegExp(`^rgb\\(\\s*(${n})\\s*,\\s*(${n})\\s*,\\s*(${n}\\s*)\\)$`))?.slice(1,5).map(o),l=e=>e.match(RegExp(`^rgba\\(\\s*(${n})\\s*,\\s*(${n})\\s*,\\s*(${n})\\s*,\\s*(${n}\\s*)\\)$`))?.slice(1,5).map(o),c=e=>{let t=[i,a,s,l].reduce((t,r)=>t||r(e),void 0);return Array.isArray(t)&&t.slice(0,3).every(e=>Number.isInteger(e))?t:null};class u{constructor(e,t,r,n){let o;void 0===n&&(n=255),this.r=void 0,this.g=void 0,this.b=void 0,this.a=void 0,"string"==typeof e?[o=NaN,t=NaN,r=NaN,n=255]=c(e)||[]:e instanceof u?[o,t,r,n]=[e.r,e.g,e.b,e.a]:o=e,this.r=o,this.g=t,this.b=r,this.a=n<1?Math.round(255*n):n}isValid(){return Number.isInteger(this.r)&&Number.isInteger(this.g)&&Number.isInteger(this.b)&&Number.isInteger(this.a)}withTransparency(e){return new u(this.r,this.g,this.b,e)}brighter(){let{r:e,g:t,b:r,a:n}=this,o=Math.floor,i=u.FACTOR,a=o(1/(1-i));return 0==e&&0==t&&0==r?new u(a,a,a,n):(e>0&&e<a&&(e=a),t>0&&t<a&&(t=a),r>0&&r<a&&(r=a),new u(Math.min(o(e/i),255),Math.min(o(t/i),255),Math.min(o(r/i),255),n))}darker(){let e=u.FACTOR,t=Math.floor;return new u(Math.max(t(this.r*e),0),Math.max(t(this.g*e),0),Math.max(t(this.b*e),0),this.a)}static brighter(e){return new u(e).brighter().toString()}blend(e){let t="string"==typeof e?new u(e):e,r=e=>Math.round(t.a/255*t[e]+this.a/255*(1-t.a/255)*this[e]);return new u(r("r"),r("g"),r("b"))}toString(){let e=e=>Number.isNaN(e)?"":e.toString(16).padStart(2,"0"),t=e(this.r),r=e(this.g),n=e(this.b),o=255===this.a?"":e(this.a);return`#${t}${r}${n}${o}`}}u.FACTOR=.7},63631:function(e,t,r){r.d(t,{Fg:function(){return i},Sf:function(){return s},iv:function(){return a},zo:function(){return o}});var n=r(20569);let o=n.ZP,i=n.Fg,a=n.iv,s=n.Sf},54756:function(e,t,r){r.d(t,{Ui:function(){return h},en:function(){return p}});var n=r(20569),o=r(2784),i=r(11538),a=r(93105),s=r(39395),l=r(95651),c=r(82376),u=r(33819),d=r(52322);let h=e=>{let{children:t,themeName:r="darcula"}=e,n={light:l,highContrast:s,darcula:a}[r],h=(0,o.useMemo)(()=>new c.Q(n),[n]);return m(),(0,d.jsx)(i.Z,{fallback:(0,d.jsx)(d.Fragment,{children:"Loading..."}),children:()=>(0,d.jsx)(u.f,{theme:h,children:t})})},p=e=>{let{children:t}=e;return(0,d.jsx)(h,{children:(0,d.jsx)(f,{children:t})})},m=()=>{(0,o.useEffect)(()=>{let e="example-context-patch";if(!document.body.classList.contains(e))try{document.querySelectorAll("link[rel=stylesheet]").forEach(e=>{if(e.sheet)for(let t=0;t<e.sheet.cssRules.length;t++){let r=e.sheet.cssRules.item(t);r?.cssText?.startsWith("body:not(.navigation-with-keyboard)")&&e.sheet.deleteRule(t)}}),document.body.classList.add(e)}catch(e){console.error("Could not undo useKeyboardNavigation")}},[])};var f=(0,n.ZP)("div").withConfig({displayName:"ExampleContext___StyledDiv",componentId:"sc-14mtscb-0"})(["background:",";"],e=>{let{theme:t}=e;return t.color("*.background")});h.__docgenInfo={description:"",methods:[],displayName:"ExampleContext",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1}}},p.__docgenInfo={description:"TODO: add a surrounding UI for examples, with tools for theme selection for example.",methods:[],displayName:"Example"}},34527:function(e,t,r){r.d(t,{R:function(){return l}});var n=r(2784),o=r(11538),i=r(54756),a=r(52322);let s=n.lazy(()=>Promise.all([r.e("6212"),r.e("9475"),r.e("1143"),r.e("4719"),r.e("6541"),r.e("4343")]).then(r.bind(r,49719))),l=e=>{let{themeName:t="darcula",children:r=e=>e,...l}=e;return(0,a.jsx)(o.Z,{children:()=>(0,a.jsx)(i.Ui,{themeName:t,children:(0,a.jsx)(n.Suspense,{fallback:"loading...",children:r((0,a.jsx)(s,{...l}))})})})};l.__docgenInfo={description:"",methods:[],displayName:"LazyExampleApp",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1,tsType:{name:'ComponentProps["themeName"]',raw:'ComponentProps<typeof ExampleContext>["themeName"]'},description:""},children:{defaultValue:{value:"(i) => i",computed:!1},required:!1,tsType:{name:"signature",type:"function",raw:"(app: React.ReactNode) => React.ReactNode",signature:{arguments:[{name:"app",type:{name:"ReactReactNode",raw:"React.ReactNode"}}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}}},53961:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var n=r(2784),o=r(16131),i=r(63631),a=r(19155),s=r(39472),l=r(34527),c=r(52322);let u=i.zo.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color("*.background")}};
`,d=i.zo.div`
  background: ${e=>{let{theme:t}=e;return new a.I(t.color("*.background")).darker().toString()}};
  color: ${e=>{let{theme:t}=e;return t.color("*.foreground")}};
  display: flex;
`,h=(0,i.zo)(o.Z)`
  color: inherit;
  padding: 0 6px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  &:hover {
    background: ${e=>{let{theme:t}=e;return t.color("ActionButton.hoverBackground","#DFDFDF")}};
    color: inherit;
    text-decoration: none;
  }
`,p=i.zo.span`
  flex: 1;
`;function m(){let[e,t]=(0,n.useState)("darcula");return(0,c.jsx)(l.R,{themeName:e,autoCloneSampleRepo:!0,children:r=>(0,c.jsxs)(u,{children:[(0,c.jsxs)(d,{children:[(0,c.jsxs)(h,{to:"/",children:[(0,c.jsx)(s.vq,{icon:"actions/exit.svg"}),"\xa0 Quit example app"]}),(0,c.jsx)(p,{}),(0,c.jsxs)("label",{children:["Theme: \xa0",(0,c.jsxs)("select",{value:e,onChange:e=>{let{target:r}=e;return t(r.value)},children:[(0,c.jsx)("option",{value:"darcula",children:"Darcula"}),(0,c.jsx)("option",{value:"light",children:"Light"}),(0,c.jsx)("option",{value:"highContrast",children:"High Contrast"})]})]})]}),r]})})}m.__docgenInfo={description:"",methods:[],displayName:"ExampleAppPage"}},48233:function(e,t,r){r.d(t,{B:function(){return o}});var n=r(2784);function o(e){let t=(0,n.useRef)(null);return(0,n.useMemo)(()=>({get current(){return t.current},set current(value){t.current=value,"function"==typeof e?e(value):e&&(e.current=value)}}),[e])}}}]);
//# sourceMappingURL=e3b22f57.af6d1394.js.map