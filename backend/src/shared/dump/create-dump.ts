import { createDbConnection } from "@src/db-connection";
import { templatesDump } from "@src/shared/dump/templates-dump";
import { Template } from "@src/modules/templates/templates.model";

async function createDump() {
  await createDbConnection();

  await Template.create(templatesDump);

  process.exit(0);
}

createDump();
