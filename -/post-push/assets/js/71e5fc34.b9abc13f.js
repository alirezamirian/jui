"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["8451"],{63283:function(n,e,t){t.r(e),t.d(e,{default:()=>p,frontMatter:()=>l,metadata:()=>o,assets:()=>r,toc:()=>d,contentTitle:()=>a});var o=JSON.parse('{"id":"components/ModalWindow","title":"ModalWindow","description":"Features","source":"@site/docs/components/ModalWindow.mdx","sourceDirName":"components","slug":"/components/ModalWindow","permalink":"/jui/-/post-push/docs/components/ModalWindow","draft":false,"unlisted":false,"editUrl":"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/ModalWindow.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Menu","permalink":"/jui/-/post-push/docs/components/Menu"},"next":{"title":"Popup","permalink":"/jui/-/post-push/docs/components/Popup"}}'),i=t("52322"),s=t("22840");let l={},a="ModalWindow",r={},d=[{value:"Features",id:"features",level:3},{value:"Remaining",id:"remaining",level:4},{value:"Live example",id:"live-example",level:3},{value:"WindowManager",id:"windowmanager",level:2}];function c(n){let e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",input:"input",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"modalwindow",children:"ModalWindow"})}),"\n",(0,i.jsx)(e.h3,{id:"features",children:"Features"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\uD83D\uDEA7 TODO"}),"\n"]}),"\n",(0,i.jsx)(e.h4,{id:"remaining",children:"Remaining"}),"\n",(0,i.jsxs)(e.ul,{className:"contains-task-list",children:["\n",(0,i.jsxs)(e.li,{className:"task-list-item",children:[(0,i.jsx)(e.input,{type:"checkbox",disabled:!0})," ","\uD83D\uDEA7 TODO"]}),"\n"]}),"\n",(0,i.jsx)(e.h3,{id:"live-example",children:"Live example"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",metastring:"live themed",live:!0,children:'function ModalWindowExample() {\n  const [open, setOpen] = useState(false);\n  const close = () => setOpen(false);\n  return (\n    <>\n      <Button onPress={() => setOpen(true)}>Open</Button>\n      {open && (\n        <ModalWindow\n          interactions="all" // try "none" or "move"\n          onClose={close}\n        >\n          <WindowLayout\n            header="Window title"\n            content={<div style={{ padding: "1rem" }}>Window content</div>}\n            footer={\n              <WindowLayout.Footer\n                hasBorder\n                left={\n                  <>\n                    <TooltipTrigger\n                      tooltip={<HelpTooltip helpText="Show Help Contents" />}\n                    >\n                      <Button variant="icon">\n                        <PlatformIcon icon="actions/help"></PlatformIcon>\n                      </Button>\n                    </TooltipTrigger>\n                    <Checkbox>Some settings</Checkbox>\n                  </>\n                }\n                right={\n                  <>\n                    <Button autoFocus onPress={close}>\n                      Cancel\n                    </Button>\n                    <Button variant="default" onPress={close}>\n                      OK\n                    </Button>\n                  </>\n                }\n              />\n            }\n          />\n        </ModalWindow>\n      )}\n    </>\n  );\n}\n'})}),"\n",(0,i.jsx)(e.h2,{id:"windowmanager",children:"WindowManager"}),"\n",(0,i.jsx)(e.p,{children:"\uD83D\uDEA7"})]})}function p(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(c,{...n})}):c(n)}}}]);
//# sourceMappingURL=71e5fc34.b9abc13f.js.map