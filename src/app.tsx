import { h, Component } from 'preact';

export interface AppProps {
    name: string;
}

interface AppState {
    name: string;
}

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = { name: props.name };
    }

    public componentDidMount(): void {
        setTimeout(() => {
            let state: AppState = Object.assign({}, this.state, {name: `Preact's componentDidMount worked as expected`});
            this.setState(state);
        }, 2000);
    }

    public render(props: AppProps, state: AppState): JSX.Element {
        return <h1>props: {props.name} state: {state.name}</h1>;
    }
}
