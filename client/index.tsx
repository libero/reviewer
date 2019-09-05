import * as React from 'react';
import * as ReactDOM from 'react-dom';
import I18n from './src/core/utils/i18n';
import App from './src/core/components/App';

I18n()

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
