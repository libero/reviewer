import * as React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';

const App: React.FunctionComponent = () => (
  <Router>
      <Route exact path="/" component={() => <div>home route</div>} />
  </Router>
)

export default App