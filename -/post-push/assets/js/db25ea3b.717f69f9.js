"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["2748"],{22672:function(e,n,t){t.r(n),t.d(n,{default:()=>c,frontMatter:()=>s,metadata:()=>o,assets:()=>r,toc:()=>d,contentTitle:()=>a});var o=JSON.parse('{"id":"components/ComboBox","title":"ComboBox","description":"Combobox implementation.","source":"@site/docs/components/ComboBox.mdx","sourceDirName":"components","slug":"/components/ComboBox","permalink":"/jui/-/post-push/docs/components/ComboBox","draft":false,"unlisted":false,"editUrl":"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/ComboBox.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Checkbox","permalink":"/jui/-/post-push/docs/components/Checkbox"},"next":{"title":"Dropdown","permalink":"/jui/-/post-push/docs/components/Dropdown"}}'),i=t("52322"),l=t("22840");let s={},a="ComboBox",r={},d=[{value:"Live example",id:"live-example",level:3},{value:"Filtering",id:"filtering",level:2},{value:"Label Alignment",id:"label-alignment",level:2},{value:"Known differences",id:"known-differences",level:2}];function m(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"combobox",children:"ComboBox"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://plugins.jetbrains.com/docs/intellij/combo-box.html",children:"Combobox"})," implementation.\nIt's also known as editable ",(0,i.jsx)(n.a,{href:"https://github.com/JetBrains/intellij-community/blob/master/platform/platform-api/src/com/intellij/openapi/ui/ComboBox.java",children:"ComboBox"}),", in the reference implementation."]}),"\n",(0,i.jsx)(n.p,{children:"See also:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"Dropdown"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"live-example",children:"Live example"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live themed",live:!0,children:'<div\n  style={{\n    display: "flex",\n    flexDirection: "column",\n    alignItems: "start",\n    gap: "1rem",\n    flexWrap: "wrap",\n  }}\n>\n  <ComboBox label="Script:" defaultSelectedKey="build">\n    <Item key="start">start</Item>\n    <Item key="build">build</Item>\n    <Item key="test">test</Item>\n    <Item key="deploy">deploy</Item>\n  </ComboBox>\n\n  <ComboBox\n    label="Validated:"\n    validationState="error"\n    defaultSelectedKey="Info"\n  >\n    <Item key="start">start</Item>\n    <Item key="build">build</Item>\n    <Item key="test">test</Item>\n    <Item key="deploy">deploy</Item>\n  </ComboBox>\n\n  <ComboBox\n    label="label placed above:"\n    labelPlacement="above"\n    defaultSelectedKey="option2"\n  >\n    <Item key="option1">Option 1</Item>\n    <Item key="option2">Option 2</Item>\n    <Item key="option3">Option 3</Item>\n    <Item key="option4">Option 4</Item>\n  </ComboBox>\n</div>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"filtering",children:"Filtering"}),"\n",(0,i.jsxs)(n.p,{children:["By default, items are ",(0,i.jsx)(n.strong,{children:"not filtered"})," based the input value.\nFiltering options is possible by controlling ",(0,i.jsx)(n.code,{children:"value"})," and ",(0,i.jsx)(n.code,{children:"items"})," props:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live themed noInline",live:!0,children:'const items = [\n  { name: "start" },\n  { name: "build" },\n  { name: "test" },\n  { name: "deploy" },\n];\n\nfunction WithFiltering() {\n  const [value, setValue] = React.useState("");\n  const filteredItems = React.useMemo(\n    () =>\n      items.filter((item) =>\n        item.name.toLowerCase().startsWith(value.toLowerCase())\n      ),\n    [value]\n  );\n  return (\n    <ComboBox\n      items={filteredItems}\n      menuTrigger="input"\n      value={value}\n      onValueChange={setValue}\n    >\n      {({ name }) => <Item key={name}>{name}</Item>}\n    </ComboBox>\n  );\n}\n\nrender(<WithFiltering />);\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["When filtering options based on input value, use ",(0,i.jsx)(n.code,{children:'menuTrigger="input"'})," to have the dropdown open as the input is typed in."]})}),"\n",(0,i.jsx)(n.h2,{id:"label-alignment",children:"Label Alignment"}),"\n",(0,i.jsxs)(n.p,{children:["Use ",(0,i.jsx)(n.code,{children:"LabeledControlsAlignmentProvider"})," to align combobox with other labeled controls, according to\n",(0,i.jsx)(n.a,{href:"https://jetbrains.github.io/ui/principles/layout/#05",children:"the design guidelines"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live themed",live:!0,children:'<LabeledControlsAlignmentProvider>\n  <div\n    style={{\n      display: "flex",\n      flexDirection: "column",\n      gap: "1rem",\n      width: 400,\n    }}\n  >\n    <InputField label="Host name:" />\n    <ComboBox label="Port number:">\n      <Item key="80">80</Item>\n    </ComboBox>\n  </div>\n</LabeledControlsAlignmentProvider>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"known-differences",children:"Known differences"}),"\n",(0,i.jsxs)(n.p,{children:["Combobox has the ",(0,i.jsx)(n.a,{href:"./Dropdown#known-differences",children:"same differences"})," with the reference implementation as\n",(0,i.jsx)(n.a,{href:"./Dropdown",children:"Dropdown"})," has."]})]})}function c(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}}}]);
//# sourceMappingURL=db25ea3b.717f69f9.js.map