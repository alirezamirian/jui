"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["156"],{10972:function(e,n,t){t.r(n),t.d(n,{conf:function(){return c},language:function(){return g}});var o=e=>`\\b${e}\\b`,i=e=>`(?!${e})`,r=o("[_a-zA-Z][_a-zA-Z0-9]*"),s=o("[_a-zA-Z-0-9]+"),a=`[ \\t\\r\\n]`,c={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"/**",close:" */",notIn:["string"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],indentationRules:{decreaseIndentPattern:RegExp("^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$"),increaseIndentPattern:RegExp("^((?!//).)*(\\{([^}\"'`/]*|(\\t|[ ])*//.*)|\\([^)\"'`/]*|\\[[^\\]\"'`/]*)$"),unIndentedLinePattern:RegExp("^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$")}},g={defaultToken:"",tokenPostfix:".tsp",brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"}],symbols:/[=:;<>]+/,keywords:["import","model","scalar","namespace","op","interface","union","using","is","extends","enum","alias","return","void","if","else","projection","dec","extern","fn"],namedLiterals:["true","false","null","unknown","never"],escapes:'\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|"|\\${)',tokenizer:{root:[{include:"@expression"},{include:"@whitespace"}],stringVerbatim:[{regex:'(|"|"")[^"]',action:{token:"string"}},{regex:`"""${i('"')}`,action:{token:"string",next:"@pop"}}],stringLiteral:[{regex:"\\${",action:{token:"delimiter.bracket",next:"@bracketCounting"}},{regex:'[^\\\\"$]+',action:{token:"string"}},{regex:"@escapes",action:{token:"string.escape"}},{regex:"\\\\.",action:{token:"string.escape.invalid"}},{regex:'"',action:{token:"string",next:"@pop"}}],bracketCounting:[{regex:"{",action:{token:"delimiter.bracket",next:"@bracketCounting"}},{regex:"}",action:{token:"delimiter.bracket",next:"@pop"}},{include:"@expression"}],comment:[{regex:"[^\\*]+",action:{token:"comment"}},{regex:"\\*\\/",action:{token:"comment",next:"@pop"}},{regex:"[\\/*]",action:{token:"comment"}}],whitespace:[{regex:a},{regex:"\\/\\*",action:{token:"comment",next:"@comment"}},{regex:"\\/\\/.*$",action:{token:"comment"}}],expression:[{regex:'"""',action:{token:"string",next:"@stringVerbatim"}},{regex:`"${i('""')}`,action:{token:"string",next:"@stringLiteral"}},{regex:"[0-9]+",action:{token:"number"}},{regex:r,action:{cases:{"@keywords":{token:"keyword"},"@namedLiterals":{token:"keyword"},"@default":{token:"identifier"}}}},{regex:`@${r}`,action:{token:"tag"}},{regex:`#${s}`,action:{token:"directive"}}]}}}}]);
//# sourceMappingURL=156.ea171952.js.map