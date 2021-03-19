import { fileUtil } from './file.util';

const fileMock = {
  './a.js': `let a = 1;`,
  './root.js': `
    import('./b.js');
    import c from './c.js';
  `,
  './b.js': `import('./folder1/e.js');`,
  './c.js': `import('./folder1/d.js');`,
  './folder1/d.js': `import('./e.js');`,
  './folder1/e.js': `const e = 1;`,
};

jest.mock('fs', () => {
  return {
    __esModule: true,
    default: {
      readFileSync: jest.fn(filePath => {
        const path = require('path');

        if (path.isAbsolute(filePath)) {
          filePath = `./${path.relative(process.cwd(), filePath)}`;
        }
        
        if (fileMock[filePath]) {
          return fileMock[filePath];
        }
        else {
          throw 'no such file or directory';
        }
      }),
    },
  };
});

describe('fileUtil', () => {
  describe('readFile', () => {
    it('wroks', () => {

      const file = fileUtil.read('./a.js');

      expect(file).toBe('let a = 1;');
    });
  });

  describe('getDependents', () => {
    it('works', () => {
      const file = fileUtil.getDependents('./root.js');

      expect(file).toEqual(
        ['./b.js', './c.js'],
      );
    });
  });

  describe('getDependentGraph', () => {
    it('works', () => {
      const dependentGraph = fileUtil.getDependentGraph('./root.js');

      expect(dependentGraph).toMatchSnapshot();
    });
  });
});
