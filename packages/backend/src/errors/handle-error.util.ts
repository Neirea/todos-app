/* eslint-disable no-console */
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { getQueryError } from './get-query-error.util';
import { CustomError } from './custom-error.util';

export default (error: unknown, res: Response) => {
  console.error(error);

  let errorMessage = 'Internal server error';
  let status = 500;
  if (error instanceof QueryFailedError) {
    status = 400;
    errorMessage = getQueryError(error.driverError.code);
  }
  if (error instanceof CustomError) {
    status = error.statusCode;
    errorMessage = error.message;
  }
  res.status(status).json({ message: errorMessage });
};
