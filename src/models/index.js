'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import sequelize from '../../config/database.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

var exportModels = {};
const allModels = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js" &&
    file.indexOf(".test.js") === -1
  );
});

await Promise.all(
  allModels.map(async (file) => {
    let model = await import(path.join(__dirname, file));
    let modelInstance = model.default.init(sequelize, Sequelize.DataTypes);
    exportModels[modelInstance.name] = modelInstance;
  })
);

try {
  Object.keys(exportModels).forEach((modelName) => {
    if (exportModels[modelName].associate) {
      exportModels[modelName].associate(exportModels);
    }
  });
} catch (error) {
  logger.log("error", "Mapping Model Association Failed - " + error);
}

const db = {
  ...exportModels,
  sequelize: sequelize,
  Sequelize: Sequelize,
};
export default db;


// const getAllModel = async (rootDir) => {
//     for (const file of fs.readdirSync(rootDir)) {
//       let childPath = path.join(rootDir, file);

//       if (fs.lstatSync(childPath).isDirectory()) {
//           await getAllModel(childPath);
//       } else if (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') {
//           const modelDef = await import(childPath);
//           const model = modelDef.default.init(sequelize, Sequelize.DataTypes);
//           db[model.name] = model;
//       }
//     }
// }
 

// await Promise(getAllModel(__dirname))

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
