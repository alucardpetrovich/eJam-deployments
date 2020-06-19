import { Router, Request, Response } from "express";

import { asyncWrapper } from "@src/shared/async-wrapper";
import { Template } from "@modules/templates/templates.model";

const router = Router();

router.get("/", asyncWrapper(getTemplates));

async function getTemplates(req: Request, res: Response) {
  const templates = await Template.find();
  return res.status(200).json(templates);
}

export const templatesRouter = router;
