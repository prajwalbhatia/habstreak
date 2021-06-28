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
import StreakListPage from './pages/StreakList/streak-list';
import Streak from "./pages/Streak/streak";
import RewardsPage from "./pages/Rewards/rewards";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        {/* Modal Container */}
        <div id="modal-container-id"></div>
        <Switch>
          <Route path="/dashboard" component={DashboardPage}/>
          <Route exact path="/streak-list" component={StreakListPage}/>
          <Route path="/streak-list/:id" component={Streak}/>
          <Route path="/rewards" component={RewardsPage}/>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;