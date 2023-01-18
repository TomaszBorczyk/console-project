import {h, Component, JSX} from 'preact';
import {InputLine} from './components/inputLine/inputLine';
import {bind} from 'decko';
import {TerminalItem, TerminalLog} from './components/terminalLog/terminalLog';
import {TerminalParser, TerminalResponse} from './parsers/terminalParser';

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

    constructor(props: AppProps) {
        super(props);
        this.state = {
            commandHistory: [],
            terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE,
            caretPosition: 0
        };
        this.terminalParser = new TerminalParser();
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

        const terminalItem: TerminalItem = {text: terminalResponse.message};

        this.setState(Object.assign(
            this.state,
            {
                commandHistory: this.state.commandHistory.concat([userInputItem, terminalItem]),
                terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE,
                caretPosition: 0
            }
        ));
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
}
