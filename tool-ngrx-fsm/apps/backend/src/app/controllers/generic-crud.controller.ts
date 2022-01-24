import { Response, Request, NextFunction } from 'express';

import { GenericDatabaseModel } from '../models/generic-database.model';

type XXX = { id: string };

export class GenericCrudController<X extends XXX = XXX, Y extends XXX = XXX, Z extends XXX = XXX> {
    constructor(public model: GenericDatabaseModel<X, Y, Z>) {}

    public async create(req: Request, res: Response, next: NextFunction) {
        const newOne = await this.model.create(req.body);
        res.send(newOne);
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const all = await this.model.getAllPopulated();

        res.send({
            count: all.length,
            results: all
        });
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        this.model.updateById(req.params.id, req.body);

        res.send(this.model.findById(req.params.id));
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        this.model.deleteById(req.params.id);

        res.send();
    }
}
