"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4942],{69979:(e,t,l)=>{l.d(t,{Z:()=>a});var n=l(2784),r=l(89741);const a=function(e){let{children:t,fallback:l}=e;return(0,r.Z)()&&null!=t?n.createElement(n.Fragment,null,t()):l||null}},2671:(e,t,l)=>{l.r(t),l.d(t,{default:()=>g});var n=l(2784),r=l(69979),a=l(89817),o=l(77980),c=l(26557),i=l(8090);const u=n.lazy((()=>Promise.all([l.e(532),l.e(8834),l.e(9395),l.e(5988)]).then(l.bind(l,55988)))),m=o.styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color("*.background")}};
`,s=o.styled.div`
  background: ${e=>{let{theme:t}=e;return new o.Color(t.color("*.background")).darker().toString()}};
  color: ${e=>{let{theme:t}=e;return t.color("*.foreground")}};
  display: flex;
`,d=(0,o.styled)(a.Z)`
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
`,h=o.styled.span`
  flex: 1;
`;function g(){const[e,t]=(0,n.useState)("darcula");return n.createElement(n.Fragment,null,n.createElement(r.Z,null,(()=>n.createElement(c.Ui,{themeName:e},n.createElement(n.Suspense,{fallback:"loading..."},n.createElement(m,{className:i.Z.exampleContainer},n.createElement(s,null,n.createElement(d,{to:"/"},n.createElement(o.PlatformIcon,{icon:"actions/exit.svg"}),"\xa0 Quit example app"),n.createElement(h,null),n.createElement("label",null,"Theme: \xa0",n.createElement("select",{value:e,onChange:e=>{let{target:l}=e;return t(l.value)}},n.createElement("option",{value:"darcula"},"Darcula"),n.createElement("option",{value:"light"},"Light"),n.createElement("option",{value:"highContrast"},"High Contrast")))),n.createElement(u,null)))))))}}}]);
//# sourceMappingURL=e3b22f57.edfd1001.js.map