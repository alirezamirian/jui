"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4942],{69979:(e,t,l)=>{l.d(t,{Z:()=>a});var n=l(2784),r=l(89741);const a=function(e){let{children:t,fallback:l}=e;return(0,r.Z)()&&null!=t?n.createElement(n.Fragment,null,t()):l||null}},2671:(e,t,l)=>{l.r(t),l.d(t,{default:()=>h});var n=l(2784),r=l(69979),a=l(89817),o=l(80404),c=l(35335);const u=n.lazy((()=>Promise.all([l.e(532),l.e(8834),l.e(7842),l.e(2789)]).then(l.bind(l,2789)))),i=o.styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color("*.background")}};
`,m=o.styled.div`
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
`,s=o.styled.span`
  flex: 1;
`;function h(){const[e,t]=(0,n.useState)("darcula");return n.createElement(n.Fragment,null,n.createElement(r.Z,null,(()=>n.createElement(c.Ui,{themeName:e},n.createElement(n.Suspense,{fallback:"loading..."},n.createElement(i,null,n.createElement(m,null,n.createElement(d,{to:"/"},n.createElement(o.PlatformIcon,{icon:"actions/exit.svg"}),"\xa0 Quit example app"),n.createElement(s,null),n.createElement("label",null,"Theme: \xa0",n.createElement("select",{value:e,onChange:e=>{let{target:l}=e;return t(l.value)}},n.createElement("option",{value:"darcula"},"Darcula"),n.createElement("option",{value:"light"},"Light"),n.createElement("option",{value:"highContrast"},"High Contrast")))),n.createElement(u,null)))))))}}}]);
//# sourceMappingURL=e3b22f57.18333f08.js.map