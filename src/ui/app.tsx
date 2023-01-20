import {h, Component, JSX} from 'preact';
import {Terminal} from './components/terminal/terminal';

export class App extends Component<{}, {}> {
    public render(props: {}, state: {}): JSX.Element {
        return <Terminal/>;
    }
}
