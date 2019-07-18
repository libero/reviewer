import * as React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

const App: React.FunctionComponent = () => (
  <Router>
      <Route exact path="/" component={() => <div>home route</div>} />
      <Route exact path="/dashboard" component={Dashboard} />
  </Router>
)

export default App
