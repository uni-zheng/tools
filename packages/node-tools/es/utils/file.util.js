import fs from 'fs';
import path from 'path';
import { UZUtils, dataStructure } from '@uniz/es-tools';

const fileUtil = {
  read(filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
  },

  getDependents(filePath) {
    const file = fileUtil.read(filePath);

    return UZUtils.ast.getDependents(UZUtils.ast.parse(file));
  },

  getDependentGraph(filePath) {
    const dependentGraph = new dataStructure.Graph(true);

    dependentGraph.addVertex(filePath);

    updateGraph(filePath);

    return dependentGraph;

    function updateGraph(parentFilePath) {
      const parentDir = path.parse(parentFilePath).dir;
      const subDependents = fileUtil.getDependents(parentFilePath);

      subDependents.forEach(subPath => {

        const resolvedSubPath = `./${path.relative(process.cwd(), path.resolve(parentDir, subPath))}`;

        dependentGraph.addVertex(resolvedSubPath);
        dependentGraph.addEdge(parentFilePath, resolvedSubPath);

        updateGraph(resolvedSubPath);
      });
    }
  },
};

export { fileUtil };
