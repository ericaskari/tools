import { writeFileSync } from 'fs';
import { conduct } from 'import-conductor/conductor/conduct';
import { format, resolveConfig } from 'prettier';
import { Service } from 'typedi';
import ts, { factory, ListFormat, Node } from 'typescript';

import { CodeGeneratorCommonService } from './code-generator-common.service';

@Service()
export class CodeGeneratorFileService {
    constructor(private codeGeneratorCommonService: CodeGeneratorCommonService) {}

    async createTypescriptFile(
        nodes: Node[],
        fileDir: string = './apps/frontend/src/app/store/auto-generated-store/smart-store.effect.ts',
        prettierConfDir: string = './.prettierrc'
    ) {
        const resultFile = ts.createSourceFile('someFileName.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
            removeComments: false
        });

        const nodeArray = factory.createNodeArray(nodes, true);

        let result = printer.printList(ListFormat.None, nodeArray, resultFile);

        const prettierConf = await resolveConfig(prettierConfDir);

        result = result.replace('constructor(', '\nconstructor(');

        result = this.codeGeneratorCommonService.convertEmptyLinePlaceHolderToEmptyLines(result);

        result = format(result, { ...prettierConf, filepath: fileDir });

        result = result.replace(/;\n}>\(\);/g, ' }>();');
        result = result.replace(/props<\{\n {4}/g, 'props<{ ');

        console.log('✔ Applying Prettier  - done!');

        writeFileSync(fileDir, result);

        await conduct({ source: [fileDir] });
    }
}
