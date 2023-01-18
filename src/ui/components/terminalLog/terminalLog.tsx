import {h, Component, JSX} from 'preact';

export interface TerminalItem {
    text: string;
    terminalPrefix?: string;
}

export interface TerminalLogProps {
    items: Array<TerminalItem>;
}

export class TerminalLog extends Component<TerminalLogProps, {}> {
    public render(props: TerminalLogProps): JSX.Element {
        return (
            <div className='terminal-log'>
                {props.items.map((item: TerminalItem) => this.renderItem(item.terminalPrefix, item.text))}
            </div>
        );
    }

    private renderItem(terminalPrefix: string, text: string): JSX.Element {
        return (
            <div className='terminal-log-item'>
                {terminalPrefix ? <span className='prefix'>{terminalPrefix}</span> : null}
                <span>{text}</span>
            </div>
        );
    }

}
