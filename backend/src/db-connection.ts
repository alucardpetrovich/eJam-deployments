import mongoose from "mongoose";
import { config } from "@src/config";

export async function createDbConnection() {
  mongoose.set("useCreateIndex", true);
  return mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
}
