import { Service } from 'typedi';
import ts, { CallExpression, Expression, factory, JSDoc, ReturnStatement, VariableStatement } from 'typescript';

import { CodeGeneratorSectionOutput, SingleImportItem } from '../types/code-generator.types';

import { CodeGeneratorCommonService } from './code-generator-common.service';

@Service()
export class CodeGeneratorNgrxService {
    constructor(private codeGeneratorCommonService: CodeGeneratorCommonService) {}
    createNgRxActionCallExpression(actionObjName: string, actionName: string, callIdentifier: string): CallExpression {
        // return factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier(actionObjName), factory.createIdentifier(actionName)), undefined, [
        //     factory.createIdentifier(callIdentifier)
        return factory.createCallExpression(
            factory.createPropertyAccessExpression(factory.createIdentifier('SmartStoreActions'), factory.createIdentifier(actionName)),
            undefined,
            [factory.createObjectLiteralExpression([factory.createPropertyAssignment(factory.createIdentifier('actionData'), factory.createIdentifier('errorData'))], false)]
        );
    }

    createNgRxActionCallReturnStatement(actionObjName: string, actionName: string, callIdentifier: string): ReturnStatement {
        return factory.createReturnStatement(this.createNgRxActionCallExpression(actionObjName, actionName, callIdentifier));
    }

    createNgrxCreateEffectArrowFunction(actionsAsArgumentsArray: Expression[], restOfExpressions: Expression[]): CallExpression {
        const effectOfType = factory.createCallExpression(factory.createIdentifier('ofType'), undefined, actionsAsArgumentsArray);

        const effectPipingActionObservable = factory.createReturnStatement(
            factory.createCallExpression(
                factory.createPropertyAccessExpression(
                    factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier('actions$')),
                    factory.createIdentifier('pipe')
                ),
                undefined,
                [effectOfType, ...restOfExpressions]
            )
        );

        const effectArrowFunction = factory.createArrowFunction(
            undefined,
            undefined,
            [],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createBlock([effectPipingActionObservable], true)
        );

        return factory.createCallExpression(factory.createIdentifier('createEffect'), undefined, [effectArrowFunction]);
    }

    createActionVariableStatement(id: string, actionName: string, actionInterfaceImport: SingleImportItem): CodeGeneratorSectionOutput<VariableStatement | JSDoc> {
        const actionIdString = factory.createStringLiteral(id);
        const actionIdVariableName = factory.createIdentifier(`${actionName}Id`);
        const actionPropsVariableName = factory.createIdentifier(`${actionName}Props`);
        const actionNameIdentifier = factory.createIdentifier(actionName);
        const actionInterface = factory.createIdentifier(actionInterfaceImport.name);

        const actionIdVariable = factory.createVariableStatement(
            undefined,
            factory.createVariableDeclarationList([factory.createVariableDeclaration(actionIdVariableName, undefined, undefined, actionIdString)], ts.NodeFlags.Const)
        );

        const actionPropsVariable = factory.createVariableStatement(
            undefined,
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        actionPropsVariableName,
                        undefined,
                        undefined,
                        factory.createCallExpression(
                            factory.createIdentifier('props'),
                            [
                                factory.createTypeLiteralNode([
                                    factory.createPropertySignature(
                                        undefined,
                                        factory.createIdentifier('actionData'),
                                        undefined,
                                        factory.createTypeReferenceNode(actionInterface, undefined)
                                    )
                                ])
                            ],
                            []
                        )
                    )
                ],
                ts.NodeFlags.Const
            )
        );

        const action = factory.createVariableStatement(
            undefined,
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        actionNameIdentifier,
                        undefined,
                        undefined,
                        factory.createCallExpression(factory.createIdentifier('createAction'), undefined, [actionIdVariableName, actionPropsVariableName])
                    )
                ],
                ts.NodeFlags.Const
            )
        );

        return {
            nodes: [actionIdVariable, actionPropsVariable, action, this.codeGeneratorCommonService.createEmptyLinePlaceHolder()],
            importItems: [
                { name: '@ngrx/store', imports: ['createAction', 'props'] },
                { name: actionInterfaceImport.from, imports: [actionInterfaceImport.name] }
            ],
            constructorItems: []
        };
    }
}
