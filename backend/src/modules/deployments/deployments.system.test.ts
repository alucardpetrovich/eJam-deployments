import context from "jest-plugin-context";
import request, { Response } from "supertest";
import * as faker from "faker";
import { Server } from "http";
import { Types } from "mongoose";

import { DeploymentServer } from "@src/server";
import { Deployment } from "@modules/deployments/deployments.model";
import { CreateDeploymentType } from "@modules/deployments/schemas/create-deployment.schema";

describe("Deployments API system tests suite", () => {
  let server: Server;

  beforeAll(async () => {
    const deploymentServer = new DeploymentServer();
    await deploymentServer.start();

    server = deploymentServer.server;
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /deployments", () => {
    let deploymentRecords: Deployment[];
    let response: Response;

    const fakeDeployments: CreateDeploymentType[] = [
      {
        url: faker.internet.url(),
        templateName: faker.random.words(),
        version: faker.system.semver(),
      },
      {
        url: faker.internet.url(),
        templateName: faker.random.words(),
        version: faker.system.semver(),
      },
    ];

    beforeAll(async () => {
      deploymentRecords = await Deployment.create(fakeDeployments);

      response = await request(server).get("/deployments").send();
    });

    afterAll(async () => {
      await Deployment.deleteMany({
        _id: { $in: deploymentRecords.map((rec) => rec._id) },
      });
    });

    it("should return 200 status code", () => {
      expect(response.status).toEqual(200);
    });

    it("should return expected response body", () => {
      const expectedResponseBody = deploymentRecords.map((deployment) => ({
        ...deployment.toObject(),
        _id: deployment._id.toString(),
      }));

      expect(new Set(response.body)).toEqual(new Set(expectedResponseBody));
    });
  });

  describe("POST /deployments", () => {
    context("when request params are not valid", () => {
      let response: Response;

      beforeAll(async () => {
        response = await request(server).post("/deployments").send({});
      });

      it("should throw 400 error", () => {
        expect(response.status).toEqual(400);
      });
    });

    context("when request body is valid", () => {
      let createdDeploymentRecord: Deployment;
      let response: Response;

      const createDeploymentParams: CreateDeploymentType = {
        url: faker.internet.url(),
        templateName: faker.random.uuid(),
        version: faker.system.semver(),
      };

      beforeAll(async () => {
        response = await request(server)
          .post("/deployments")
          .send(createDeploymentParams);

        createdDeploymentRecord = await Deployment.findOne({
          templateName: createDeploymentParams.templateName,
        });
      });

      afterAll(async () => {
        await Deployment.findByIdAndDelete(createdDeploymentRecord._id);
      });

      it("should return 200 status code", () => {
        expect(response.status).toEqual(201);
      });

      it("should save deployment record", () => {
        expect(createdDeploymentRecord).toBeTruthy();
        expect(createdDeploymentRecord).toMatchObject(createDeploymentParams);
      });

      it("should return expected response body", () => {
        const expectedResponseBody = {
          ...createdDeploymentRecord.toObject(),
          _id: createdDeploymentRecord._id.toString(),
        };

        expect(response.body).toEqual(expectedResponseBody);
      });
    });
  });

  describe("DELETE /deployments/:id", () => {
    context("when received invalid ObjectId", () => {
      let response: Response;

      beforeAll(async () => {
        response = await request(server)
          .delete(`/deployments/${faker.random.word()}`)
          .send();
      });

      it("should throw 400 error", () => {
        expect(response.status).toEqual(400);
      });
    });

    context("when record with provided id does not exist", () => {
      let response: Response;

      beforeAll(async () => {
        response = await request(server)
          .delete(`/deployments/${new Types.ObjectId()}`)
          .send();
      });

      it("should throw 404 error", () => {
        expect(response.status).toEqual(404);
      });
    });

    context("when record with provided id exists", () => {
      let response: Response;
      let deploymentRecord: Deployment;

      beforeAll(async () => {
        deploymentRecord = await Deployment.create({
          url: faker.internet.url(),
          templateName: faker.random.words(),
          version: faker.system.semver(),
        });

        response = await request(server)
          .delete(`/deployments/${deploymentRecord._id}`)
          .send();
      });

      it("should return 204 status code", () => {
        expect(response.status).toEqual(204);
      });

      it("should remove deployment record from DB", async () => {
        const removedRecord = await Deployment.findById(deploymentRecord._id);
        expect(removedRecord).toBeFalsy();
      });
    });
  });
});
