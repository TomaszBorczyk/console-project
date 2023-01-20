import {BaseApp} from './abstractApp';
import {SystemNavigator} from '../systemNavigator';
import {TerminalCommand} from '../../parsers/parseCommand';

export class CD extends BaseApp {
    constructor(private systemNavigator: SystemNavigator) {
        super();
        this._name = 'cd';
    }

    public execute(command: TerminalCommand): string {
        if (command.options?.length > 1) {
            return 'Too many arguments';
        }

        if (!command.options || command.options.length === 0) {
            this.systemNavigator.goToRoot();
        }

        if (command.options?.length === 1) {
            try {
                this.systemNavigator.enterDirectoryByName(command.options[0]);
            } catch (e) {
                return e.message;
            }
        }
    }
}