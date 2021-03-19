import traverse from '@babel/traverse';
import { parse } from '@babel/parser';

const astUtil = {
  parse(codeString) {
    return parse(codeString, {
      sourceType: 'module',
      plugins: ['jsx', 'exportDefaultFrom'],
    });
  },

  getDependents(ast) {
    const dependencies = [];

    const importVisitor = {
      ImportDeclaration(path) {
        const importDeclarationNode = path.node;

        const dependencyPath = importDeclarationNode.source.value;

        dependencies.push(dependencyPath);
      },

      CallExpression(path) {
        const callExpressionNode = path.node;

        if (callExpressionNode.callee.type !== 'Import') {
          return;
        }

        dependencies.push(callExpressionNode.arguments[0].value);
      },

      ExportNamedDeclaration(path) {
        if (!path.node.source) {
          return;
        }

        dependencies.push(path.node.source.value);
      },

      ExportAllDeclaration(path) {
        dependencies.push(path.node.source.value);
      },
    };

    traverse(ast, importVisitor);

    return dependencies;
  },
};

export { astUtil };
