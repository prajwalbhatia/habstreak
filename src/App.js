import React, { Component } from 'react';

//Third party libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//Paged
import DashboardPage from './pages/Dashboard/dashboard';
import StreakPage from './pages/Streak/streak';
import RewardsPage from "./pages/Rewards/rewards";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        {/* Modal Container */}
        <div id="modal-container-id"></div>
        <Switch>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/streak">
            <StreakPage />
          </Route>
          <Route path="/rewards">
            <RewardsPage />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;