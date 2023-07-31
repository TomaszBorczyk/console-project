import {Directory, SystemEntry} from './structure';

export class SystemNavigator {
    private currentDirectory: Directory;

    constructor(
        private rootDirectory: Directory
    ) {
        this.currentDirectory = rootDirectory;
    }

    public goToRoot(): void {
        this.currentDirectory = this.rootDirectory;
    }

    public goToParent(): void {
        this.currentDirectory = this.currentDirectory.parent;
    }

    public getCurrentDirectory(): Directory {
        return this.currentDirectory;
    }

    public getCurrentPath(): string {
        const pathElements: Array<string> = [];

        let currentDirectory: Directory = this.currentDirectory;

        while (currentDirectory.parent !== currentDirectory) {
            pathElements.unshift(currentDirectory.name);
            currentDirectory = currentDirectory.parent;
        }

        const combinedPath: string = pathElements.join('/');

        return `/${combinedPath}`;
    }

    // fixme: this should not be part of this class
    public enterDirectoryByName(dirname: string): void {
        if (dirname === '..') {
            return this.goToParent();
        }

        const foundEntry: SystemEntry = this.currentDirectory.children
            .find(e => e.name === dirname);

        if (foundEntry) {
            this.enterDirectory(foundEntry);
            return;
        }

        throw Error('Directory not found');
    }

    public enterDirectory(dir: SystemEntry): void {
        if (dir instanceof Directory) {
            this.currentDirectory = dir;
        } else {
            throw Error('Not a directory');
        }
    }
}
