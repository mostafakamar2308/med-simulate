import { IError } from "@med-simulate/types";

export class ResponseError extends Error {
  statusCode: number;
  errorCode: IError.ApiError;

  constructor({
    errorCode,
    statusCode,
    message,
  }: {
    errorCode: IError.ApiError;
    statusCode: number;
    message?: string;
  }) {
    super(message || errorCode);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

const error = (
  errorCode: IError.ApiError,
  statusCode: number,
  message?: string
) =>
  new ResponseError({
    errorCode,
    statusCode,
    message,
  });

export const unauthenticated = () =>
  error(IError.ApiError.Unauthenticated, 401);

export const bad = () => error(IError.ApiError.BadRequest, 400);
