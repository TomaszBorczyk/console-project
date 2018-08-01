import { h, Component } from 'preact';
import { bind } from 'decko';

interface InputLineState {
    terminalText: string;
}

export class InputLine extends Component<{}, InputLineState> {
    private terminalInput: HTMLElement;
    private commandPrompt: HTMLElement;

    constructor() {
        super();
        this.state = { terminalText: '' };
    }

    public render(): JSX.Element {
        return (
            <div className='input-line'>
                <span>DevosCorp:~$ </span>
                <span className='terminal-text-inputed'>{this.state.terminalText}</span>
                <span
                    className='command-prompt'
                    ref={(element: HTMLElement) => this.commandPrompt = element}>_</span>
                <span
                    className='terminal-input'
                    contentEditable={true}
                    ref={(element: HTMLElement) => this.terminalInput = element}>
                    {this.state.terminalText}
                </span>
            </div>
        );
    }

    public componentDidMount(): void {
        this.terminalInput.addEventListener('input', this.onTerminalInputChange);
        this.terminalInput.addEventListener('keydown', this.watchEnterKey);
        document.addEventListener('click', this.clickOutsideInputListener);
        this.terminalInput.focus();
        this.blinkCommandPrompt();
    }

    public componentWillUnmount(): void {
        this.terminalInput.removeEventListener('input', this.onTerminalInputChange);
        this.terminalInput.removeEventListener('keydown', this.watchEnterKey);
        document.removeEventListener('click', this.clickOutsideInputListener);
    }

    @bind()
    private onTerminalInputChange(): void {
        console.log(`terminal input changed`, this.terminalInput.textContent);
        const terminalText: string = this.terminalInput.textContent;
        const state: InputLineState = Object.assign(this.state, {terminalText});
        this.setState(state);
    }

    @bind()
    private watchEnterKey(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
           event.preventDefault();
        }
    }

    @bind()
    private clickOutsideInputListener(): void {
        this.terminalInput.focus();
    }

    @bind()
    private blinkCommandPrompt(): void {
        setInterval(() => {
            if (this.commandPrompt.classList.contains('hidden')) {
                this.commandPrompt.classList.remove('hidden');
            } else {
                this.commandPrompt.classList.add('hidden');
            }
        }, 1000);
    }
}
