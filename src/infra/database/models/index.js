import logger from "infra/logger";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// eslint-disable-next-line
const config = require(__dirname + "./../dbconfig.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"))
  .forEach((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// eslint-disable-next-line consistent-return
export const connectToDB = async (numOfRetries = 5) => {
  try {
    logger.info(`Attempting to connect to database. Number of tries left: ${numOfRetries}`);
    await sequelize.authenticate();
    logger.info("Successfully connected to database");
  } catch (error) {
    logger.error("Failed to connect to database", { error });
    if (numOfRetries > 0) {
      return connectToDB(numOfRetries - 1);
    }
    throw error;
  }
};

export default db;
