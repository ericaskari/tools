import { Response, Request, NextFunction } from 'express';
import { Service } from 'typedi';
import { ClassElement } from 'typescript';

import { ActionUnitInstanceModel } from '../models/action-unit-instance.model';
import { ActionUnitModel } from '../models/action-unit.model';
import { EffectUnitModel } from '../models/effect-unit.model';
import { CodeGeneratorAngularService } from '../services/code-generator-angular.service';
import { CodeGeneratorCommonService } from '../services/code-generator-common.service';
import { CodeGeneratorFileService } from '../services/code-generator-file.service';
import { CodeGeneratorNgrxActionService, NgRxActionBuilder } from '../services/code-generator-ngrx-action.service';
import { CodeGeneratorNgrxEffectService } from '../services/code-generator-ngrx-effect.service';
import { CodeGeneratorNgrxService } from '../services/code-generator-ngrx.service';
import { CodeGeneratorSectionOutput } from '../types/code-generator.types';

@Service()
export class CodeGeneratorController {
    constructor(
        private model: ActionUnitInstanceModel,
        private codeGeneratorNgrxEffectService: CodeGeneratorNgrxEffectService,
        private codeGeneratorAngularService: CodeGeneratorAngularService,
        private codeGeneratorFileService: CodeGeneratorFileService,
        private codeGeneratorCommonService: CodeGeneratorCommonService,
        private codeGeneratorNgrxService: CodeGeneratorNgrxService,
        private codeGeneratorNgrxActionService: CodeGeneratorNgrxActionService,
        private actionsModel: ActionUnitModel,
        private effectUnitModel: EffectUnitModel
    ) {}

    public async create(req: Request, res: Response, next: NextFunction) {
        const all = this.effectUnitModel.getAll();

        const allDeep = all.map((x) => this.effectUnitModel.findByIdDeepPopulated(x.id));

        const effects = allDeep.map((effect) => {
            const inputActionName = effect?.inputAction?.actionUnit?.name || '';
            const successActionName = effect?.successAction?.actionUnit?.name || '';
            const failActionName = effect?.failAction?.actionUnit?.name || '';
            const failActionInterface = effect?.failAction?.actionUnit?.inputInterface?.name || '';
            const failActionInterfacePath = '';

            return this.codeGeneratorNgrxEffectService.createNgrxApiCallEffectWithCatchError({
                inputActionName,
                successActionName,
                failActionName,
                endpointDataType: { name: 'SomeType', from: './types' },
                errorDataType: { name: failActionInterface, from: failActionInterfacePath },
                endpointMethodName: 'getAll',
                effectName: effect?.name || ''
            });
        });

        const mixed = effects.reduce(
            (previousValue, currentValue) => {
                return {
                    nodes: [...previousValue.nodes, ...currentValue.nodes],
                    importItems: [...previousValue.importItems, ...currentValue.importItems],
                    constructorItems: [...previousValue.constructorItems, ...currentValue.constructorItems]
                };
            },
            { nodes: [], constructorItems: [], importItems: [] } as CodeGeneratorSectionOutput<ClassElement>
        );

        const classConstructorSection = this.codeGeneratorCommonService.filterRepeatedConstructors([...mixed.constructorItems]);

        const angularClass = this.codeGeneratorAngularService.generateAngularClass('CrudEffect', [...mixed.nodes], classConstructorSection);

        const imports = this.codeGeneratorCommonService.filterRepeatedImports([...mixed.importItems, ...angularClass.importItems]);

        await this.codeGeneratorFileService.createTypescriptFile([...imports, angularClass.declaration]);

        console.log('Creating Actions...');

        await this.createActions();

        res.status(200).send();
    }

    private async createActions() {
        const dbActions = await this.actionsModel.getAllPopulated();

        const d: NgRxActionBuilder[] = dbActions
            .filter((x) => !!x.inputInterface)
            .map(
                (x): NgRxActionBuilder => {
                    if (!x.inputInterface) {
                        throw 'NULL_EXCEPTION';
                    }

                    const from = '';
                    const name = x.inputInterface.name ?? '';
                    return { id: x.name, actionName: x.name, actionInterfaceImport: { name, from } };
                }
            );

        console.log('createNgrxAction...');

        const actions = this.codeGeneratorNgrxActionService.createNgrxAction(d);

        console.log('filterRepeatedImports...');

        const actionImports = this.codeGeneratorCommonService.filterRepeatedImports([...actions.importItems]);

        console.log('createTypescriptFile...');

        await this.codeGeneratorFileService.createTypescriptFile(
            [...actionImports, this.codeGeneratorCommonService.createEmptyLinePlaceHolder(), ...actions.nodes],
            './apps/frontend/src/app/store/auto-generated-store/smart-store.action.ts'
        );
    }
}
