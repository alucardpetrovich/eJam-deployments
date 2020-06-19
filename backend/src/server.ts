import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { Server } from "http";

import { HttpError } from "@shared/errors";
import { config } from "@src/config";

import { templatesRouter } from "@modules/templates/templates.controller";
import { deploymentsRouter } from "@modules/deployments/deployments.controller";
import { createDbConnection } from "@src/db-connection";

export class DeploymentServer {
  public server: Server;

  private app: Express;

  public async start() {
    this.initServer();
    await createDbConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandler();
    this.startListening();
  }

  private initServer() {
    this.app = express();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
    this.app.use(cors({ origin: config.corsOrigin }));
  }

  private initRoutes() {
    this.app.use("/templates", templatesRouter);
    this.app.use("/deployments", deploymentsRouter);
  }

  private initErrorHandler() {
    this.app.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const statusCode = err.status || 500;

        return res.status(statusCode).json(err.message);
      }
    );
  }

  private startListening() {
    const { port } = config;
    this.server = this.app.listen(port, () => {
      console.log("Server started listening on port", port);
    });
  }
}
