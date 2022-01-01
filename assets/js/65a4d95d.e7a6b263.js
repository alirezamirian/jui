"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8754],{80203:(e,t,s)=>{s.d(t,{gA:()=>P});var o=s(2784),n=s(28427),l=s(13118),i=s(80171),a=s(4366),r=s(90611);var c=s(31477),d=s(87211);function u(e,t,s){const{listProps:{onMouseDown:n,...u}}=function(e){let{selectionManager:t,collection:s,disabledKeys:n,ref:c,keyboardDelegate:d,autoFocus:u,shouldFocusWrap:m,isVirtualized:p,disallowEmptySelection:h,selectOnFocus:y=!1,disallowTypeAhead:v,shouldUseVirtualFocus:f,allowsTabNavigation:g}=e,w=(0,i.Xe)({usage:"search",sensitivity:"base"}),k=(0,o.useMemo)((()=>d||new l.dp(s,n,c,w)),[d,s,n,c,w]);(0,r.E)({isVirtualized:p,selectionManager:t},c);let{collectionProps:b}=(0,a.g)({ref:c,selectionManager:t,keyboardDelegate:k,autoFocus:u,shouldFocusWrap:m,disallowEmptySelection:h,selectOnFocus:y,disallowTypeAhead:v,shouldUseVirtualFocus:f,allowsTabNavigation:g});return{listProps:b}}({...e,ref:s,selectionManager:t.selectionManager,collection:t.collection,disabledKeys:t.disabledKeys,selectOnFocus:!0}),[m,p]=(0,o.useState)(!1),{focusWithinProps:h}=(0,c.L_)({onFocusWithinChange:p});return(0,o.useEffect)((()=>{const s=t.collection.getFirstKey();e.disallowEmptySelection&&t.selectionManager.isEmpty&&s&&t.selectionManager.select(s)}),[e.disallowEmptySelection]),{listProps:(0,d.dG)(u,h),focused:m}}var m=s(37988);function p(e){let{listFocused:t,item:s,state:i,onAction:a,children:r}=e;const d=o.useRef(null),u=i.disabledKeys.has(s.key),p=i.selectionManager.isSelected(s.key),{itemProps:h}=(0,l.Cs)({key:s.key,ref:d,selectionManager:i.selectionManager});let{pressProps:y}=(0,c.r7)({...h,isDisabled:u,preventFocusOnPress:!1});return o.createElement(m.o,(0,n.Z)({containerFocused:t,selected:p,disabled:u,"aria-disabled":u,"aria-selected":p,onDoubleClick:a},y,{ref:d}),r||s.rendered)}var h=s(69711),y=s(14855);const v=y.z.li((e=>{let{theme:t}=e;return{paddingLeft:8,fontWeight:"bold",lineHeight:"20px",outline:"none",cursor:"default",color:t.color("*.textForeground",t.color("*.foreground"))}}));var f=s(67667);var g=s(52297),w=s(58724);function k(e){let{disallowEmptySelection:t=!0,alwaysShowListAsFocused:s=!1,fillAvailableSpace:l=!1,onAction:i,...a}=e;const r={...a,disallowEmptySelection:t},c=(0,o.useRef)(null),d=function(e){return(0,w.E)((0,g.n_)(e))}(r),{listProps:m,focused:y}=u(r,d,c);return o.createElement(h.C,(0,n.Z)({fillAvailableSpace:l},m,{ref:c}),[...d.collection].map((e=>{let{item:t,sectionHeader:s=(e=>o.createElement(v,null,e.rendered))}=e;return function e(n){return"item"===n.type?t(n):(e=>"section"===e.type)(n)?o.createElement(o.Fragment,{key:n.key},s(n),[...n.childNodes].map(e)):(e=>"divider"===e.type)(n)?o.createElement(f.R,{key:n.key}):null}})({item:e=>o.createElement(p,{key:e.key,item:e,state:d,onAction:()=>null==i?void 0:i(e.key),listFocused:s||y})})))}var b=s(25897);const S=[{name:"Paco de Lucia"},{name:"Vicente Amigo"},new b.P,{name:"Gerardo Nunez"},{name:"Paco Serrano"},new b.P,{name:"Sabicas"},{title:"Super legends",items:[{name:"Sabicas2"}]},{name:"Pepe Habichuela"},{name:"El Amir"},{name:"Paco Pe\xf1a"}];s(76899),s(54527);y.z.div`
  color: ${e=>{let{theme:t}=e;return t.color("*.foreground")}};
`;function E(e){let{children:t}=e;return o.createElement("div",{style:{display:"flex",flexDirection:"column",width:400,marginTop:20,height:"calc(100vh - 70px)"}},t)}var F=s(45144),T=s(38529);const A=(e,t)=>s=>s instanceof T.DividerItem?o.createElement(T.Divider,{key:s.key}):"items"in s?o.createElement(F.$0,{items:s.items,key:s.title,title:s.title},(s=>e(s,t))):e(s,t),M=e=>o.createElement(F.ck,{key:e.name,textValue:e.name},e.name),P=()=>o.createElement(E,null,o.createElement(k,{selectionMode:"single",items:S,fillAvailableSpace:!0},A(M))),D=e=>{let{fillAvailableSpace:t,shouldFocusWrap:s,alwaysShowListAsFocused:n}=e;return o.createElement(E,null,o.createElement(k,{selectionMode:"multiple",items:S,fillAvailableSpace:t,shouldFocusWrap:s,alwaysShowListAsFocused:n},A(M)))};D.argTypes={shouldFocusWrap:{control:"boolean"}},D.args={shouldFocusWrap:{value:!1}},P.args={}},46269:(e,t,s)=>{s.r(t),s.d(t,{frontMatter:()=>l,contentTitle:()=>i,metadata:()=>a,toc:()=>r,default:()=>d});var o=s(28427),n=(s(2784),s(30876));s(7229),s(80203),s(61353);const l={},i="Tree",a={unversionedId:"components/Tree",id:"components/Tree",title:"Tree",description:"SpeedSearchTree",source:"@site/docs/components/Tree.mdx",sourceDirName:"components",slug:"/components/Tree",permalink:"/docs/components/Tree",editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Tree.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ToolWindows",permalink:"/docs/components/ToolWindows"},next:{title:"Resizer",permalink:"/docs/components/Advanced/Resizer"}},r=[{value:"SpeedSearchTree",id:"speedsearchtree",children:[],level:2},{value:"Advanced use",id:"advanced-use",children:[{value:"Custom list component with useList and useSpeedSearchList",id:"custom-list-component-with-uselist-and-usespeedsearchlist",children:[],level:3}],level:2}],c={toc:r};function d(e){let{components:t,...s}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,s,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"tree"},"Tree"),(0,n.kt)("h2",{id:"speedsearchtree"},"SpeedSearchTree"),(0,n.kt)("h2",{id:"advanced-use"},"Advanced use"),(0,n.kt)("h3",{id:"custom-list-component-with-uselist-and-usespeedsearchlist"},"Custom list component with useList and useSpeedSearchList"))}d.isMDXComponent=!0}}]);
//# sourceMappingURL=65a4d95d.e7a6b263.js.map