"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["4486"],{66230:function(e,s,r){r.r(s),r.d(s,{default:()=>u,frontMatter:()=>i,metadata:()=>n,assets:()=>l,toc:()=>c,contentTitle:()=>o});var n=JSON.parse('{"id":"components/ProgressBar","title":"ProgressBar","description":"ProgressBar component, for showing a simple progress bar, or","source":"@site/docs/components/ProgressBar.mdx","sourceDirName":"components","slug":"/components/ProgressBar","permalink":"/jui/-/post-push/docs/components/ProgressBar","draft":false,"unlisted":false,"editUrl":"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/components/ProgressBar.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Popup","permalink":"/jui/-/post-push/docs/components/Popup"},"next":{"title":"SearchInput","permalink":"/jui/-/post-push/docs/components/SearchInput"}}'),a=r("52322"),t=r("22840");let i={},o="ProgressBar",l={},c=[{value:"Features",id:"features",level:3},{value:"Known issues",id:"known-issues",level:3},{value:"Live example",id:"live-example",level:3}];function h(e){let s={a:"a",code:"code",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.header,{children:(0,a.jsx)(s.h1,{id:"progressbar",children:"ProgressBar"})}),"\n",(0,a.jsxs)(s.p,{children:[(0,a.jsx)(s.a,{href:"https://jetbrains.github.io/ui/controls/progress_bar/",children:"ProgressBar"})," component, for showing a simple progress bar, or\na ",(0,a.jsx)(s.a,{href:"https://github.com/JetBrains/intellij-community/blob/82f201386c3f7a339ff25fc8f3389024c8078a87/platform/platform-api/src/com/intellij/openapi/ui/panel/ProgressPanel.java#L28",children:"ProgressPanel"}),",\nconsisted of a progress bar, a label, details, and control buttons."]}),"\n",(0,a.jsx)(s.h3,{id:"features",children:"Features"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsxs)(s.li,{children:["Showing ",(0,a.jsx)(s.a,{href:"https://jetbrains.github.io/ui/controls/progress_bar/#process-name",children:"process name"})," and\n",(0,a.jsx)(s.a,{href:"https://jetbrains.github.io/ui/controls/progress_bar/#process-details",children:"details"}),"."]}),"\n",(0,a.jsx)(s.li,{children:(0,a.jsx)(s.a,{href:"https://jetbrains.github.io/ui/controls/progress_bar/#04",children:"Indeterminate"})}),"\n",(0,a.jsxs)(s.li,{children:["Value label for ",(0,a.jsx)(s.a,{href:"https://jetbrains.github.io/ui/controls/progress_bar/#13",children:"showing percentage when space is limited"})]}),"\n",(0,a.jsxs)(s.li,{children:[(0,a.jsx)(s.a,{href:"https://jetbrains.github.io/ui/controls/progress_bar/#process-control",children:"Pause, resume and cancel buttons"}),"."]}),"\n"]}),"\n",(0,a.jsx)(s.h3,{id:"known-issues",children:"Known issues"}),"\n",(0,a.jsx)(s.p,{children:"There are a couple of UI issues because of the current layout (which can be improved probably):"}),"\n",(0,a.jsxs)(s.ul,{children:["\n",(0,a.jsx)(s.li,{children:"max-width of the label and details, it's not necessarily aligned with the the progressbar track, because they don't\nshare the same container"}),"\n",(0,a.jsx)(s.li,{children:"when label is on the side, details is aligned with the label, instead of the progressbar track."}),"\n"]}),"\n",(0,a.jsx)(s.h3,{id:"live-example",children:"Live example"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-jsx",metastring:"live themed",live:!0,children:'<>\n  <ProgressBar value={20} /> <br />\n  <ProgressBar isIndeterminate name="Indeterminate" /> <br />\n  <ProgressBar\n    value={40}\n    name="With name, details and controls"\n    details="10 files of 256 files - About 10 minutes left"\n    button={\n      <>\n        <ProgressBarPauseButton\n          paused={false} /* try changing this to true */\n        />\n        {/* <ProgressBarStopButton /> */}\n      </>\n    }\n  />\n  <br />\n  <ProgressBar value={70} name="Name on side:" namePosition="side" /> <br />\n  <br />\n  <ProgressBar\n    value={70}\n    name="With value label:"\n    namePosition="side"\n    showValueLabel\n  />\n  <br />\n  <ProgressBar value={25} name="In dialog" button={<Button>Cancel</Button>} />\n  <br />\n</>\n'})})]})}function u(e={}){let{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}}}]);
//# sourceMappingURL=db01af23.73378a5d.js.map