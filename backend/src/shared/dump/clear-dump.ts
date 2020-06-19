import mongoose from "mongoose";
import { createDbConnection } from "@src/db-connection";

async function clearDump() {
  await createDbConnection();
  await mongoose.connection.dropDatabase();

  process.exit(0);
}

clearDump();
