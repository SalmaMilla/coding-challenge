import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 

import {Menu} from './components/Menu'
import {DefaultFilter} from './components/DefaultFilter'
import {UserFilters} from './components/UserFilters'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/coding-challenge" component={Menu} />
        <Route path="/default-filter" component={DefaultFilter} />
        <Route path="/user-filters" component={UserFilters} />
      </Switch>
    </Router>
  );
}

export default App;