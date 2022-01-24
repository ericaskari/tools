import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { ApplicationErrors, BadResult } from './error.service';

interface ErrorHandlerMiddleWare {
  apiErrorHandler: (err: unknown, req: Request, res: Response, next: NextFunction) => Promise<void>;
}

@Service()
export class ApiErrorHandler implements ErrorHandlerMiddleWare {
  async apiErrorHandler(badResult: BadResult | unknown, req: Request, res: Response, next: NextFunction): Promise<void> {
    if (badResult instanceof BadResult) {
      console.error('----------------');
      console.error('HANDLED ERROR:');
      console.error(badResult);
      console.error('----------------');

      res.status(badResult.error.code).send({
        code: badResult.error.code,
        message: badResult.error.message,
        description: badResult.error.description
      });

      return;
    }
    console.error('----------------');
    console.error('UNHANDLED ERROR:');
    console.error(badResult);
    console.error('----------------');

    const serverError = ApplicationErrors.ServerError;

    res.status(serverError.error.code).send(serverError.error);
  }
}
