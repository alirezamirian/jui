"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[63],{26012:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>m,toc:()=>s});var i=t(7896),a=(t(2784),t(30876));const o={},r="Mnemonic",m={unversionedId:"advanced/Mnemonic",id:"advanced/Mnemonic",title:"Mnemonic",description:"Implements mnemonic UX pattern, for actionable components.",source:"@site/docs/advanced/Mnemonic.mdx",sourceDirName:"advanced",slug:"/advanced/Mnemonic",permalink:"/jui/docs/advanced/Mnemonic",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/advanced/Mnemonic.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tree",permalink:"/jui/docs/components/Tree"},next:{title:"Resizer",permalink:"/jui/docs/advanced/Resizer"}},c={},s=[{value:"Live example",id:"live-example",level:3}],d={toc:s};function p(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"mnemonic"},"Mnemonic"),(0,a.kt)("p",null,"Implements ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Mnemonics_(keyboard)"},"mnemonic")," UX pattern, for actionable components.\n",(0,a.kt)("a",{parentName:"p",href:"https://jetbrains.github.io/ui/principles/mnemonics/"},"See more"),"."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"MnemonicTrigger")," is typically not used directly as it's used internally in components like ",(0,a.kt)("inlineCode",{parentName:"p"},"Button")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Checkbox"),".\nOnly use it if implementing the same pattern for a custom component.")),(0,a.kt)("h3",{id:"live-example"},"Live example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed",live:!0,themed:!0},'<>\n  <MnemonicTrigger\n    mnemonic="P"\n    onTriggered={() => alert("First!")}\n    isDisabled={false}\n  >\n    Press Alt+P to activate mnemonic\n  </MnemonicTrigger>\n  <br />\n  <MnemonicTrigger\n    mnemonic="m"\n    onTriggered={() => alert("Second!")}\n    isDisabled={false}\n  >\n    Hold <code>Alt</code> to activate <MnemonicText>mnemonic</MnemonicText>\n  </MnemonicTrigger>\n</>\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Implementation of mnemonic for ",(0,a.kt)("inlineCode",{parentName:"p"},"Menu")," (currently not done) doesn't require ",(0,a.kt)("inlineCode",{parentName:"p"},"MnemonicTrigger")," as it's activated\nbased on the focus being on the menu, without requiring a separate activation key (",(0,a.kt)("inlineCode",{parentName:"p"},"Alt"),").")))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=f585c41b.670f88d9.js.map