import { NextFunction, Request, Response, Router } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { Service } from 'typedi';

import { CodeGeneratorController } from '../controllers/code-generator.controller';

/****************************************
 *    Activities  /api/codeGenerator/
 ****************************************/
@Service()
export class CodeGeneratorRoutes {
    router: Router = Router();

    constructor(private controller: CodeGeneratorController) {
        this.router.post('', this.protect(this.controller.create));

        // this.router.get('', this.protect(this.controller.getAll));
        //
        // this.router.get('/:activityId', this.protect(this.activitiesRoutes.getActivity));
        //
        // this.router.patch('/:id', this.protect(this.controller.updateById));
        //
        // this.router.delete('/:activityId', this.protect(this.activitiesRoutes.removeActivity));
    }

    protect(handlers: RequestHandler): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handlers.bind(this.controller)(req, res, next);
            } catch (e) {
                next(e);
            }
        };
    }
}
