import { NextFunction, Request, Response, Router } from 'express';
import { RequestHandler } from 'express-serve-static-core';

import { GenericCrudController } from '../controllers/generic-crud.controller';

type XXX = { id: string };

export class GenericCrudRoutes<X extends XXX = XXX, Y extends XXX = XXX, Z extends XXX = XXX> {
    router: Router = Router();

    constructor(public controller: GenericCrudController<X, Y, Z>) {
        this.router.post('', this.protect(this.controller.create));

        this.router.get('', this.protect(this.controller.getAll));

        // this.router.get('/:id', this.protect(this.controller.getActivity));

        this.router.patch('/:id', this.protect(this.controller.updateById));

        this.router.delete('/:id', this.protect(this.controller.deleteById));
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
