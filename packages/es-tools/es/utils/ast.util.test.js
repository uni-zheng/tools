import { astUtil } from './ast.util';

describe('astUtil', () => {

  describe('getDependents', () => {

    it('works', () => {
      const file = `
        import a from './a';
        import('./b.js');
        
        const variable = 1;
        func();
        
        export { variable };
        export default variable;
        export c from 'c';
        export * from 'd.js';
      `;

      const dependents = astUtil.getDependents(astUtil.parse(file));

      expect(dependents).toEqual(
        ['./a', './b.js', 'c', 'd.js'],
      );
    });

  });
});
