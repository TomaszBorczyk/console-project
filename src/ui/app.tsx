import {h, Component, JSX} from 'preact';
import {InputLine} from './components/inputLine/inputLine';
import {bind} from 'decko';
import {TerminalItem, TerminalLog} from './components/terminalLog/terminalLog';
import {TerminalParser, TerminalResponse} from './parsers/terminalParser';
import {SystemNavigator} from './system/systemNavigator';
import {FILE_SYSTEM} from '../config/system';
import {TerminalCommand} from './parsers/commandInterpreter';
import {Directory} from './system/structure';

const DEFAULT_TERMINAL_INPUT_VALUE: string = '';

export interface AppProps {
    // commandHistory?: Array<string>;
}

interface AppState {
    commandHistory: Array<TerminalItem>;
    terminalInputValue: string;
    caretPosition: number;
}

export class App extends Component<AppProps, AppState> {
    private terminalParser: TerminalParser;
    private systemNavigator: SystemNavigator;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            commandHistory: [],
            terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE,
            caretPosition: 0
        };
        this.terminalParser = new TerminalParser();
        this.systemNavigator = new SystemNavigator(FILE_SYSTEM);
    }

    public render(props: AppProps, state: AppState): JSX.Element {
        return (
            <div>
                <TerminalLog items={state.commandHistory}/>
                <InputLine
                    terminalText={this.state.terminalInputValue}
                    caretPosition={this.state.caretPosition}
                    onEnter={this.handleEnter}
                    onInputChange={this.handleInputChange}/>
            </div>
        );
    }

    @bind()
    private handleEnter(consoleInputValue: string): void {
        const terminalResponse: TerminalResponse = this.terminalParser.getResponse(consoleInputValue);

        const userInputItem: TerminalItem = {
            terminalPrefix: '>',
            text: consoleInputValue
        };

        const messages: Array<TerminalItem> = [userInputItem];

        if (terminalResponse.message !== null) {
            messages.push({text: terminalResponse.message});
        }

        this.putMessages(messages);
        this.handleCommand(terminalResponse.command);
    }

    // fixme: this should be part of terminalParser or other module
    @bind()
    private handleCommand(command: TerminalCommand): void {
        if (command.command === 'cd') {
            if (command.options?.length > 1) {
                const terminalItem: TerminalItem = {text: 'Too many arguments'};
                this.putMessages([terminalItem]);
            }

            if (!command.options || command.options.length === 0) {
                this.systemNavigator.goToRoot();
            }

            if (command.options?.length === 1) {
                try {
                    this.systemNavigator.enterDirectoryByName(command.options[0]);
                } catch (e) {
                    const terminalItem: TerminalItem = {text: e.message};
                    this.putMessages([terminalItem]);
                }
            }
        }

        if (command.command === 'ls') {
            const currentDir: Directory = this.systemNavigator.getCurrentDirectory();
            const contents: string = currentDir.children.map(e => e.name).join(' ');
            const terminalItem: TerminalItem = {text: contents};
            this.putMessages([terminalItem]);
        }
    }

    @bind()
    private handleInputChange(terminalText: string, caretPosition: number): void {
        this.setState(Object.assign(
            this.state,
            {
                terminalInputValue: terminalText,
                caretPosition: caretPosition
            }
        ));
    }

    private putMessages(messages: Array<TerminalItem>): void {
        this.setState(Object.assign(
            this.state,
            {
                commandHistory: this.state.commandHistory.concat(messages),
                terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE,
                caretPosition: 0
            }
        ));
    }
}
