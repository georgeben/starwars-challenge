import config from "config";

const dbOptions = {
  username: config.get("db.username"),
  password: config.get("db.password"),
  database: config.get("db.name"),
  host: config.get("db.host"),
  dialect: config.get("db.dialect"),
};

module.exports = {
  development: {
    ...dbOptions,
  },
  test: {
    ...dbOptions,
  },
  production: {
    ...dbOptions,
  },
};
