import {BaseApp} from './abstractApp';
import {SystemNavigator} from '../systemNavigator';
import {TerminalCommand} from '../../parsers/parseCommand';

export class Help extends BaseApp {
    constructor(private availableApps: Array<BaseApp>) {
        super();
        this._name = 'help';
        this._description = 'Display available commands';
    }

    public execute(command: TerminalCommand): string {
        return 'List of available commands: \n' + this.listApps();
    }

    private listApps(): string {
        return this.availableApps
            .map(app => this.descriptionFactory(app.name, app.description))
            .join('\n');
    }

    private descriptionFactory(appName: string, description: string): string {
        return `- ${appName} - ${description}`;
    }
}
