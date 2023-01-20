import {BaseApp} from './abstractApp';
import {SystemNavigator} from '../systemNavigator';
import {Directory} from '../structure';
import {TerminalCommand} from '../../parsers/parseCommand';

export class LS extends BaseApp {
    constructor(private systemNavigator: SystemNavigator) {
        super();
        this._name = 'ls';
        this._description = 'Display directory contents';
    }

    public execute(command: TerminalCommand): string {
        const currentDir: Directory = this.systemNavigator.getCurrentDirectory();
        const contents: string = currentDir.children.map(e => e.name).join(' ');
        return contents;
    }
}
