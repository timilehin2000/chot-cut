import path from "path";
import { readFileSync } from "fs";
import {
  AppStoreServerAPIClient,
  Environment,
  SendTestNotificationResponse,
} from "@apple/app-store-server-library";

import app from "./app";
import config from "./env.config";
import { verify } from "./controllers/payment.controller";

const { port, nodeEnv } = config;

const startServer = async (): Promise<void> => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });

  verify();
};

startServer();
