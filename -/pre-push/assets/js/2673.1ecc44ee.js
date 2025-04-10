"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["2673"],{41763:function(e,t,n){n.d(t,{Z:()=>eI});var s=n("2784"),i=n("77993"),a=n("2724"),o=n("52322");let l=s.createContext(null);function d(e){let{children:t,content:n}=e,i=(0,s.useMemo)(()=>({metadata:n.metadata,frontMatter:n.frontMatter,assets:n.assets,contentTitle:n.contentTitle,toc:n.toc}),[n]);return(0,o.jsx)(l.Provider,{value:i,children:t})}function r(){let e=(0,s.useContext)(l);if(null===e)throw new a.i6("DocProvider");return e}function c(){let{metadata:e,frontMatter:t,assets:n}=r();return(0,o.jsx)(i.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}d.__docgenInfo={description:"This is a very thin layer around the `content` received from the MDX loader.\nIt provides metadata about the doc to the children tree.",methods:[],displayName:"DocProvider"},c.__docgenInfo={description:"",methods:[],displayName:"DocItemMetadata"};var m=n("36299"),u=n("38163"),h=n("75402"),p=n("16131");function f(e){let{permalink:t,title:n,subLabel:s,isNext:i}=e;return(0,o.jsxs)(p.Z,{className:(0,m.Z)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[s&&(0,o.jsx)("div",{className:"pagination-nav__sublabel",children:s}),(0,o.jsx)("div",{className:"pagination-nav__label",children:n})]})}function g(e){let{previous:t,next:n}=e;return(0,o.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,o.jsx)(f,{...t,subLabel:(0,o.jsx)(h.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,o.jsx)(f,{...n,subLabel:(0,o.jsx)(h.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function x(){let{metadata:e}=r();return(0,o.jsx)(g,{previous:e.previous,next:e.next})}f.__docgenInfo={description:"",methods:[],displayName:"PaginatorNavLink"},g.__docgenInfo={description:"",methods:[],displayName:"DocPaginator"},x.__docgenInfo={description:"This extra component is needed, because <DocPaginator> should remain generic.\nDocPaginator is used in non-docs contexts too: generated-index pages...",methods:[],displayName:"DocItemPaginator"};var b=n("31906"),v=n("70208"),_=n("71329"),j=n("87841"),N=n("32313");let y={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function I(e){let t=y[e.versionMetadata.banner];return(0,o.jsx)(t,{...e})}function C(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,o.jsx)("b",{children:(0,o.jsx)(p.Z,{to:n,onClick:s,children:(0,o.jsx)(h.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function T(e){let{className:t,versionMetadata:n}=e,{siteConfig:{title:s}}=(0,b.Z)(),{pluginId:i}=(0,v.gA)({failfast:!0}),{savePreferredVersionName:a}=(0,j.J)(i),{latestDocSuggestion:l,latestVersionSuggestion:d}=(0,v.Jo)(i),r=l??d.docs.find(e=>e.id===d.mainDocId);return(0,o.jsxs)("div",{className:(0,m.Z)(t,_.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,o.jsx)("div",{children:(0,o.jsx)(I,{siteTitle:s,versionMetadata:n})}),(0,o.jsx)("div",{className:"margin-top--md",children:(0,o.jsx)(C,{versionLabel:d.label,to:r.path,onClick:()=>a(d.name)})})]})}function Z(e){let{className:t}=e,n=(0,N.E)();return n.banner?(0,o.jsx)(T,{className:t,versionMetadata:n}):null}function k(e){let{className:t}=e,n=(0,N.E)();return n.badge?(0,o.jsx)("span",{className:(0,m.Z)(t,_.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(h.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}Z.__docgenInfo={description:"",methods:[],displayName:"DocVersionBanner"},k.__docgenInfo={description:"",methods:[],displayName:"DocVersionBadge"};let L={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};function w(e){let{permalink:t,label:n,count:s,description:i}=e;return(0,o.jsxs)(p.Z,{href:t,title:i,className:(0,m.Z)(L.tag,s?L.tagWithCount:L.tagRegular),children:[n,s&&(0,o.jsx)("span",{children:s})]})}w.__docgenInfo={description:"",methods:[],displayName:"Tag"};function B(e){let{tags:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("b",{children:(0,o.jsx)(h.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,o.jsx)("ul",{className:(0,m.Z)("tags_q74f","padding--none","margin-left--sm"),children:t.map(e=>(0,o.jsx)("li",{className:"tag_lSC7",children:(0,o.jsx)(w,{...e})},e.permalink))})]})}B.__docgenInfo={description:"",methods:[],displayName:"TagsListInline"};function D(e){let{className:t,...n}=e;return(0,o.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,m.Z)("iconEdit_UohW",t),"aria-hidden":"true",...n,children:(0,o.jsx)("g",{children:(0,o.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function U(e){let{editUrl:t}=e;return(0,o.jsxs)(p.Z,{to:t,className:_.k.common.editThisPage,children:[(0,o.jsx)(D,{}),(0,o.jsx)(h.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}function E(e){let{lastUpdatedAt:t}=e,n=new Date(t),s=(function(e){void 0===e&&(e={});let{i18n:{currentLocale:t}}=(0,b.Z)(),n=function(){let{i18n:{currentLocale:e,localeConfigs:t}}=(0,b.Z)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:n,...e})})({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(n);return(0,o.jsx)(h.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,o.jsx)("b",{children:(0,o.jsx)("time",{dateTime:n.toISOString(),itemProp:"dateModified",children:s})})},children:" on {date}"})}function M(e){let{lastUpdatedBy:t}=e;return(0,o.jsx)(h.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,o.jsx)("b",{children:t})},children:" by {user}"})}function A(e){let{lastUpdatedAt:t,lastUpdatedBy:n}=e;return(0,o.jsxs)("span",{className:_.k.common.lastUpdated,children:[(0,o.jsx)(h.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,o.jsx)(E,{lastUpdatedAt:t}):"",byUser:n?(0,o.jsx)(M,{lastUpdatedBy:n}):""},children:"Last updated{atDate}{byUser}"}),!1]})}D.__docgenInfo={description:"",methods:[],displayName:"IconEdit"},U.__docgenInfo={description:"",methods:[],displayName:"EditThisPage"},A.__docgenInfo={description:"",methods:[],displayName:"LastUpdated"};function H(e){let{className:t,editUrl:n,lastUpdatedAt:s,lastUpdatedBy:i}=e;return(0,o.jsxs)("div",{className:(0,m.Z)("row",t),children:[(0,o.jsx)("div",{className:"col",children:n&&(0,o.jsx)(U,{editUrl:n})}),(0,o.jsx)("div",{className:(0,m.Z)("col","lastUpdated_g62E"),children:(s||i)&&(0,o.jsx)(A,{lastUpdatedAt:s,lastUpdatedBy:i})})]})}function P(){let{metadata:e}=r(),{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,tags:i}=e,a=i.length>0,l=!!(t||n||s);return a||l?(0,o.jsxs)("footer",{className:(0,m.Z)(_.k.docs.docFooter,"docusaurus-mt-lg"),children:[a&&(0,o.jsx)("div",{className:(0,m.Z)("row margin-top--sm",_.k.docs.docFooterTagsRow),children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)(B,{tags:i})})}),l&&(0,o.jsx)(H,{className:(0,m.Z)("margin-top--sm",_.k.docs.docFooterEditMetaRow),editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s})]}):null}H.__docgenInfo={description:"",methods:[],displayName:"EditMetaRow"},P.__docgenInfo={description:"",methods:[],displayName:"DocItemFooter"};var V=n("54986"),O=n("86490");function R(e){let t=e.getBoundingClientRect();return t.top===t.bottom?R(e.parentNode):t}function S(e){let{toc:t,className:n,linkClassName:s,isChild:i}=e;return t.length?(0,o.jsx)("ul",{className:i?void 0:n,children:t.map(e=>(0,o.jsxs)("li",{children:[(0,o.jsx)(p.Z,{to:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,o.jsx)(S,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id))}):null}S.__docgenInfo={description:"",methods:[],displayName:"TOCItemTree"};let F=s.memo(S);function q(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:i="table-of-contents__link",linkActiveClassName:a,minHeadingLevel:l,maxHeadingLevel:d,...r}=e,c=(0,O.L)(),m=l??c.tableOfContents.minHeadingLevel,u=d??c.tableOfContents.maxHeadingLevel,h=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:i}=e;return(0,s.useMemo)(()=>(function e(t){let{toc:n,minHeadingLevel:s,maxHeadingLevel:i}=t;return n.flatMap(t=>{let n=e({toc:t.children,minHeadingLevel:s,maxHeadingLevel:i});return t.level>=s&&t.level<=i?[{...t,children:n}]:n})})({toc:function(e){let t=e.map(e=>({...e,parentIndex:-1,children:[]})),n=Array(7).fill(-1);t.forEach((e,t)=>{let s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t});let s=[];return t.forEach(e=>{let{parentIndex:n,...i}=e;n>=0?t[n].children.push(i):s.push(i)}),s}(t),minHeadingLevel:n,maxHeadingLevel:i}),[t,n,i])}({toc:t,minHeadingLevel:m,maxHeadingLevel:u});return!function(e){let t=(0,s.useRef)(void 0),n=function(){let e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,O.L)();return(0,s.useEffect)(()=>{e.current=t?0:document.querySelector(".navbar").clientHeight},[t]),e}();(0,s.useEffect)(()=>{if(!e)return()=>{};let{linkClassName:s,linkActiveClassName:i,minHeadingLevel:a,maxHeadingLevel:o}=e;function l(){let e=Array.from(document.getElementsByClassName(s)),l=function(e,t){let{anchorTopOffset:n}=t,s=e.find(e=>R(e).top>=n);if(s){var i;return(i=R(s)).top>0&&i.bottom<window.innerHeight/2?s:e[e.indexOf(s)-1]??null}return e[e.length-1]??null}(function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e,s=[];for(let e=t;e<=n;e+=1)s.push(`h${e}.anchor`);return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:a,maxHeadingLevel:o}),{anchorTopOffset:n.current}),d=e.find(e=>l&&l.id===decodeURIComponent(e.href.substring(e.href.indexOf("#")+1)));e.forEach(e=>{e===d?(t.current&&t.current!==e&&t.current.classList.remove(i),e.classList.add(i),t.current=e):e.classList.remove(i)})}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}},[e,n])}((0,s.useMemo)(()=>{if(i&&a)return{linkClassName:i,linkActiveClassName:a,minHeadingLevel:m,maxHeadingLevel:u}},[i,a,m,u])),(0,o.jsx)(F,{toc:h,className:n,linkClassName:i,...r})}q.__docgenInfo={description:"",methods:[],displayName:"TOCItems",props:{className:{defaultValue:{value:"'table-of-contents table-of-contents__left-border'",computed:!1},required:!1},linkClassName:{defaultValue:{value:"'table-of-contents__link'",computed:!1},required:!1},linkActiveClassName:{defaultValue:{value:"undefined",computed:!0},required:!1}}};let z={tocCollapsibleButton:"tocCollapsibleButton_htYj",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_pAh7"};function J(e){let{collapsed:t,...n}=e;return(0,o.jsx)("button",{type:"button",...n,className:(0,m.Z)("clean-btn",z.tocCollapsibleButton,!t&&z.tocCollapsibleButtonExpanded,n.className),children:(0,o.jsx)(h.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}J.__docgenInfo={description:"",methods:[],displayName:"TOCCollapsibleCollapseButton"};let W={tocCollapsible:"tocCollapsible_O_Qc",tocCollapsibleContent:"tocCollapsibleContent_SlnY",tocCollapsibleExpanded:"tocCollapsibleExpanded_klrc"};function X(e){let{toc:t,className:n,minHeadingLevel:s,maxHeadingLevel:i}=e,{collapsed:a,toggleCollapsed:l}=(0,V.u)({initialState:!0});return(0,o.jsxs)("div",{className:(0,m.Z)(W.tocCollapsible,!a&&W.tocCollapsibleExpanded,n),children:[(0,o.jsx)(J,{collapsed:a,onClick:l}),(0,o.jsx)(V.z,{lazy:!0,className:W.tocCollapsibleContent,collapsed:a,children:(0,o.jsx)(q,{toc:t,minHeadingLevel:s,maxHeadingLevel:i})})]})}X.__docgenInfo={description:"",methods:[],displayName:"TOCCollapsible"};function Y(){let{toc:e,frontMatter:t}=r();return(0,o.jsx)(X,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,m.Z)(_.k.docs.docTocMobile,"tocMobile_tjDr")})}Y.__docgenInfo={description:"",methods:[],displayName:"DocItemTOCMobile"};function $(e){let{className:t,...n}=e;return(0,o.jsx)("div",{className:(0,m.Z)("tableOfContents_TN1Q","thin-scrollbar",t),children:(0,o.jsx)(q,{...n,linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})})}function Q(){let{toc:e,frontMatter:t}=r();return(0,o.jsx)($,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:_.k.docs.docTocDesktop})}$.__docgenInfo={description:"",methods:[],displayName:"TOC"},Q.__docgenInfo={description:"",methods:[],displayName:"DocItemTOCDesktop"};var G=n("3339"),K=n("22840"),ee=n("27317");function et(e){let{children:t}=e;return(0,o.jsx)(K.Z,{components:ee.Z,children:t})}function en(e){let{children:t}=e,n=function(){let{metadata:e,frontMatter:t,contentTitle:n}=r();return t.hide_title||void 0!==n?null:e.title}();return(0,o.jsxs)("div",{className:(0,m.Z)(_.k.docs.docMarkdown,"markdown"),children:[n&&(0,o.jsx)("header",{children:(0,o.jsx)(G.Z,{as:"h1",children:n})}),(0,o.jsx)(et,{children:t})]})}et.__docgenInfo={description:"",methods:[],displayName:"MDXContent"},en.__docgenInfo={description:"",methods:[],displayName:"DocItemContent"};var es=n("45535"),ei=n("65180"),ea=n("31260");function eo(e){return(0,o.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,o.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}eo.__docgenInfo={description:"",methods:[],displayName:"IconHome"};function el(){let e=(0,ea.ZP)("/");return(0,o.jsx)("li",{className:"breadcrumbs__item",children:(0,o.jsx)(p.Z,{"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,o.jsx)(eo,{className:"breadcrumbHomeIcon_JFrk"})})})}el.__docgenInfo={description:"",methods:[],displayName:"HomeBreadcrumbItem"};function ed(e){let{children:t,href:n,isLast:s}=e,i="breadcrumbs__link";return s?(0,o.jsx)("span",{className:i,itemProp:"name",children:t}):n?(0,o.jsx)(p.Z,{className:i,href:n,itemProp:"item",children:(0,o.jsx)("span",{itemProp:"name",children:t})}):(0,o.jsx)("span",{className:i,children:t})}function er(e){let{children:t,active:n,index:s,addMicrodata:i}=e;return(0,o.jsxs)("li",{...i&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,m.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,o.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function ec(){let e=(0,es.s1)(),t=(0,ei.Ns)();return e?(0,o.jsx)("nav",{className:(0,m.Z)(_.k.docs.docBreadcrumbs,"breadcrumbsContainer_zCmv"),"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,o.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,o.jsx)(el,{}),e.map((t,n)=>{let s=n===e.length-1,i="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,o.jsx)(er,{active:s,index:n,addMicrodata:!!i,children:(0,o.jsx)(ed,{href:i,isLast:s,children:t.label})},n)})]})}):null}ec.__docgenInfo={description:"",methods:[],displayName:"DocBreadcrumbs"};var em=n("42320");function eu(){return(0,o.jsx)(h.Z,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"})}function eh(){return(0,o.jsx)(h.Z,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function ep(){return(0,o.jsx)(em.Z,{children:(0,o.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function ef(){return(0,o.jsx)(h.Z,{id:"theme.contentVisibility.draftBanner.title",description:"The draft content banner title",children:"Draft page"})}function eg(){return(0,o.jsx)(h.Z,{id:"theme.contentVisibility.draftBanner.message",description:"The draft content banner message",children:"This page is a draft. It will only be visible in dev and be excluded from the production build."})}eu.__docgenInfo={description:"",methods:[],displayName:"UnlistedBannerTitle"},eh.__docgenInfo={description:"",methods:[],displayName:"UnlistedBannerMessage"},ep.__docgenInfo={description:"",methods:[],displayName:"UnlistedMetadata"},ef.__docgenInfo={description:"",methods:[],displayName:"DraftBannerTitle"},eg.__docgenInfo={description:"",methods:[],displayName:"DraftBannerMessage"};var ex=n("86573");function eb(e){let{className:t}=e;return(0,o.jsx)(ex.Z,{type:"caution",title:(0,o.jsx)(ef,{}),className:(0,m.Z)(t,_.k.common.draftBanner),children:(0,o.jsx)(eg,{})})}function ev(e){let{className:t}=e;return(0,o.jsx)(ex.Z,{type:"caution",title:(0,o.jsx)(eu,{}),className:(0,m.Z)(t,_.k.common.unlistedBanner),children:(0,o.jsx)(eh,{})})}function e_(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(ep,{}),(0,o.jsx)(ev,{...e})]})}function ej(e){let{metadata:t}=e,{unlisted:n,frontMatter:s}=t;return(0,o.jsxs)(o.Fragment,{children:[(n||s.unlisted)&&(0,o.jsx)(e_,{}),s.draft&&(0,o.jsx)(eb,{})]})}eb.__docgenInfo={description:"",methods:[],displayName:"Draft"},e_.__docgenInfo={description:"",methods:[],displayName:"Unlisted"},ej.__docgenInfo={description:"",methods:[],displayName:"ContentVisibility"};let eN={docItemContainer:"docItemContainer_Rv5Z",docItemCol:"docItemCol_YAwJ"};function ey(e){let{children:t}=e,n=function(){let{frontMatter:e,toc:t}=r(),n=(0,u.i)(),s=e.hide_table_of_contents,i=!s&&t.length>0;return{hidden:s,mobile:i?(0,o.jsx)(Y,{}):void 0,desktop:i&&("desktop"===n||"ssr"===n)?(0,o.jsx)(Q,{}):void 0}}(),{metadata:s}=r();return(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:(0,m.Z)("col",!n.hidden&&eN.docItemCol),children:[(0,o.jsx)(ej,{metadata:s}),(0,o.jsx)(Z,{}),(0,o.jsxs)("div",{className:eN.docItemContainer,children:[(0,o.jsxs)("article",{children:[(0,o.jsx)(ec,{}),(0,o.jsx)(k,{}),n.mobile,(0,o.jsx)(en,{children:t}),(0,o.jsx)(P,{})]}),(0,o.jsx)(x,{})]})]}),n.desktop&&(0,o.jsx)("div",{className:"col col--3",children:n.desktop})]})}function eI(e){let t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,o.jsx)(d,{content:e.content,children:(0,o.jsxs)(i.FG,{className:t,children:[(0,o.jsx)(c,{}),(0,o.jsx)(ey,{children:(0,o.jsx)(n,{})})]})})}ey.__docgenInfo={description:"",methods:[],displayName:"DocItemLayout"},eI.__docgenInfo={description:"",methods:[],displayName:"DocItem"}}}]);
//# sourceMappingURL=2673.1ecc44ee.js.map