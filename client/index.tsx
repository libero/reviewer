import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './src/core/components/App';

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<App />, wrapper) : false;
