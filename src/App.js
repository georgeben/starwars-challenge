import { connectToDB } from "infra/database/models";
/**
 * Manages application interfaces e.g REST server, gRPC server
 */
class App {
  constructor({ httpServer, logger, db }) {
    this.httpServer = httpServer;
    this.logger = logger;
    this.db = db;
  }

  /**
   * Starts the application interfaces to begin handling user requests
   */
  async start() {
    // await this.db.connect();
    await connectToDB();
    await this.httpServer.start();
  }

  /**
   * Closes the application's interfaces
   */
  shutdown() {
    this.httpServer.close(async (err) => {
      this.logger.info("Shutting down REST server");
      if (err) {
        this.logger.error("Error while shutting down server", {
          error: err.toString(),
        });
        process.exit(1);
      }
      const { sequelize } = this.db;
      sequelize
        .close()
        .then(() => {
          this.logger.info("Successfully disconnected from database");
          process.exit();
        })
        .catch((error) => {
          this.logger.info("Failed to disconnect from database", { error });
          process.exit(1);
        });
    });
  }
}

export default App;
