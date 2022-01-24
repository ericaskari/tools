import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import { Service } from 'typedi';

import { ServerCorsConfigurationService } from './configs/server-cors.configuration';
import { ServerLoggerConfigurationService } from './configs/server-logger.configuration';
import { ServerParserConfigurationService } from './configs/server-parser.configuration';
import { RouterService } from './routes';
import {ApiErrorHandler} from "./services/error.handler";
import {ApplicationErrors} from "./services/error.service";

// import agenda from './jobs/agenda';
// agenda(); // This is for job scheduling!!!
@Service()
export class AppService {
  private app: Express = express();

  constructor(
    private routerService: RouterService,
    private pars: ServerParserConfigurationService,
    private logg: ServerLoggerConfigurationService,
    private cors: ServerCorsConfigurationService,
    private apiErrorHandler: ApiErrorHandler
  ) {}

  async init(): Promise<Express> {
    await this.initMiddleWares();

    await this.initPublicDirectory();

    await this.initSecurity();

    await this.initRouting();

    await this.initAgenda();

    return this.app;
  }

  private initMiddleWares() {
    this.pars.apply(this.app);

    this.logg.apply(this.app);

    this.cors.apply(this.app);
  }

  private async initPublicDirectory() {
    // set the static files location ./dist will be /img for users
    this.app.use(express.static(path.join(__dirname, '/dist')));
  }

  private async initSecurity() {
    this.app.use(helmet());
  }

  private async initRouting() {
    this.app.use('/api', (req: Request, res: Response, next: NextFunction) => this.routerService.router(req, res, next));

    this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
      next(ApplicationErrors.NotFoundError);
    });

    this.app.use(async (err: unknown, req: Request, res: Response, next: NextFunction) => {
      await this.apiErrorHandler.apiErrorHandler(err, req, res, next);
    });
  }
w
  private async initAgenda() {}
}
