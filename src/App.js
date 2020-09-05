import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/style/style.css';
import 'font-awesome/css/font-awesome.min.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/music" component={Form} />
            <Route exact path="/music/:id" component={Form} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
