import { HttpError } from "@shared/errors/http-error";

export class NotFound extends HttpError {
  constructor(message: string) {
    super("NotFound", 404, message);
  }
}
