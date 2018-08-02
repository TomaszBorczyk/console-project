import { h, Component } from 'preact';
import {InputLine} from './components/inputLine/inputLine';
import {bind} from 'decko';
import {TerminalItem, TerminalLog} from './components/terminalLog/terminalLog';

const DEFAULT_TERMINAL_INPUT_VALUE: string = '';

export interface AppProps {
    // commandHistory?: Array<string>;
}

interface AppState {
    commandHistory: Array<TerminalItem>;
    terminalInputValue: string;
}

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            commandHistory: [],
            terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE
        };
    }

    public render(props: AppProps, state: AppState): JSX.Element {
        return (
            <div>
                <TerminalLog items={state.commandHistory}/>
                <InputLine
                    terminalText={this.state.terminalInputValue}
                    onEnter={this.handleEnter}
                    onInputChange={this.handleInputChange}/>
            </div>
        );
    }

    @bind()
    private handleEnter(value: string): void {
        const newHistoryEntry: TerminalItem = {
            terminalPrefix: '>',
            text: value
        };

        this.setState(Object.assign(
            this.state,
            {
                commandHistory: this.state.commandHistory.concat(newHistoryEntry),
                terminalInputValue: DEFAULT_TERMINAL_INPUT_VALUE
            }
        ));
    }

    @bind()
    private handleInputChange(value: string): void {
        this.setState(Object.assign(
            this.state,
            {
                terminalInputValue: value
            }
        ));
    }
}
