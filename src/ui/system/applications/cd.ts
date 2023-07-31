import {BaseApp} from './abstractApp';
import {SystemNavigator} from '../systemNavigator';
import {TerminalCommand} from '../../parsers/parseCommand';

export class CD extends BaseApp {
    constructor(private systemNavigator: SystemNavigator) {
        super();
        this._name = 'cd';
        this._description = 'Change directory';
    }

    public execute(command: TerminalCommand): string {
        if (command.options?.length > 1) {
            return this.getErrorMessage('Too many arguments');
        }

        if (!command.options || command.options.length === 0) {
            this.systemNavigator.goToRoot();
        }

        if (command.options?.length === 1) {
            const location: string = command.options[0];

            try {
                if (this.isPath(location)) {
                    this.navigateToLocation(this.parseLocation(location));
                } else {
                    this.systemNavigator.enterDirectoryByName(location);
                }
            } catch (e) {
                return this.getErrorMessage(e.message);
            }
        }
    }

    private isPath(location: string): boolean {
        return location.includes('/');
    }

    private parseLocation(location: string): Array<string> {
        return location.split('/');
    }

    private navigateToLocation(path: Array<string>): void {
        while (path.length > 0) {
            const target: string = path.shift();

            if (target === '..') {
                this.systemNavigator.goToParent();
            } else {
                this.systemNavigator.enterDirectoryByName(target);
            }
        }
    }
}
