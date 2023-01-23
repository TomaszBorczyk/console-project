import {Component, h, JSX} from 'preact';
import {ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ENTER_KEY} from '../../utils/keys';
import {bind} from 'decko';

export interface PopupChoice {
    text: string;
    onClick: () => void;
}

interface PopupState {
    selected: number;
}

export interface PopupProps {
    body: JSX.Element | string;
    choices?: Array<PopupChoice>;
}

export class Popup extends Component<PopupProps, PopupState> {
    public state: PopupState = {
        selected: 0
    };

    private popup: HTMLElement;

    public render(props?: PopupProps): JSX.Element {
        return (
            <div className="popup" ref={(el: HTMLElement) => this.popup = el} tabIndex={0}>
                <div className="body">{props.body}</div>
                <div className="choices">
                    {
                        props.choices?.map((choice: PopupChoice, i: number) => {
                            return this.renderChoice(choice, i);
                        })
                    }
                </div>
            </div>
        );
    }

    public componentDidMount(): void {
        this.popup.addEventListener('keydown', this.watchKeys);
        document.addEventListener('click', this.clickOutsideListener);
        this.focusToBody();
    }

    public componentWillUnmount(): void {
        this.popup.removeEventListener('keydown', this.watchKeys);
        document.removeEventListener('click', this.clickOutsideListener);
    }

    private renderChoice(choice: PopupChoice, index: number): JSX.Element {
        const selected: boolean = index === this.state.selected;
        const additionalClass: string = selected ? 'selected' : '';

        return <span className={`choice ${additionalClass}`}>{choice.text}</span>;
    }

    private focusToBody(): void {
        this.popup.focus();
    }

    @bind()
    private clickOutsideListener(): void {
        this.focusToBody();
    }

    @bind()
    private watchKeys(event: KeyboardEvent): void {
        if (event.key === ARROW_LEFT_KEY) {
            const newSelected: number = this.state.selected > 0 ? this.state.selected - 1 : 0;
            this.setState({...this.state, selected: newSelected});
        }

        if (event.key === ARROW_RIGHT_KEY) {
            const maxIndex: number = this.props.choices.length - 1;
            const newSelected: number =  this.state.selected < maxIndex ? this.state.selected + 1 : maxIndex;
            this.setState({...this.state, selected: newSelected});
        }

        if (event.key === ENTER_KEY) {
            this.props.choices[this.state.selected].onClick();
        }
    }
}
