import { h, render } from 'preact';
import { App } from './app';
import './index.scss';

render(<App name='cool working' />, document.getElementById('app'));
