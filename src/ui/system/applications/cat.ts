import {BaseApp} from './abstractApp';
import {SystemNavigator} from '../systemNavigator';
import {TerminalCommand} from '../../parsers/parseCommand';
import {Directory, SystemEntry} from '../structure';

export class Cat extends BaseApp {
    constructor(private systemNavigator: SystemNavigator) {
        super();
        this._name = 'cat';
        this._description = 'Display contents of a file';
    }

    public execute(command: TerminalCommand): string {
        if (command.options?.length > 1) {
            return 'Too many arguments';
        }

        if (!command.options || command.options.length === 0) {
            return 'No file specified';
        }

        if (command.options?.length === 1) {
            const targetFilename: string = command.options[0];
            const currentContents: Array<SystemEntry> = this.systemNavigator.getCurrentDirectory().children;
            const file: SystemEntry = currentContents.find(e => e.name === targetFilename);

            if (!file) {
                return this.getErrorMessage(`${targetFilename}: No such file or directory`);
            }

            if (file instanceof Directory) {
                return this.getErrorMessage(`${targetFilename}: Is a directory`);
            }

            return file.contents;
        }
    }
}
