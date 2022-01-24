import { Service } from 'typedi';
import ts, { ClassDeclaration, ClassElement, factory, ParameterDeclaration } from 'typescript';

import { ImportItem } from '../types/code-generator.types';

@Service()
export class CodeGeneratorAngularService {
    generateAngularClass(name: string, members: ClassElement[], constructors: ParameterDeclaration[]): { declaration: ClassDeclaration; importItems: ImportItem[] } {
        const decoratorNameIdentifier = factory.createIdentifier('Injectable');

        const nameIdentifier = factory.createIdentifier(name);

        const angularDecorator = factory.createDecorator(factory.createCallExpression(decoratorNameIdentifier, undefined, []));

        const constructorDeclaration = factory.createConstructorDeclaration(undefined, undefined, constructors, factory.createBlock([], false));

        const declaration = factory.createClassDeclaration([angularDecorator], [factory.createModifier(ts.SyntaxKind.ExportKeyword)], nameIdentifier, undefined, undefined, [
            ...members,
            constructorDeclaration
        ]);

        return {
            declaration,
            importItems: [
                {
                    imports: ['Injectable'],
                    name: '@angular/core'
                }
            ]
        };
    }
}
