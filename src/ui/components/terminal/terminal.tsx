import {Component, createElement, h} from 'preact';
import JSX = createElement.JSX;
import {TerminalDisplay} from './terminalDisplay';
import {parseCommand, TerminalCommand} from '../../parsers/parseCommand';
import {bind} from 'decko';
import {CommandExecutor} from '../../system/commandExecutor';
import {SystemNavigator} from '../../system/systemNavigator';
import {FILE_SYSTEM} from '../../../config/system';
import {CD, LS, Help} from '../../system/applications';
import {BaseApp} from '../../system/applications/abstractApp';
import {Cat} from '../../system/applications/cat';

export class Terminal extends Component<{}, {}> {
    private readonly commandExecutor: CommandExecutor;
    private readonly systemNavigator: SystemNavigator;

    constructor() {
        super();
        this.systemNavigator = new SystemNavigator(FILE_SYSTEM);
        const apps: Array<BaseApp> = [];
        apps.push(
            new CD(this.systemNavigator),
            new LS(this.systemNavigator),
            new Cat(this.systemNavigator),
            new Help(apps)
        );

        this.commandExecutor = new CommandExecutor(apps);
    }

    public render(props?: {}, state?: Readonly<{}>): JSX.Element {
        return <TerminalDisplay handleInput={this.handleInput}/>;
    }

    @bind()
    private handleInput(value: string): string {
        const terminalCommand: TerminalCommand = parseCommand(value);
        const appResponse: string = this.commandExecutor.execute(terminalCommand);
        return appResponse;
    }
}
