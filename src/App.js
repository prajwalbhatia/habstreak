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
import RewardList from "pages/RewardList/rewardList";
import RecentActivities from 'pages/RecentActivities/recentActivities';
import AccountPage from 'pages/Account/account';
import LandingPage from 'pages/LandingPage/landingPage';
import ProfilePage from 'pages/Profile/profile';
import TermsAndCondition from 'pages/Policies/tearmsAndCondition';
import PrivacyPolicy from 'pages/Policies/privacyPolicy';
import CancellationPolicy from 'pages/Policies/cancellationPolicy';
import AboutUs from 'pages/AboutUs/about';
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
        <Route path="/streak/:id" component={Streak} />
        <Route path="/recent-activities" component={RecentActivities} />
        <Route path="/reward-list" component={RewardList} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" component={Errorpage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/terms-and-condition" component={TermsAndCondition} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/refund-policy" component={CancellationPolicy} />
        <Route path="/about-us" component={AboutUs} />

        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}


export default App;