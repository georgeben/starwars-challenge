import {
  createContainer, asClass, InjectionMode, Lifetime, asFunction, asValue,
} from "awilix";
import { scopePerRequest } from "awilix-express";
import config from "config";
import logger from "infra/logger";
import routes from "interfaces/http/routes/router";
import httpServer from "interfaces/http/Server";
import Swapi from "infra/services/Swapi";
import db from "infra/database/models";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  db: asValue(db),
  logger: asValue(logger),
  containerMiddleware: asValue(scopePerRequest(container)),
  routes: asFunction(routes),
  httpServer: asClass(httpServer),
  swapi: asClass(Swapi).singleton(),
});

container.loadModules(
  [
    // Load use-cases
    [
      "app/**/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
    // Load repositories
    [
      "infra/repositories/**/*.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  },
);

container.loadModules(
  [
    // Load entities
    [
      "domain/entities/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    resolverOptions: {},
    cwd: __dirname,
  },
);

export default container;
