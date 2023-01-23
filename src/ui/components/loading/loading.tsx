import {Component, h, JSX} from 'preact';


interface LoadingProps {
    onLoaded: () => void;
}

export class Loading extends Component<LoadingProps, {}> {
    public render(props: LoadingProps): JSX.Element {
        setTimeout(() => props.onLoaded(), 4000 + 500);

        return <div className="loading">
            <div className="color"/>
        </div>;
    }
}
