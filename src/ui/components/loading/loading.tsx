import {PopupProps} from '../popup/popup';
import {Component, h, JSX} from 'preact';


// export class Popup extends Component<PopupProps, PopupState> {
// }

export function Loading(): JSX.Element {
    return <div className="loading">
        <div className="color"/>
    </div>;
}
