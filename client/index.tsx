import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './globals.scss'

import App from './src/App';

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
