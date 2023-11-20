import { NextFunction, Request, Response } from "express";

export class errorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: errorHandler, _req: Request, res: Response, _next: NextFunction) => {
  let { statusCode = 500, message } = err;

  if (!(err instanceof errorHandler)) {
    message = "An error in the server has occurred";
  }

  res.status(statusCode).json({
    status: "Error",
    statusCode,
    message,
  });
};
