const { TSESTree, AST_NODE_TYPES } = require("@typescript-eslint/utils");
/**
 *
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    messages: {
      wrongGenericArg:
        "The generic type argument of UnknownThemeProp should be the same as value",
    },
    fixable: "code",
    type: "problem",
    // docs: "TODO: document on the website, and link to it",
  },
  create(context) {
    return {
      /**
       * @param node {import('@typescript-eslint/utils').TSESTree.TSAsExpression}
       */
      TSAsExpression(node) {
        const genericTypeParam =
          node.typeAnnotation?.typeParameters?.params?.[0];
        if (
          node.typeAnnotation.type === "TSTypeReference" &&
          node.typeAnnotation.typeName.type === "Identifier" &&
          node.typeAnnotation.typeName.name === "UnknownThemeProp" &&
          node.expression.type === "Literal" &&
          genericTypeParam?.type === "TSLiteralType" &&
          genericTypeParam?.literal.type === "Literal"
        ) {
          if (node.expression.value !== genericTypeParam.literal.value) {
            context.report({
              node: genericTypeParam.literal,
              messageId: "wrongGenericArg",
              fix: (fixer) => {
                return fixer.replaceText(
                  genericTypeParam.literal,
                  node.expression.raw
                );
              },
              data: { value: node.expression.value },
            });
          }
        }
      },
    };
  },
};
