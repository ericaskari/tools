import { Service } from 'typedi';
import ts, { Expression, factory, ImportDeclaration, ImportSpecifier, ParameterDeclaration, PropertyDeclaration } from 'typescript';

import { ConstructorItem, ImportItem } from '../types/code-generator.types';

@Service()
export class CodeGeneratorCommonService {
    createImport(from: string, elements: string[]): ImportDeclaration {
        const els: ImportSpecifier[] = elements.map((x) => factory.createImportSpecifier(undefined, factory.createIdentifier(x)));

        return factory.createImportDeclaration(
            undefined,
            undefined,
            factory.createImportClause(false, undefined, factory.createNamedImports(els)),
            factory.createStringLiteral(from)
        );
    }

    createClassProperty(name: string, initializer: Expression): PropertyDeclaration {
        const nameIdentifier = factory.createIdentifier(name);

        return factory.createPropertyDeclaration(undefined, undefined, nameIdentifier, undefined, undefined, initializer);
    }

    createEmptyLinePlaceHolder(): ts.JSDoc {
        return factory.createJSDocComment('EMPTY_LINE');
    }

    convertEmptyLinePlaceHolderToEmptyLines(result: string): string {
        if (!result) {
            throw 'NOT_STRING';
        }
        return result.replace(/\/\*\*\n \* EMPTY_LINE \*\//g, '\n\n');
    }

    filterRepeatedImports(imports: ImportItem[]): (ts.ImportDeclaration | ts.JSDoc)[] {
        const filtered = imports.reduce((prev: ImportItem[], curr: ImportItem): ImportItem[] => {
            const indexInList = prev.findIndex((x) => x.name === curr.name);

            if (indexInList === -1) {
                return [...prev, curr];
            }

            prev[indexInList].imports = Array.from(new Set([...prev[indexInList].imports, ...curr.imports]));

            return prev;
        }, []);

        return [...filtered.map((x) => this.createImport(x.name, x.imports)), this.createEmptyLinePlaceHolder()];
    }

    filterRepeatedConstructors(imports: ConstructorItem[]): ParameterDeclaration[] {
        const filtered = imports.reduce((prev: ConstructorItem[], curr: ConstructorItem): ConstructorItem[] => {
            const indexInList = prev.findIndex((x) => x.ClassName === curr.ClassName && x.variableName === curr.variableName);

            if (indexInList === -1) {
                return [...prev, curr];
            }

            return prev;
        }, []);

        return filtered.map((x) =>
            factory.createParameterDeclaration(
                undefined,
                [factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
                undefined,
                factory.createIdentifier(x.variableName),
                undefined,
                factory.createTypeReferenceNode(factory.createIdentifier(x.ClassName), undefined),
                undefined
            )
        );
    }
}
