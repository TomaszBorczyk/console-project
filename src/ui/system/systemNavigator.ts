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

    // fixme: this should not be part of this class
    public enterDirectoryByName(dirname: string): void {
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
