(self.webpackChunk_intellij_platform_core=self.webpackChunk_intellij_platform_core||[]).push([[4729,6828],{"../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.protocol.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__)},"../../node_modules/monaco-editor/esm/vs/editor/common/services sync recursive ^.*$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./editorBaseApi":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorBaseApi.js","./editorBaseApi.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorBaseApi.js","./editorSimpleWorker":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js","./editorSimpleWorker.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js","./editorWorker":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorker.js","./editorWorker.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorker.js","./editorWorkerHost":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorkerHost.js","./editorWorkerHost.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/editorWorkerHost.js","./findSectionHeaders":"../../node_modules/monaco-editor/esm/vs/editor/common/services/findSectionHeaders.js","./findSectionHeaders.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/findSectionHeaders.js","./getIconClasses":"../../node_modules/monaco-editor/esm/vs/editor/common/services/getIconClasses.js","./getIconClasses.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/getIconClasses.js","./languageFeatureDebounce":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatureDebounce.js","./languageFeatureDebounce.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatureDebounce.js","./languageFeatures":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js","./languageFeatures.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeatures.js","./languageFeaturesService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeaturesService.js","./languageFeaturesService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageFeaturesService.js","./languageService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageService.js","./languageService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languageService.js","./languagesAssociations":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesAssociations.js","./languagesAssociations.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesAssociations.js","./languagesRegistry":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesRegistry.js","./languagesRegistry.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/languagesRegistry.js","./markerDecorations":"../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorations.js","./markerDecorations.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorations.js","./markerDecorationsService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorationsService.js","./markerDecorationsService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorationsService.js","./model":"../../node_modules/monaco-editor/esm/vs/editor/common/services/model.js","./model.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/model.js","./modelService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/modelService.js","./modelService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/modelService.js","./resolverService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/resolverService.js","./resolverService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/resolverService.js","./semanticTokensDto":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensDto.js","./semanticTokensDto.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensDto.js","./semanticTokensProviderStyling":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensProviderStyling.js","./semanticTokensProviderStyling.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensProviderStyling.js","./semanticTokensStyling":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStyling.js","./semanticTokensStyling.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStyling.js","./semanticTokensStylingService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStylingService.js","./semanticTokensStylingService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/semanticTokensStylingService.js","./textModelSync/textModelSync.impl":"../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.impl.js","./textModelSync/textModelSync.impl.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.impl.js","./textModelSync/textModelSync.protocol":"../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.protocol.js","./textModelSync/textModelSync.protocol.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/textModelSync/textModelSync.protocol.js","./textResourceConfiguration":"../../node_modules/monaco-editor/esm/vs/editor/common/services/textResourceConfiguration.js","./textResourceConfiguration.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/textResourceConfiguration.js","./treeSitterParserService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/treeSitterParserService.js","./treeSitterParserService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/treeSitterParserService.js","./treeViewsDnd":"../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDnd.js","./treeViewsDnd.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDnd.js","./treeViewsDndService":"../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDndService.js","./treeViewsDndService.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/treeViewsDndService.js","./unicodeTextModelHighlighter":"../../node_modules/monaco-editor/esm/vs/editor/common/services/unicodeTextModelHighlighter.js","./unicodeTextModelHighlighter.js":"../../node_modules/monaco-editor/esm/vs/editor/common/services/unicodeTextModelHighlighter.js"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="../../node_modules/monaco-editor/esm/vs/editor/common/services sync recursive ^.*$"}}]);