import {Component, createElement, h} from 'preact';
import JSX = createElement.JSX;
import {TerminalDisplay} from './terminalDisplay';
import {parseCommand, TerminalCommand} from '../../parsers/parseCommand';
import {bind} from 'decko';
import {CommandExecutor} from '../../system/commandExecutor';
import {SystemNavigator} from '../../system/systemNavigator';
import {FILE_SYSTEM} from '../../../config/system';
import {CD, LS} from '../../system/applications';

export class Terminal extends Component<{}, {}> {
    private readonly commandExecutor: CommandExecutor;
    private readonly systemNavigator: SystemNavigator;

    constructor() {
        super();
        this.systemNavigator = new SystemNavigator(FILE_SYSTEM);
        this.commandExecutor = new CommandExecutor([
            new CD(this.systemNavigator),
            new LS(this.systemNavigator)
        ]);
    }

    public render(props?: {}, state?: Readonly<{}>): JSX.Element {
        return <TerminalDisplay handleInput={this.handleInput}/>;
    }

    @bind()
    private handleInput(value: string): string {
        const terminalResponse: TerminalCommand = parseCommand(value);
        const appResponse: string = this.commandExecutor.execute(terminalResponse);
        return appResponse;
    }
}
