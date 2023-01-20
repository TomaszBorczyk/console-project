type SimpleSystemEntry = SimpleFile | SimpleDirectory;


export interface SimpleFile {
    extension: string;
    name: string;
    contents: string;
}

function isSimpleFile(object: any): object is SimpleFile {
    return 'extension' in object;
}


export interface SimpleDirectory {
    name: string;
    children: Array<SimpleSystemEntry>;
}

function isSimpleDirectory(object: any): object is SimpleDirectory {
    return 'children' in object;
}


interface BaseSystemEntry {
    name: string;
}

export class File implements BaseSystemEntry {
    constructor(
        private _name: string,
        private extension: string,
        private _contents: string,
    ) {
    }

    public get name(): string {
        return this._name;
    }

    public get contents(): string {
        return this._contents;
    }
}

export class Directory {
    constructor(
        private _name: string,
        private _parent: Directory,
        private _children: Array<SystemEntry>
    ) {
    }

    public get name(): string {
        return this._name;
    }

    public set parent(parent: Directory) {
        this._parent = parent;
    }

    public get parent(): Directory {
        return this._parent;
    }

    public set children(children: Array<SystemEntry>) {
        this._children = children;
    }

    public get children(): Array<SystemEntry> {
        return this._children;
    }
}

export type SystemEntry = Directory | File;


function processDirectory(currentDir: Directory, children: Array<SimpleSystemEntry>): Array<SystemEntry> {
    return children.map(entry => {
        if (isSimpleDirectory(entry)) {
            const dir: Directory = new Directory(entry.name, currentDir, []);
            dir.children = processDirectory(currentDir, entry.children);
            return dir;
        }
        if (isSimpleFile(entry)) {
            return new File(
                entry.name,
                entry.extension,
                entry.contents
            );
        }
    });
}

export function populateRootDirectory(rootDirectory: SimpleDirectory): Directory {
    const dir: Directory = new Directory(
        rootDirectory.name,
        null,
        []
    );
    dir.parent = dir;
    dir.children = processDirectory(dir, rootDirectory.children);

    return dir;
}
