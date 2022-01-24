import { Service } from 'typedi';
import { ClassElement, factory } from 'typescript';

import { CodeGeneratorSectionOutput, ConstructorItem, ImportItem, SingleImportItem } from '../types/code-generator.types';

import { CodeGeneratorCommonService } from './code-generator-common.service';
import { CodeGeneratorNgrxService } from './code-generator-ngrx.service';
import { CodeGeneratorRxjsService } from './code-generator-rxjs.service';

export interface NgRxApiCallEffect {
    effectName: string;
    inputActionName: string;
    successActionName: string;
    failActionName: string;
    endpointMethodName: string;
    endpointDataType: SingleImportItem;
    errorDataType: SingleImportItem;
}

@Service()
export class CodeGeneratorNgrxEffectService {
    constructor(
        private codeGeneratorNgrxService: CodeGeneratorNgrxService,
        private codeGeneratorRxjsService: CodeGeneratorRxjsService,
        private codeGeneratorCommonService: CodeGeneratorCommonService
    ) {}

    createNgrxApiCallEffectWithCatchError(input: NgRxApiCallEffect): CodeGeneratorSectionOutput<ClassElement> {
        const endpointMethodIdentifier = factory.createIdentifier(input.endpointMethodName);
        const successActionIdentifier = factory.createIdentifier(input.successActionName);

        const endpointServiceObservable = factory.createCallExpression(
            factory.createPropertyAccessExpression(
                factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier('smartStoreEndpoint')),
                endpointMethodIdentifier
            ),
            undefined,
            [factory.createIdentifier('actionData')]
        );

        const pipeSection = factory.createCallExpression(factory.createPropertyAccessExpression(endpointServiceObservable, factory.createIdentifier('pipe')), undefined, [
            this.codeGeneratorRxjsService.createMapOperatorCallExpressionWithArrowFunction(
                [{ name: 'endpointData', typeName: input.endpointDataType.name }],
                [this.codeGeneratorNgrxService.createNgRxActionCallReturnStatement('SmartStoreActions', input.successActionName, 'endpointData')]
            ),
            this.codeGeneratorRxjsService.createCatchErrorOperatorCallExpressionWithArrowFunction(
                [{ name: 'errorData', typeName: input.errorDataType.name }],
                [
                    factory.createReturnStatement(
                        this.codeGeneratorRxjsService.createOfOperatorReturnStatement([
                            this.codeGeneratorNgrxService.createNgRxActionCallExpression('SmartStoreActions', input.failActionName, 'errorData')
                        ])
                    )
                ]
            )
        ]);

        const effectFirstMergeMapContent = factory.createReturnStatement(pipeSection);

        const mergeMap = this.codeGeneratorRxjsService.createMergeMapCallExpression([effectFirstMergeMapContent]);

        const ngrxEffect = this.codeGeneratorNgrxService.createNgrxCreateEffectArrowFunction(
            [factory.createPropertyAccessExpression(factory.createIdentifier('SmartStoreActions'), factory.createIdentifier(input.inputActionName))],
            [mergeMap]
        );

        const node = this.codeGeneratorCommonService.createClassProperty(input.effectName, ngrxEffect);

        const importItems: ImportItem[] = [
            { name: '@ngrx/effects', imports: ['Actions', 'createEffect', 'ofType'] },
            { name: '@ngrx/store', imports: ['Store'] },
            { name: './smart-store.endpoint', imports: ['SmartStoreEndpoint'] },
            { name: './smart-store.action', imports: ['SmartStoreActions'] },
            { name: 'rxjs', imports: ['of'] },
            { name: 'rxjs/operators', imports: ['mergeMap', 'catchError', 'map'] },
            { name: input.endpointDataType.from, imports: [input.endpointDataType.name] },
            { name: input.errorDataType.from, imports: [input.errorDataType.name] }
        ];

        const constructorItems: ConstructorItem[] = [
            {
                ClassName: 'Store',
                variableName: 'store'
            },
            {
                variableName: 'actions$',
                ClassName: 'Actions'
            },
            {
                variableName: 'smartStoreEndpoint',
                ClassName: 'SmartStoreEndpoint'
            }
        ];
        return {
            nodes: [node],
            importItems,
            constructorItems
        };
    }
}
