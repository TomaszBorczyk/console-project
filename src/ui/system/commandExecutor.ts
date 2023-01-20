import {TerminalCommand} from '../parsers/parseCommand';
import {BaseApp} from './applications/abstractApp';

export class CommandExecutor {
    constructor(private apps: Array<BaseApp>) {
    }

    public execute(command: TerminalCommand): string {
        if (!command.command) {
            return null;
        }

        const app: BaseApp = this.getApp(command.command);

        if (!app) {
            return `command not found: ${command.command}\nuse 'help' to display available commands`;
        }

        return app.execute(command);
    }

    private getApp(command: string): BaseApp {
        return this.apps.find(app => app.name === command);
    }

}
