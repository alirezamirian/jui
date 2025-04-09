"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3674],{47295:(e,t,n)=>{n.d(t,{Ui:()=>h,en:()=>m});var o=n(75545),i=n(2784),a=n(69979),s=n(6308),l=n(2333),c=n(62336),r=n(97202),d=n(70570);const h=e=>{let{children:t,themeName:n="darcula"}=e;const o={light:c,highContrast:l,darcula:s}[n],h=(0,i.useMemo)((()=>new r.Q(o)),[o]);return u(),i.createElement(a.Z,{fallback:i.createElement(i.Fragment,null,"Loading...")},(()=>i.createElement(d.f,{theme:h},t)))},m=e=>{let{children:t}=e;return i.createElement(h,null,i.createElement(p,null,t))},u=()=>{(0,i.useEffect)((()=>{const e="example-context-patch";if(!document.body.classList.contains(e))try{document.querySelectorAll("link[rel=stylesheet]").forEach((e=>{if(e.sheet)for(let t=0;t<e.sheet.cssRules.length;t++){const n=e.sheet.cssRules.item(t);n?.cssText?.startsWith("body:not(.navigation-with-keyboard)")&&e.sheet.deleteRule(t)}})),document.body.classList.add(e)}catch(t){console.error("Could not undo useKeyboardNavigation")}}),[])};var p=(0,o.ZP)("div").withConfig({displayName:"ExampleContext___StyledDiv",componentId:"sc-14mtscb-0"})(["background:",";"],(e=>{let{theme:t}=e;return t.color("*.background")}));h.__docgenInfo={description:"",methods:[],displayName:"ExampleContext",props:{themeName:{defaultValue:{value:'"darcula"',computed:!1},required:!1}}},m.__docgenInfo={description:"TODO: add a surrounding UI for examples, with tools for theme selection for example.",methods:[],displayName:"Example"}},17729:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>r});var o=n(7896),i=(n(2784),n(30876));n(47295);const a={},s="Checkbox",l={unversionedId:"components/Checkbox",id:"components/Checkbox",title:"Checkbox",description:"Checkbox with or without a label.",source:"@site/docs/components/Checkbox.mdx",sourceDirName:"components",slug:"/components/Checkbox",permalink:"/jui/-/r/docs/components/Checkbox",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/Checkbox.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ButtonGroup",permalink:"/jui/-/r/docs/components/ButtonGroup"},next:{title:"ComboBox",permalink:"/jui/-/r/docs/components/ComboBox"}},c={},r=[{value:"Simple usage",id:"simple-usage",level:2},{value:"Focus options",id:"focus-options",level:2},{value:"Usage without label",id:"usage-without-label",level:2}],d={toc:r},h="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(h,(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"checkbox"},"Checkbox"),(0,i.kt)("p",null,"Checkbox with or without a label."),(0,i.kt)("h2",{id:"simple-usage"},"Simple usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed",live:!0,themed:!0},'// import { Checkbox } from "@intellij-platform/core";\n<>\n  <Checkbox>Default behavior</Checkbox> <br />\n  <Checkbox isSelected>Controlled selected.</Checkbox> <br />\n  <Checkbox isIndeterminate>Indeterminate state</Checkbox> <br />\n  <Checkbox isSelected isDisabled>\n    Disabled\n  </Checkbox> <br />\n  <Checkbox mnemonic="W">With Mnemonics</Checkbox>\n</>\n')),(0,i.kt)("admonition",{title:"Note",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"When ",(0,i.kt)("inlineCode",{parentName:"p"},"isIndeterminate")," is true, ",(0,i.kt)("inlineCode",{parentName:"p"},"isSelected")," state is independently maintained, and ",(0,i.kt)("inlineCode",{parentName:"p"},"onChange")," is still called with the\ntoggled value upon interaction. But regardless of that state, the indeterminate UI is shown. It's important to note\nthat it's not a\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/util/ui/src/com/intellij/util/ui/ThreeStateCheckBox.java#L23-L22"},"three state checkbox"),"\nin that sense and the implementation rather follows the\n",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate"},"web standard implementation"),",\nwhere ",(0,i.kt)("inlineCode",{parentName:"p"},"indeterminate")," is independent of ",(0,i.kt)("inlineCode",{parentName:"p"},"checked")," state.")),(0,i.kt)("h2",{id:"focus-options"},"Focus options"),(0,i.kt)("p",null,"By default, Checkbox gets focused when it's interacted with. This is inline with the default browser's behaviour for\ncheckboxes. However, the focus ring is always shown when the Checkbox has focus, regardless of the interaction type.\nThis is not inline with browser's default behavior of showing focus ring based\non ",(0,i.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",target:"_blank"},"\nfocus-visible heuristics "),", which in turn depends on the input device."),(0,i.kt)("admonition",{title:"Tip",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"disableFocusAlwaysVisible")," to switch to the browser default focus-visible behaviour.")),(0,i.kt)("p",null,"In some use cases, you may want to prevent checkbox from obtaining the focus when it's interacted with. A legitimate\nexample could be ",(0,i.kt)("a",{parentName:"p",href:"#usage-without-label"},"label-less checkboxes")," in List items or Table cells, where the checkbox is a\npart of a focusable container (list item, table cell) already, and that focusable container handles keyboard interaction\nfor toggling checkbox, for example by ",(0,i.kt)("inlineCode",{parentName:"p"},"Space"),' key. Another use case, which perhaps is more controversial with respect to\ni11y practices, is where the checkbox is next to more important focusable element that you don\'t want to take the focus\naway from. "Amend" checkbox in "Commit" tool window is an example of that use case. When the commit message editor is\nfocused, toggling "Amend" checkbox won\'t take focus away from the commit message editor. It\'s important to note that\nthe checkbox is still keyboard-accessible in such cases, because of the\n',(0,i.kt)("a",{parentName:"p",href:"https://plugins.jetbrains.com/docs/intellij/basic-action-system.html"},"Action System")," and also\n",(0,i.kt)("a",{parentName:"p",href:"https://www.jetbrains.com/help/idea/adding-mnemonics.html"},"mnemonics"),"."),(0,i.kt)("admonition",{title:"Tip",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"preventFocus")," to not allow checkbox get focused when it's interacted with.")),(0,i.kt)("p",null,"Last thing about focus management is that you can disable focus by Tab key, while the checkbox is still focusable."),(0,i.kt)("admonition",{title:"Tip",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"excludeFromTabOrder")," to exclude the checkbox from getting focus by Tab key.")),(0,i.kt)("p",null,"Below is an example of the focus management options:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed",live:!0,themed:!0},'// import { Checkbox } from "@intellij-platform/core";\n<>\n  <Checkbox>Default behavior</Checkbox> <br />\n  <Checkbox excludeFromTabOrder>\n    Excluded from tab order. Try focusing the previous checkbox and press tab.\n  </Checkbox> <br />\n  <Checkbox disableFocusAlwaysVisible>\n    Focus ring only shown based on `focus-visible` heuristics.\n  </Checkbox>\n  <br />\n  <Checkbox preventFocus>Doesn\'t get focused when toggled</Checkbox>\n</>\n')),(0,i.kt)("h2",{id:"usage-without-label"},"Usage without label"),(0,i.kt)("p",null,"A use case for checkboxes without label is in list or tree items.\nThat kind of use case is usually together with ",(0,i.kt)("inlineCode",{parentName:"p"},"preventFocus")," option, since the checkbox is a part of a focusable\ncontainer (list/tree items), and the focus should not be taken away from that focusable container."),(0,i.kt)("admonition",{title:"Note",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"You should always pass ",(0,i.kt)("inlineCode",{parentName:"p"},"aria-label")," for checkboxes without label.")),(0,i.kt)("p",null,"Here is an example of rendering checkboxes inside tree items:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live themed",live:!0,themed:!0},'// import { Checkbox, List, Item, SpeedSearchTree, HighlightedTextValue } from "@intellij-platform/core";\n// TODO: Space doesn\'t toggle selection on tree items\nfunction Example() {\n  const [selectedKeys, setSelectedKeys] = useState(new Set(["Vicente Amigo"]));\n  const [checkedKeys, setCheckedKeys] = useState(["Paco de Lucia"]);\n\n  const isChecked = (item) =>\n    checkedKeys.includes(item.name) ||\n    (item.children && getLeafNodes(item).every(isChecked));\n\n  const getLeafNodes = (root) => {\n    if (root.children) {\n      return root.children\n        .map((child) => (child.children ? getLeafNodes(child) : [child]))\n        .flat();\n    }\n    return [];\n  };\n\n  const toggle = (item, checked) => {\n    setSelectedKeys(() => new Set([item.name]));\n    if (item.children) {\n      const allChildren = getLeafNodes(item);\n      if (!allChildren.every(isChecked)) {\n        setCheckedKeys(allChildren.map((child) => child.name));\n      } else {\n        setCheckedKeys((checkedKeys) =>\n          checkedKeys.filter(\n            (key) => !allChildren.find((child) => child.name === key)\n          )\n        );\n      }\n    } else {\n      if (checked) {\n        setCheckedKeys((checkedKeys) => checkedKeys.concat(item.name));\n      } else {\n        setCheckedKeys((checkedKeys) =>\n          checkedKeys.filter((key) => key !== item.name)\n        );\n      }\n    }\n  };\n\n  const isIndeterminate = (item) => {\n    if (!item.children) {\n      return false;\n    }\n    const leafNodes = getLeafNodes(item);\n    const checkedLeafNodes = leafNodes.filter(isChecked);\n    return (\n      checkedLeafNodes.length > 0 && checkedLeafNodes.length < leafNodes.length\n    );\n  };\n  return (\n    <SpeedSearchTree\n      selectionMode="multiple"\n      defaultExpandedKeys={["Heros"]}\n      selectedKeys={selectedKeys}\n      onSelectionChange={setSelectedKeys}\n      items={[\n        {\n          name: "Heros",\n          children: [\n            { name: "Paco de Lucia", children: null },\n            { name: "Vicente Amigo", children: null },\n            { name: "Gerardo Nunez", children: null },\n          ],\n        },\n      ]}\n    >\n      {(item) => (\n        <Item key={item.name} childItems={item.children} textValue={item.name}>\n          <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>\n            {\n              <>\n                <span style={{ display: "inline-flex" }}>\n                  <Checkbox\n                    aria-label={`Select ${item.name}`}\n                    preventFocus\n                    isSelected={isChecked(item)}\n                    onChange={(checked) => toggle(item, checked)}\n                    isIndeterminate={item.children && isIndeterminate(item)}\n                  />\n                </span>\n              </>\n            }\n            <span>\n              <HighlightedTextValue />\n            </span>\n          </div>\n        </Item>\n      )}\n    </SpeedSearchTree>\n  );\n}\n')))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=32fce562.e475e8fe.js.map