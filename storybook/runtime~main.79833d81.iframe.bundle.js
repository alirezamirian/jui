(()=>{"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},deferred=[],__webpack_require__.O=(result,chunkIds,fn,priority)=>{if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){for(var[chunkIds,fn,priority]=deferred[i],fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((key=>__webpack_require__.O[key](chunkIds[j])))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?obj=>Object.getPrototypeOf(obj):obj=>obj.__proto__,__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((key=>def[key]=()=>value[key]));return def.default=()=>value,__webpack_require__.d(ns,def),ns},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=chunkId=>Promise.all(Object.keys(__webpack_require__.f).reduce(((promises,key)=>(__webpack_require__.f[key](chunkId,promises),promises)),[])),__webpack_require__.u=chunkId=>(({239:"ThreeViewSplitter-ThreeViewSplitter-stories",448:"Menu-Menu-stories",487:"ToolWindows-stories-StyledStripeButton-stories",594:"ProgressBar-ProgressBar-stories",600:"Tooltip-ValidationTooltip-stories",878:"List-List-stories",1154:"Resizer-HorizontalResizer-stories",1164:"Menu-SpeedSearchMenu-stories",1186:"Balloon-Balloon-stories",1507:"Tabs-1-StyledTabs-stories",1978:"ToolWindows-stories-Stripe-stories",2081:"Tooltip-HelpTooltip-stories",2110:"Toolbar-Toolbar-stories",2375:"ToolWindows-stories-ToolWindows-stories",2601:"Popup-Popup-stories",3149:"Checkbox-Checkbox-stories",3157:"ButtonGroup-ButtonGroup-stories",3173:"SpeedSearch-SpeedSearch-stories",3623:"Mnemonic-MnemonicTrigger-stories",3736:"StatusBar-StatusBar-stories",3903:"Popup-PopupTrigger-stories",4010:"Tooltip-ActionTooltip-stories",4019:"ModalWindow-ModalWindow-stories",4477:"Dropdown-ComboBox-stories",4845:"Tree-SpeedSearchTree-SpeedSearchTree-stories",5062:"Tabs-3-TabThemes-stories",5128:"Tree-Tree-stories",5179:"List-SpeedSearchList-SpeedSearchList-stories",5195:"InputField-Input-stories",5363:"ToolWindows-stories-StyledOuterLayout-stories",5531:"Tooltip-ActionHelpTooltip-stories",5534:"Balloon-BalloonManager-stories",6475:"TreeActions-TreeActions-stories",7752:"demo-stories",7827:"Tabs-2-Tabs-stories",8e3:"Link-Link-stories",8165:"SearchInput-SearchInput-stories",8178:"Tooltip-TooltipTrigger-stories",8304:"Dropdown-Dropdown-stories",8458:"ToolWindows-stories-StyledStripe-stories",9200:"AlertDialog-AlertDialog-stories",9228:"Button-Button-stories",9396:"ActionSystem-useShortcut-stories",9816:"InputField-InputField-stories",9957:"theme-stories"}[chunkId]||chunkId)+"."+{116:"001b0398",162:"0f1da473",239:"c4a6c382",261:"bc531772",300:"84b90efe",448:"4359283f",471:"bab13c6b",487:"3160afa9",491:"0ed3ecb2",594:"d8c29a58",600:"e9609b63",615:"572962b5",622:"9a9d5631",691:"2a775192",764:"c9ee3424",849:"922f2b66",868:"7d8d6ff8",878:"bd85a857",972:"e7ac155d",1154:"35479cf9",1164:"8c18ae2d",1186:"35133be7",1276:"edcc1c04",1507:"254a2b58",1569:"219a98aa",1585:"8ac156aa",1593:"bd53f5f2",1594:"9bf891a8",1628:"e6bf47a1",1649:"c7897365",1680:"e9c3f0ed",1748:"bb872e9e",1941:"d31206bd",1978:"a6762722",2014:"12e1d3e1",2081:"9fdb962a",2092:"e2cf86e5",2101:"5d1bf5ce",2106:"2369df30",2110:"b2da32e8",2168:"e84d8400",2187:"2344dbd9",2271:"56415b68",2287:"d1ef9556",2375:"fb9ca85a",2388:"a27b0a8f",2413:"ddfa6af9",2521:"35776820",2583:"26abf3b3",2601:"df5acaf4",2655:"20997d08",2676:"b8970276",2862:"6e74b299",2906:"af0e29c8",2923:"41bcad36",3008:"e4daefc1",3130:"21058b9f",3149:"5abea39c",3157:"8fc12252",3173:"90fb3cd3",3188:"8c11afc5",3315:"5925ce7e",3338:"efcd42a8",3399:"fdbfec2b",3504:"179bb538",3553:"4f4cb5bb",3554:"237de6e6",3623:"5727c944",3653:"f172305c",3673:"77684434",3736:"67bacec4",3855:"88b970c3",3903:"38299b12",4010:"dc77fa71",4019:"78eccb2f",4035:"a8553744",4073:"40843b49",4097:"6f0105b2",4174:"4d5a77c8",4246:"c8d73463",4329:"c2bd1a9c",4366:"6474bac3",4369:"f68aa8b5",4450:"d86d4591",4454:"7409ff3a",4462:"5778e7fd",4477:"8ca218bc",4508:"9f3af72a",4511:"18f7846f",4526:"f6adb1a2",4558:"c7c1bcaf",4587:"0ae0d50f",4610:"9e8156c8",4729:"17a5a0c3",4743:"873e7c4a",4845:"f56d4840",4858:"823fc7e8",4896:"20d2a498",4911:"a02a6bb4",4923:"452c6c11",4927:"208e4307",4929:"7dd08f28",4955:"b9a29c18",5018:"87e0c2e2",5062:"e420fdbd",5128:"118cd9c3",5179:"c49709a0",5195:"f7a7c197",5257:"397ea4ec",5363:"b44bf178",5454:"c412c277",5524:"1bbdf567",5531:"83cc2a1b",5534:"c620c1fe",5669:"54204e92",5706:"8d825bc2",5881:"ea874fbd",5900:"8bb8ca74",5923:"d2e4b5ff",5924:"5b25cc06",5925:"c9bb498d",5972:"a883b4b1",5974:"7d7c24d3",6022:"cbf9ec04",6038:"ea8f6c9f",6057:"3215a19f",6139:"54761346",6162:"02058e6b",6175:"c08b8c5a",6216:"5ad90276",6223:"97618cc8",6330:"1c7bad80",6331:"3eb05feb",6354:"8c318f9e",6470:"37bcc169",6475:"bef4d4d6",6524:"646d9ea0",6557:"724d4288",6751:"68a30802",6792:"e3a992cf",6795:"7f6ec839",6828:"46e1fe59",6844:"bc5bf3ce",6873:"19650111",7081:"679fc652",7125:"6f77ab31",7127:"173408c0",7135:"1390c56b",7148:"3cf0f2a1",7204:"ca517c94",7360:"6fbc179f",7440:"777e3e5b",7447:"00503ce4",7453:"5c03fc64",7483:"b8879445",7503:"f56881db",7528:"18bf86d0",7604:"2dafe519",7619:"93381c23",7752:"4bdfe484",7827:"7079a968",7908:"8cfa18db",7971:"06b05961",7998:"dc98e2f4",8e3:"52cbfa98",8147:"bcb73691",8153:"d2543493",8165:"7d66fe6d",8178:"5f69f21d",8304:"8b02fbfa",8308:"4177d4fd",8309:"8ab9cd02",8327:"1d7a423b",8390:"600f29fd",8458:"b8c03674",8677:"a7514f2a",8750:"59750a4c",8889:"e6fe96bb",8903:"1cca8fb9",8941:"57bbe589",8947:"4f1e39e4",9004:"820fa411",9084:"0fde3929",9200:"aba11c42",9228:"a3a45fd3",9284:"c84350e5",9304:"e4ac062d",9338:"d9b2b2ea",9342:"09be6e51",9396:"17070e58",9482:"1b96337a",9538:"6439ffd3",9741:"95f24a8d",9816:"3692c564",9831:"44cab57f",9909:"f846c7ca",9927:"170bdc85",9953:"e5fad01d",9957:"1f753674"}[chunkId]+".iframe.bundle.js"),__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),inProgress={},__webpack_require__.l=(url,done,key,chunkId)=>{if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="@intellij-platform/core:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","@intellij-platform/core:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=(prev,event)=>{script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((fn=>fn(event))),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=module=>(module.paths=[],module.children||(module.children=[]),module),__webpack_require__.p="",(()=>{__webpack_require__.b=document.baseURI||self.location.href;var installedChunks={1303:0};__webpack_require__.f.j=(chunkId,promises)=>{var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(1303!=chunkId){var promise=new Promise(((resolve,reject)=>installedChunkData=installedChunks[chunkId]=[resolve,reject]));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(event=>{if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=chunkId=>0===installedChunks[chunkId];var webpackJsonpCallback=(parentChunkLoadingFunction,data)=>{var moduleId,chunkId,[chunkIds,moreModules,runtime]=data,i=0;if(chunkIds.some((id=>0!==installedChunks[id]))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))})(),__webpack_require__.nc=void 0})();