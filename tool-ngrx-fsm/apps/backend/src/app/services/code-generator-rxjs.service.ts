import ts, { CallExpression, Expression, factory, ParameterDeclaration, Statement } from 'typescript';
import { Service } from 'typedi';

@Service()
export class CodeGeneratorRxjsService {
    createMergeMapCallExpression(body: Statement[]) {
        const param: ParameterDeclaration = factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createObjectBindingPattern([factory.createBindingElement(undefined, undefined, factory.createIdentifier('actionData'), undefined)]),
            undefined,
            undefined,
            undefined
        );

        return factory.createCallExpression(factory.createIdentifier('mergeMap'), undefined, [
            factory.createArrowFunction(undefined, undefined, [param], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock(body, true))
        ]);
    }

    createMapOperatorCallExpressionWithArrowFunction(parameters: { name: string; typeName: string }[], statements: Statement[]): CallExpression {
        const params: ParameterDeclaration[] = parameters.map((x) =>
            factory.createParameterDeclaration(
                undefined,
                undefined,
                undefined,
                factory.createIdentifier(x.name),
                undefined,
                factory.createTypeReferenceNode(factory.createIdentifier(x.typeName), undefined),
                undefined
            )
        );

        return factory.createCallExpression(factory.createIdentifier('map'), undefined, [
            factory.createArrowFunction(undefined, undefined, params, undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock(statements, true))
        ]);
    }

    createCatchErrorOperatorCallExpressionWithArrowFunction(parameters: { name: string; typeName: string }[], statements: Statement[]) {
        const params: ParameterDeclaration[] = parameters.map((x) =>
            factory.createParameterDeclaration(
                undefined,
                undefined,
                undefined,
                factory.createIdentifier(x.name),
                undefined,
                factory.createTypeReferenceNode(factory.createIdentifier(x.typeName), undefined),
                undefined
            )
        );

        return factory.createCallExpression(factory.createIdentifier('catchError'), undefined, [
            factory.createArrowFunction(undefined, undefined, params, undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock(statements, true))
        ]);
    }

    createOfOperatorReturnStatement(argumentsArray: Expression[]) {
        return factory.createCallExpression(factory.createIdentifier('of'), undefined, argumentsArray);
    }
}
