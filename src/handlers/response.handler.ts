import { NextFunction, Request, Response } from "express";

export class responseHandler {
  statusCode: number;
  result: any;
  message?: string;
  constructor(statusCode: number, result: any, message?: string) {
    this.statusCode = statusCode;
    (this.result = result), (this.message = message);
  }
}

export const handleResponse = (info: responseHandler, req: Request, res: Response, next: NextFunction) => {
  if (info instanceof Error) {
    next(info);
  }
  if (info instanceof responseHandler) {
    const { statusCode, result, message } = info;
    res.status(statusCode).json({
      status: "Success",
      statusCode,
      result,
      message,
    });
  } else {
    res.json(info);
  }
};
