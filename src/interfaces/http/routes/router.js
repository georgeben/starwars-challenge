/* eslint-disable no-template-curly-in-string */
import { Router } from "express";
import halson from "halson";
import bodyParser from "body-parser";
import requestIp from "request-ip";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "interfaces/http/middleware/errorHandler";
import v1Routes from "./v1";
import error404 from "../middleware/notFoundHandler";

/**
 * Configures express middlewares
 */
export default ({ config, containerMiddleware }) => {
  const router = Router();
  router.use(helmet());
  const NODE_ENV = config.get("app.env");
  router.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

  const bodyLimit = config.get("app.bodyLimit");
  router.use(
    bodyParser.json({
      limit: bodyLimit,
    }),
  );
  router.use(bodyParser.urlencoded({ extended: false, limit: bodyLimit }));

  const allowedOrigins = config.get("app.allowedOrigins");
  router.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.trim() === "*") {
          cb(null, true);
        } else {
          const origins = allowedOrigins.split(",");
          if (origins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
          } else {
            cb(new Error(`Origin('${origin}') not allowed`, false));
          }
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
  );

  router.use(containerMiddleware);
  router.use((req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    req.clientIp = clientIp;
    return next();
  });

  router.get("/", (req, res) => res.json(
    halson({
      message: "Starwars Challenge API",
      version: "1.0.0",
    })
      .addLink("self", "/")
      .addLink("docs", "/rest-docs")
      .addLink("movies", "/v1/movies")
      .addLink("characters", "/v1/movies/${id}/characters")
      .addLink("comment", "/v1/movies/${id}/comments"),
  ));

  router.use("/v1", v1Routes);

  router.use(error404);

  router.use(errorHandler);

  return router;
};
