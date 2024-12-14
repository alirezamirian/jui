"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[806],{6838:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>r,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=i(7896),a=(i(2784),i(30876));const o={},s="Collections",l={unversionedId:"guides/Collections",id:"guides/Collections",title:"Collections",description:"A good number of components such as List, Tree, Menu, Tabs, etc. display a collection of items.",source:"@site/docs/guides/Collections.mdx",sourceDirName:"guides",slug:"/guides/Collections",permalink:"/jui/docs/guides/Collections",draft:!1,editUrl:"https://github.com/alirezamirian/jui/edit/master/packages/website/docs/guides/Collections.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Actions",permalink:"/jui/docs/guides/ActionSystem"},next:{title:"AlertDialog",permalink:"/jui/docs/components/AlertDialog"}},r={},c=[{value:"Rendering optimization caveat",id:"rendering-optimization-caveat",level:2},{value:"Using context",id:"using-context",level:3},{value:"Wrapping items with extra state",id:"wrapping-items-with-extra-state",level:3},{value:"Disabling or limiting cache",id:"disabling-or-limiting-cache",level:3}],d={toc:c},p="wrapper";function m(e){let{components:t,...i}=e;return(0,a.kt)(p,(0,n.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"collections"},"Collections"),(0,a.kt)("p",null,"A good number of components such as List, Tree, Menu, Tabs, etc. display a collection of items.\n",(0,a.kt)("a",{parentName:"p",href:"https://react-spectrum.adobe.com/react-stately/collections.html"},"@react-stately/collections")," is used for all of them\nto provide a uniform and flexible API that would allow for both static jsx-based or dynamic source of items."),(0,a.kt)("h2",{id:"rendering-optimization-caveat"},"Rendering optimization caveat"),(0,a.kt)("p",null,"When the API for dynamic items (",(0,a.kt)("inlineCode",{parentName:"p"},"items")," prop and a render function as ",(0,a.kt)("inlineCode",{parentName:"p"},"children"),") is used, the render result for each\nitem ",(0,a.kt)("a",{parentName:"p",href:"https://react-spectrum.adobe.com/react-stately/collections.html#why-not-array-map"},"is subject to caching")," based\non the item object. It's important to understand this assumption that the rendering should only depend on the item, and\nnot any other piece of state, for example, from the closure."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The item renderer function should be a pure function that relies exclusively on its single argument: the item object.")),(0,a.kt)("p",null,"However, in certain scenarios, you might need to render UI elements based on factors other than the item object. Here are a few ways to achieve this:"),(0,a.kt)("h3",{id:"using-context"},"Using context"),(0,a.kt)("p",null,"TODO (This is particularly useful for components implementing virtual rendering, where only a limited number of items are mounted at a time, and changes to additional state should affect only those without rebuilding the entire collection)."),(0,a.kt)("h3",{id:"wrapping-items-with-extra-state"},"Wrapping items with extra state"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h3",{id:"disabling-or-limiting-cache"},"Disabling or limiting cache"),(0,a.kt)("p",null,"For components that support it, you can control caching by setting the ",(0,a.kt)("inlineCode",{parentName:"p"},"cacheInvalidation")," prop. Passing ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," to this prop will disable caching entirely, but it may significantly reduce performance for large collections. In a performance test on a ",(0,a.kt)("a",{parentName:"p",href:"../components/Tree"},"Tree")," with 400 elements, disabling the cache resulted in a ~10x slower rendering."),(0,a.kt)("p",null,"A middle-ground approach is to pass an array of cache invalidators instead of completely turning off the cache:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"<Tree cacheInvalidation={{ invalidators: [nestedSelection] }}>...</Tree>\n")),(0,a.kt)("p",null,"This configuration will only invalidate the cache when ",(0,a.kt)("inlineCode",{parentName:"p"},"nestedSelection")," changes."))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=4d0df159.b762a435.js.map