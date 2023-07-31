import {Component, h, JSX} from 'preact';
import {bind} from 'decko';
import {ARROW_DOWN_KEY, ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ENTER_KEY} from '../../../utils/keys';

const TERMINAL_LINE_PREFIX: string = '>';
const CARET_BLINKING_CLASS: string = 'blinking';
const CARET_BLINK_PAUSE_TIME_MS: number = 300;
const CARET_LETTER_SIZE_PX: number = 9.6;
const CARET_OFFSET_LEFT_PX: number = 14;

interface InputLineProps {
    terminalText: string;
    caretPosition: number;
    path: string;
    onInputChange: (terminalText: string, caretPosition: number) => void;
    onEnter: (value: string) => void;
    // onArrowUp?: () => void;
    // onArrowDown?: () => void;
}

interface InputLineState {
    caretBlinking: boolean;
    onEnter: (value: string) => void;
    // onArrowUp: () => void;
    // onArrowDown: () => void;
}

export class InputLine extends Component<InputLineProps, InputLineState> {
    private terminalInput: HTMLInputElement;
    private terminalTextInputed: HTMLElement;
    private caret: HTMLElement;
    private caretTimer: any;

    constructor(props: InputLineProps) {
        super();
        this.state = {
            onEnter: props.onEnter,
            caretBlinking: true,
        };
    }

    public render(props: InputLineProps, state: InputLineState): JSX.Element {
        return (
            <div className="input-line">
                <span>{this.renderPath()}{TERMINAL_LINE_PREFIX}</span>
                <span
                    className="terminal-text-inputed"
                    ref={(element: HTMLInputElement) => this.terminalTextInputed = element}>{props.terminalText}</span>
                <span
                    className={`command-prompt ${this.state.caretBlinking ? CARET_BLINKING_CLASS : ''}`}
                    ref={(element: HTMLElement) => this.caret = element}/>
                <input
                    className="terminal-input"
                    type="text"
                    value={props.terminalText}
                    ref={(element: HTMLInputElement) => this.terminalInput = element}/>
            </div>
        );
    }

    public componentDidUpdate(): void {
        this.terminalInput.scrollIntoView();
        this.updateRealCaretPosition();
        this.updateVisualCaretPosition();
    }

    public componentDidMount(): void {
        this.terminalInput.addEventListener('input', this.onTerminalInputChange);
        this.terminalInput.addEventListener('keydown', this.watchKeys);
        document.addEventListener('click', this.clickOutsideInputListener);
        this.focusToTerminal();
        this.updateRealCaretPosition();
    }

    public componentWillUnmount(): void {
        this.terminalInput.removeEventListener('input', this.onTerminalInputChange);
        this.terminalInput.removeEventListener('keydown', this.watchKeys);
        document.removeEventListener('click', this.clickOutsideInputListener);
    }

    @bind()
    private onTerminalInputChange(): void {
        const terminalText: string = this.terminalInput.value;
        const caretPosition: number = this.terminalInput.selectionStart;
        this.props.onInputChange(terminalText, caretPosition);
        this.pauseCaretBlinking();
    }

    @bind()
    private watchKeys(event: KeyboardEvent): void {
        if (event.key === ENTER_KEY) {
            event.preventDefault();
            this.state.onEnter(this.terminalInput.value);
        } else {
            let caretPosition: number = this.props.caretPosition;
            let textLength: number = this.terminalInput.value.length;

            switch (event.key) {
                case ARROW_RIGHT_KEY:
                    event.preventDefault();
                    caretPosition += caretPosition < textLength ? 1 : 0;
                    break;
                case ARROW_LEFT_KEY:
                    event.preventDefault();
                    caretPosition -= caretPosition !== 0 ? 1 : 0;
                    break;
                case ARROW_UP_KEY:
                case ARROW_DOWN_KEY:
                    event.preventDefault();
                    break;
            }

            if (event.key === ARROW_RIGHT_KEY || event.key === ARROW_LEFT_KEY) {
                this.pauseCaretBlinking();
                this.props.onInputChange(this.terminalInput.value, caretPosition);
            }
        }

    }

    @bind()
    private clickOutsideInputListener(): void {
        this.focusToTerminal();
    }

    private focusToTerminal(): void {
        this.terminalInput.focus();
    }

    private updateRealCaretPosition(): void {
        this.terminalInput.setSelectionRange(this.props.caretPosition, this.props.caretPosition);
    }

    private updateVisualCaretPosition(): void {
        let caretLeftPx: number = CARET_OFFSET_LEFT_PX + (this.props.caretPosition + this.getPathCaretOffset()) * CARET_LETTER_SIZE_PX;
        this.caret.style.left = caretLeftPx.toString();
    }

    private getPathCaretOffset(): number {
        return this.renderPath().length;
    }

    private renderPath(): string {
        return `${this.props.path} `;
    }

    private pauseCaretBlinking(): void {
        window.clearTimeout(this.caretTimer);
        this.setCaretBlink(false);
        this.caretTimer = setTimeout(() => {
            this.setCaretBlink(true);
        }, CARET_BLINK_PAUSE_TIME_MS);
    }

    private setCaretBlink(value: boolean): void {
        this.setState(Object.assign(this.state, {caretBlinking: value}));
    }
}
