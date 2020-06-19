import request, { Response } from "supertest";
import * as faker from "faker";
import { Server } from "http";

import { DeploymentServer } from "@src/server";
import { Template } from "@modules/templates/templates.model";

describe("Templates API system tests suite", () => {
  let server: Server;

  beforeAll(async () => {
    const deploymentServer = new DeploymentServer();
    await deploymentServer.start();

    server = deploymentServer.server;
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /templates", () => {
    let templateRecords: Template[];
    let response: Response;

    const fakeTemplates = [
      {
        name: faker.random.words(),
        versions: [faker.system.semver(), faker.system.semver()],
      },
      {
        name: faker.random.words(),
        versions: [faker.system.semver(), faker.system.semver()],
      },
    ];

    beforeAll(async () => {
      templateRecords = await Template.create(fakeTemplates);

      response = await request(server).get("/templates").send();
    });

    afterAll(async () => {
      await Template.deleteMany({
        _id: { $in: templateRecords.map((rec) => rec._id) },
      });
    });

    it("should return 200 status code", () => {
      expect(response.status).toEqual(200);
    });

    it("should return expected response body", () => {
      const expectedResponseBody = templateRecords.map((template) => ({
        _id: template._id.toString(),
        name: template.name,
        versions: [...template.versions],
        __v: template.__v,
      }));

      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
