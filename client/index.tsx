import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  './src/core/utils/i18n';
import App from './src/core/components/App';

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
