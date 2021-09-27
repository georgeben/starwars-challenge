/**
 * Error handling middleware
 */
import HttpStatus from "http-status-codes";
import logger from "infra/logger";
import ResponseBuilder from "../response/ResponseBuilder";

// eslint-disable-next-line no-unused-vars
export default async (err, req, res, next) => {
  console.log("Ah ahn", err);
  if (!err.isOperationalError) {
    logger.error("An error occurred: ", { error: err.message || err.toString(), stack: err.stack });
  }

  if (err.name || err.error) {
    if (
      err.name === "ValidationError"
      || (err.error && err.error.name === "ValidationError")
    ) {
      return ResponseBuilder.getResponseHandler(res).onError(
        err.name || err.error.name,
        HttpStatus.BAD_REQUEST,
        err.message || err.error.toString(),
        err.errors || err.error.details,
      );
    }
    return ResponseBuilder.getResponseHandler(res).onError(
      err.name,
      err.status,
      err.message,
      err.data,
    );
  }

  const errorMessage = process.env.NODE_ENV === "production"
    ? "Something bad happened!"
    : err.message;
  const errorData = process.env.NODE_ENV === "production" ? {} : err;
  return ResponseBuilder.getResponseHandler(res).onError(
    "InternalServerError",
    err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    errorMessage,
    errorData,
  );
};
