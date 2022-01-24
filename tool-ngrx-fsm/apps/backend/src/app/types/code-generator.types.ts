export type CodeGeneratorSectionOutput<T> = {
    nodes: T[];
    importItems: ImportItem[];
    constructorItems: ConstructorItem[];
};

export interface ImportItem {
    name: string;
    imports: string[];
}
export interface SingleImportItem {
    name: string;
    from: string;
}

export interface ConstructorItem {
    variableName: string;
    ClassName: string;
}
