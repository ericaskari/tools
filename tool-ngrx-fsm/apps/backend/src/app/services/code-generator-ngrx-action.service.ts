import { Service } from 'typedi';
import ts, { factory, JSDoc, VariableStatement } from 'typescript';

import { CodeGeneratorSectionOutput, ImportItem, SingleImportItem } from '../types/code-generator.types';

import { CodeGeneratorNgrxService } from './code-generator-ngrx.service';

export interface NgRxActionBuilder {
    id: string;
    actionName: string;
    actionInterfaceImport: SingleImportItem;
}

@Service()
export class CodeGeneratorNgrxActionService {
    constructor(private codeGeneratorNgrxService: CodeGeneratorNgrxService) {}

    createNgrxAction(actions: NgRxActionBuilder[]): CodeGeneratorSectionOutput<VariableStatement | JSDoc> {
        const actionVariableStatements: CodeGeneratorSectionOutput<VariableStatement | JSDoc>[] = actions.map((x) =>
            this.codeGeneratorNgrxService.createActionVariableStatement(x.id, x.actionName, x.actionInterfaceImport)
        );

        const shorthandProperties = actions.map((x) => factory.createShorthandPropertyAssignment(factory.createIdentifier(x.actionName), undefined));

        const exportObject = factory.createVariableStatement(
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        factory.createIdentifier('SmartStoreActions'),
                        undefined,
                        undefined,
                        factory.createObjectLiteralExpression(shorthandProperties, true)
                    )
                ],
                ts.NodeFlags.Const
            )
        );

        const actionVariableStatementNodes: (VariableStatement | JSDoc)[] = actionVariableStatements
            .map((x) => x.nodes)
            .reduce((acc: (VariableStatement | JSDoc)[], val: (VariableStatement | JSDoc)[]) => acc.concat(val), []);

        const actionVariableStatementImports: ImportItem[] = actionVariableStatements
            .map((x) => x.importItems)
            .reduce((acc: ImportItem[], val: ImportItem[]) => acc.concat(val), []);

        return {
            nodes: [...actionVariableStatementNodes, exportObject],
            importItems: [...actionVariableStatementImports],
            constructorItems: []
        };
    }
}
