import { HttpError } from "@shared/errors/http-error";

export class BadRequest extends HttpError {
  constructor(message: object | string) {
    const messageStr = typeof message === 'object' ? JSON.stringify(message) : message;

    super("BadRequest", 400, messageStr);
  }
}
