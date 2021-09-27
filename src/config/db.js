const config = {
  name: {
    doc: "Name of database",
    format: "*",
    default: "",
    env: "DATABASE_NAME",
    sensitive: true,
  },
  username: {
    doc: "Database user",
    format: "*",
    default: "",
    env: "DATABASE_USER",
    sensitive: true,
  },
  password: {
    doc: "Password for database user",
    format: "*",
    default: "",
    env: "DATABASE_PASSWORD",
    sensitive: true,
  },
  host: {
    doc: "Database host",
    format: "*",
    default: "localhost",
    env: "DATABASE_HOST",
    sensitive: true,
  },
  dialect: {
    doc: "SQL Dialect",
    format: "*",
    default: "postgres",
    env: "DATABASE_DIALECT",
    sensitive: false,
  },
  port: {
    doc: "Database port",
    format: "port",
    default: 5432,
    env: "DATABASE_PORT",
    sensitive: false,
  },
};

exports.db = config;
