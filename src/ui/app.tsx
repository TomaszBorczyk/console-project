import {h, Component, JSX} from 'preact';
import {Terminal} from './components/terminal/terminal';
import {Popup, PopupChoice, PopupProps} from './components/popup/popup';
import {bind} from 'decko';
import {Loading} from './components/loading/loading';


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
        return <div className="app-content">
            {this.renderContent()}
        </div>;
    }

    private renderContent(): JSX.Element {
        switch (this.state.mode) {
            case AppMode.WarningPopup:
                return this.renderWarningPopup();
            case AppMode.Loading:
                return this.renderLoading();
            case AppMode.Terminal:
                return this.renderTerminal();
            default:
                return this.renderTerminal();
        }
    }

    private renderTerminal(): JSX.Element {
        return <Terminal/>;
    }


    private renderLoading(): JSX.Element {
        return this.popup({body: <Loading onLoaded={this.onLoaded}/>}, 'loading-popup');
    }

    @bind()
    private onLoaded(): void {
        this.setState({...this.state, mode: AppMode.Terminal});
    }

    private renderWarningPopup(): JSX.Element {
        const TEXT: string = 'You are accessing confidential data. Are you ready to hack it?';

        const CHOICES: Array<PopupChoice> = [
            {text: '\<Yes\>', onClick: this.yesChoice},
            {text: '\<No, but yes\>', onClick: this.yesChoice},
        ];

        return this.popup({body: TEXT, choices: CHOICES});
    }

    private popup(props: PopupProps, className: string = ''): JSX.Element {
        return (
            <div className={`popup-wrapper ${className}`}>
                <Popup body={props.body} choices={props.choices}/>
            </div>
        );
    }

    @bind()
    private yesChoice(): void {
        this.setState({...this.state, mode: AppMode.Loading});
    }
}
