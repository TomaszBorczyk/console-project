import { h, Component } from 'preact';
import {bind} from 'decko';

const TERMINAL_LINE_PREFIX: string = '>';
const CARET_BLINKING_CLASS: string = 'blinking';
const CARET_BLINK_PAUSE_TIME_MS: number = 300;
const CARET_LETTER_SIZE_PX: number = 9.6;

interface InputLineState {
    terminalText: string;
    caretBlinking: boolean;
}

export class InputLine extends Component<{}, InputLineState> {
    private terminalInput: HTMLInputElement;
    private terminalTextInputed: HTMLElement;
    private caret: HTMLElement;
    private caretTimer: any;

    constructor() {
        super();
        this.state = { terminalText: '', caretBlinking: true};
    }

    public render(): JSX.Element {
        return (
            <div className='input-line'>
                <span>{TERMINAL_LINE_PREFIX}</span>
                <span
                    className='terminal-text-inputed'
                    ref={(element: HTMLInputElement) => this.terminalTextInputed = element}>{this.state.terminalText}</span>
                <span
                    className={`command-prompt ${this.state.caretBlinking ? CARET_BLINKING_CLASS : ''}`}
                    ref={(element: HTMLElement) => this.caret = element}>_</span>
                <input
                    className='terminal-input'
                    type='text'
                    value={this.state.terminalText}
                    ref={(element: HTMLInputElement) => this.terminalInput = element}/>
            </div>
        );
    }

    public componentDidMount(): void {
        this.terminalInput.addEventListener('input', this.onTerminalInputChange);
        this.terminalInput.addEventListener('keydown', this.watchKeys);
        this.terminalInput.addEventListener('keyup', this.watchCaretPosition);
        document.addEventListener('click', this.clickOutsideInputListener);
        this.focusToTerminal();
    }

    public componentWillUnmount(): void {
        this.terminalInput.removeEventListener('input', this.onTerminalInputChange);
        this.terminalInput.removeEventListener('keydown', this.watchKeys);
        this.terminalInput.removeEventListener('keyup', this.watchCaretPosition);
        document.removeEventListener('click', this.clickOutsideInputListener);
    }

    @bind()
    private onTerminalInputChange(): void {
        const terminalText: string = this.terminalInput.value;
        const state: InputLineState = Object.assign(this.state, {terminalText});
        this.setState(state);
        this.pauseCaretBlinking();
    }

    @bind()
    private watchKeys(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
           event.preventDefault();
        } else {
            // console.log(this.terminalInput.selectionS)
        }
    }

    @bind()
    private watchCaretPosition(): void {
        // const caretOffset: number = this.terminalTextInputed.getBoundingClientRect().left;
        const caretOffset: number = 14;
        const caretPosition: number = caretOffset + this.terminalInput.selectionStart * CARET_LETTER_SIZE_PX;
        this.caret.style.left = caretPosition.toString();
    }

    @bind()
    private clickOutsideInputListener(): void {
        this.focusToTerminal();
    }

    private focusToTerminal(): void {
        this.terminalInput.focus();
    }

    private pauseCaretBlinking(): void {
        window.clearTimeout(this.caretTimer);
        this.setCaretBlink(false);
        this.caretTimer = setTimeout(() => {
            this.setCaretBlink(true);
        },  CARET_BLINK_PAUSE_TIME_MS);
    }

    private setCaretBlink(value: boolean): void {
        this.setState(Object.assign(this.state, {caretBlinking: value}));
    }
}
