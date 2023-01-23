import {h, Component, JSX} from 'preact';
import {InputLine} from './inputLine/inputLine';
import {bind} from 'decko';
import {TerminalItem, TerminalLog} from './terminalLog/terminalLog';

const DEFAULT_TERMINAL_INPUT_VALUE: string = '';

export interface AppProps {
    handleInput: (value: string) => string;
}

interface AppState {
    commandHistory: Array<TerminalItem>;
    terminalInputValue: string;
    caretPosition: number;
}

export class TerminalDisplay extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            commandHistory: [],
            terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE,
            caretPosition: 0
        };
    }

    public render(props: AppProps, state: AppState): JSX.Element {
        return (
            <div className="terminal">
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
        const response: string = this.props.handleInput(consoleInputValue);

        const userInputItem: TerminalItem = {
            terminalPrefix: '>',
            text: consoleInputValue
        };

        const messages: Array<TerminalItem> = [userInputItem];

        if (response !== null) {
            messages.push({text: response});
        }

        this.putMessages(messages);
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
