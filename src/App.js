import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'components/shared/Header'
import HomePage from 'views/HomePage'
import LoginPage from 'views/LoginPage'
import ErrorPage from 'views/ErrorPage'



export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <hr />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
