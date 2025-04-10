"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["2939"],{62499:function(e,n,i){i.r(n),i.d(n,{default:()=>m,frontMatter:()=>c,metadata:()=>t,assets:()=>s,toc:()=>d,contentTitle:()=>a});var t=JSON.parse('{"id":"advanced/Mnemonic","title":"Mnemonic","description":"Implements mnemonic UX pattern, for actionable components.","source":"@site/docs/advanced/Mnemonic.mdx","sourceDirName":"advanced","slug":"/advanced/Mnemonic","permalink":"/jui/-/pre-push/docs/advanced/Mnemonic","draft":false,"unlisted":false,"editUrl":"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/advanced/Mnemonic.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Tree","permalink":"/jui/-/pre-push/docs/components/Tree"},"next":{"title":"Resizer","permalink":"/jui/-/pre-push/docs/advanced/Resizer"}}'),r=i("52322"),o=i("22840");let c={},a="Mnemonic",s={},d=[{value:"Live example",id:"live-example",level:3}];function l(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"mnemonic",children:"Mnemonic"})}),"\n",(0,r.jsxs)(n.p,{children:["Implements ",(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Mnemonics_(keyboard)",children:"mnemonic"})," UX pattern, for actionable components.\n",(0,r.jsx)(n.a,{href:"https://jetbrains.github.io/ui/principles/mnemonics/",children:"See more"}),"."]}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"MnemonicTrigger"})," is typically not used directly as it's used internally in components like ",(0,r.jsx)(n.code,{children:"Button"})," and ",(0,r.jsx)(n.code,{children:"Checkbox"}),".\nOnly use it if implementing the same pattern for a custom component."]})}),"\n",(0,r.jsx)(n.h3,{id:"live-example",children:"Live example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",metastring:"live themed",live:!0,children:'<>\n  <MnemonicTrigger\n    mnemonic="P"\n    onTriggered={() => alert("First!")}\n    isDisabled={false}\n  >\n    Press Alt+P to activate mnemonic\n  </MnemonicTrigger>\n  <br />\n  <MnemonicTrigger\n    mnemonic="m"\n    onTriggered={() => alert("Second!")}\n    isDisabled={false}\n  >\n    Hold <code>Alt</code> to activate <MnemonicText>mnemonic</MnemonicText>\n  </MnemonicTrigger>\n</>\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Implementation of mnemonic for ",(0,r.jsx)(n.code,{children:"Menu"})," (currently not done) doesn't require ",(0,r.jsx)(n.code,{children:"MnemonicTrigger"})," as it's activated\nbased on the focus being on the menu, without requiring a separate activation key (",(0,r.jsx)(n.code,{children:"Alt"}),")."]})})]})}function m(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}}}]);
//# sourceMappingURL=f585c41b.5333e013.js.map