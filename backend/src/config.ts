import * as dotenv from "dotenv";
import * as path from "path";
import convict from "convict";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const config = convict({
  port: {
    doc: "Port to listen",
    format: Number,
    default: null,
    env: "PORT",
  },

  mongodbUrl: {
    doc: "MongoDB connection URL",
    format: String,
    default: null,
    env: "MONGODB_URL",
  },

  corsOrigin: {
    doc: "Origin who can send CORS-requests",
    format: String,
    default: null,
    env: "CORS_ORIGIN",
  },
})
  .validate()
  .getProperties();
