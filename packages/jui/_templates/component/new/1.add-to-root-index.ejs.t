---
inject: true
to: src/index.ts
append: true
skip_if: export .* from "./<%= componentName %>.*
---
export * from "./<%= componentName %>";
