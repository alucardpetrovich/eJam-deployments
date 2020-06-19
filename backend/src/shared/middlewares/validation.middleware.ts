import { Request, Response, NextFunction } from "express";
import { AnySchema } from "@hapi/joi";

import { BadRequest } from "@shared/errors";

export enum HttpRequestProps {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

export function validate(schema: AnySchema, requestProp: HttpRequestProps) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[requestProp]);

    if (error) {
      const badRequest = new BadRequest(error);
      return next(badRequest);
    }

    next();
  };
}
