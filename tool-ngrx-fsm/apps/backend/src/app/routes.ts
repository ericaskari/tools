import { Router, Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { ActionUnitInstanceRoutes } from './routes/action-unit-instance.routes';
import { ActionUnitRoutes } from './routes/action-unit.routes';
import { CodeGeneratorRoutes } from './routes/code-generator.routes';
import { EffectUnitRoutes } from './routes/effect-unit.routes';
import { InterfaceConverterUnitRoutes } from './routes/interface-converter-unit.routes';
import { InterfaceRoutes } from './routes/interface.routes';
import { TriggerSectorRoutes } from './routes/trigger-sector.routes';

@Service()
export class RouterService {
    router: Router = Router();

    constructor(
        private actionUnitRoutes: ActionUnitRoutes,
        private effectSectorRoutes: EffectUnitRoutes,
        private interfaceRoutes: InterfaceRoutes,
        private triggerSectorRoutes: TriggerSectorRoutes,
        private actionUnitInstanceRoutes: ActionUnitInstanceRoutes,
        private codeGeneratorRoutes: CodeGeneratorRoutes,
        private interfaceConverterUnitRoutes: InterfaceConverterUnitRoutes
    ) {
        this.initPublicRoutes();

        this.router.post('/', (req, res, next) => {
            res.status(200).send();
        });

        // this.router.use('*', this.passport.getJwtAuthenticatorMiddleWare, (req, res, next) => {
        //   next();
        // });

        // this.initPrivateRoutes();
    }

    private initPublicRoutes = (): void => {
        this.router.use('/actions', (req: Request, res: Response, next: NextFunction) => this.actionUnitRoutes.router(req, res, next));
        this.router.use('/effects', (req: Request, res: Response, next: NextFunction) => this.effectSectorRoutes.router(req, res, next));
        this.router.use('/interfaces', (req: Request, res: Response, next: NextFunction) => this.interfaceRoutes.router(req, res, next));
        this.router.use('/triggers', (req: Request, res: Response, next: NextFunction) => this.triggerSectorRoutes.router(req, res, next));
        this.router.use('/actionUnitInstances', (req: Request, res: Response, next: NextFunction) => this.actionUnitInstanceRoutes.router(req, res, next));
        this.router.use('/codeGenerator', (req: Request, res: Response, next: NextFunction) => this.codeGeneratorRoutes.router(req, res, next));
        this.router.use('/interfaceConverters', (req: Request, res: Response, next: NextFunction) => this.interfaceConverterUnitRoutes.router(req, res, next));
    };

    // private initPrivateRoutes = (): void => {};
}
