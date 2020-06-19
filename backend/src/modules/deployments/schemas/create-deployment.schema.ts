import Joi from "@hapi/joi";

export interface CreateDeploymentType {
  url: string;
  templateName: string;
  version: string;
}

export const createDeploymentSchema = Joi.object({
  url: Joi.string().required(),

  templateName: Joi.string().required(),

  version: Joi.string().required(),
});
