import { RequestHandler, Request, Response, NextFunction } from "express";

export function asyncWrapper(middleware: RequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
