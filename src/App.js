import React from 'react';

//Third party libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//Paged
import DashboardPage from 'pages/Dashboard/dashboard';
import StreakListPage from 'pages/StreakList/streak-list';
import Streak from "pages/Streak/streak";
import RewardPage from "pages/Reward/reward";
import RecentActivities from 'pages/RecentActivities/recentActivities';
import AccountPage from 'pages/Login/login';
import LandingPage from 'pages/LandingPage/landingPage';
import SuccessPage from 'pages/GoogleResponse/success';
import Errorpage from 'pages/GoogleResponse/error';

import "./fontello/css/habstreak.css"
import './App.css';

function App(props) {
  return (
    <Router>
      <div id="modal-container-id"></div>
      <Switch>
        <Route path="/dashboard" component={DashboardPage} />
        <Route exact path="/streak-list" component={StreakListPage} />
        <Route path="/streak-list/:id" component={Streak} />
        <Route path="/recent-activities" component={RecentActivities} />
        <Route path="/reward" component={RewardPage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" component={Errorpage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}


export default App;