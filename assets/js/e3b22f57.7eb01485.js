"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4942],{69979:(e,t,l)=>{l.d(t,{Z:()=>a});var n=l(2784),r=l(89741);const a=function(e){let{children:t,fallback:l}=e;return(0,r.Z)()&&null!=t?n.createElement(n.Fragment,null,t()):l||null}},2671:(e,t,l)=>{l.r(t),l.d(t,{default:()=>g});var n=l(69979),r=l(89817),a=l(29272),o=l(2784),c=l(26557);const i=o.lazy((()=>Promise.all([l.e(532),l.e(900),l.e(1372)]).then(l.bind(l,81372)))),u=a.styled.div`
  font-family: sans-serif;
  font-size: 14px;
`,s=(0,a.styled)(u)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`,m=a.styled.div`
  background: ${e=>{let{theme:t}=e;return new a.Color(t.color("*.background")).darker().toString()}};
  color: ${e=>{let{theme:t}=e;return t.color("*.foreground")}};
  display: flex;
`,d=(0,a.styled)(r.Z)`
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
`,h=a.styled.span`
  flex: 1;
`;function g(){const[e,t]=(0,o.useState)("darcula");return o.createElement(o.Fragment,null,o.createElement(n.Z,null,(()=>o.createElement(c.Ui,{themeName:e},o.createElement(o.Suspense,{fallback:"loading..."},o.createElement(s,null,o.createElement(m,null,o.createElement(d,{to:"/"},o.createElement(a.PlatformIcon,{icon:"actions/exit.svg"}),"\xa0 Quit example app"),o.createElement(h,null),o.createElement("label",null,"Theme: \xa0",o.createElement("select",{value:e,onChange:e=>{let{target:l}=e;return t(l.value)}},o.createElement("option",{value:"darcula"},"Darcula"),o.createElement("option",{value:"light"},"Light"),o.createElement("option",{value:"highContrast"},"High Contrast")))),o.createElement(i,null)))))))}}}]);
//# sourceMappingURL=e3b22f57.7eb01485.js.map