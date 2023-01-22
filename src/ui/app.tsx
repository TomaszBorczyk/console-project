import {h, Component, JSX} from 'preact';
import {Terminal} from './components/terminal/terminal';
import {Popup, PopupChoice} from './components/popup/popup';
import {bind} from 'decko';
import {Loading} from './components/loading/loading';

const TEXT: string = 'You are accessing confidential data. Are you ready to hack it?';

enum AppMode {
    WarningPopup,
    Loading,
    Terminal
}

interface AppState {
    mode: AppMode;
}

export class App extends Component<{}, AppState> {
    public state: AppState = {
        mode: AppMode.WarningPopup
    };

    public render(props: {}, state: {}): JSX.Element {
        switch (this.state.mode) {
            case AppMode.WarningPopup:
                return this.renderWarningPopup();
            case AppMode.Loading:
                return Loading();
            case AppMode.Terminal:
                return this.renderTerminal();
            default:
                return this.renderTerminal();
        }
    }

    private renderTerminal(): JSX.Element {
        return <Terminal/>;
    }

    private renderWarningPopup(): JSX.Element {
        const CHOICES: Array<PopupChoice> = [
            {text: '\<Yes\>', onClick: this.yesChoice},
            {text: '\<No, but yes\>', onClick: this.yesChoice},
        ];

        return (
            <div className="popup-wrapper">
                <Popup bodyText={TEXT} choices={CHOICES}/>
            </div>
        );
    }

    @bind()
    private yesChoice(): void {
        this.setState({...this.state, mode: AppMode.Terminal});
    }
}
