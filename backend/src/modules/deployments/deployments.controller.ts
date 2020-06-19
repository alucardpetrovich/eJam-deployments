import { Request, Response, Router } from "express";

import {
  validate,
  HttpRequestProps,
} from "@shared/middlewares/validation.middleware";
import { asyncWrapper } from "@src/shared/async-wrapper";

import { deploymentsService } from "@modules/deployments/deployments.service";
import { createDeploymentSchema } from "@modules/deployments/schemas/create-deployment.schema";
import { deleteDeploymentSchema } from "@modules/deployments/schemas/delete-deployment.schema";

const router = Router();

router.get("/", asyncWrapper(getDeployments));

router.post(
  "/",
  validate(createDeploymentSchema, HttpRequestProps.BODY),
  asyncWrapper(createDeployment)
);

router.delete(
  "/:id",
  validate(deleteDeploymentSchema, HttpRequestProps.PARAMS),
  asyncWrapper(deleteDeployment)
);

async function getDeployments(req: Request, res: Response) {
  const deployments = await deploymentsService.getAll();
  return res.status(200).json(deployments);
}

async function createDeployment(req: Request, res: Response) {
  const newDeployment = await deploymentsService.create(req.body);
  return res.status(201).json(newDeployment);
}

async function deleteDeployment(req: Request, res: Response) {
  await deploymentsService.deleteOne(req.params.id);
  return res.status(204).send();
}

export const deploymentsRouter = router;
