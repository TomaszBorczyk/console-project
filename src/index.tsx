import { h, render } from 'preact';
import { App } from './ui/app';
import './index.scss';

render(<App name='cool working' />, document.getElementById('app'));
