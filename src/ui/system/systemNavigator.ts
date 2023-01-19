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

        if (foundEntry && foundEntry instanceof Directory) {
            this.enterDirectory(foundEntry);
            return;
        } else if (foundEntry) {
            throw Error('Not a directory');
        }

        throw Error('Directory not found');
    }

    public enterDirectory(dir: SystemEntry): void {
        if (dir instanceof Directory) {
            this.currentDirectory = dir;
            return;
        }

        console.error(`${dir.name} is not a directory`);
    }
}
