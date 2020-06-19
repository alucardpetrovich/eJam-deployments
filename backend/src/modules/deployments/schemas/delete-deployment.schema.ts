import Joi from "@hapi/joi";
import { isValidObjectId } from "mongoose";

export const deleteDeploymentSchema = Joi.object({
  id: Joi.custom(isObjectId),
});

function isObjectId(value: any, helpers: Joi.CustomHelpers) {
  if (!isValidObjectId(value)) {
    return helpers.error(`${value} is not valid ObjectId`);
  }

  return value;
}
