import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const App: React.StatelessComponent = (): JSX.Element => (
    <Router>
        <Route exact path="/" component={(): JSX.Element => <div>home route</div>} />
    </Router>
);

export default App;
