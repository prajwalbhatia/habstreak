import React, { lazy, Suspense } from 'react';

//Third party libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

import ProtectedRoute from 'ProtectedRoutes';

import "./fontello/css/habstreak.css"
import './App.css';

//PAGED
const DashboardPage = lazy(() => import('pages/Dashboard/dashboard'));
const StreakListPage = lazy(() => import('pages/StreakList/streak-list'));
const Streak = lazy(() => import('pages/Streak/streak'));
const RewardList = lazy(() => import('pages/RewardList/rewardList'));
const RecentActivities = lazy(() => import('pages/RecentActivities/recentActivities'));
const AccountPage = lazy(() => import('pages/Account/account'));
const LandingPage = lazy(() => import('pages/LandingPage/landingPage'));
const ProfilePage = lazy(() => import('pages/Profile/profile'));
const TermsAndCondition = lazy(() => import('pages/Policies/tearmsAndCondition'));
const PrivacyPolicy = lazy(() => import('pages/Policies/privacyPolicy'));
const CancellationPolicy = lazy(() => import('pages/Policies/cancellationPolicy'));
const AboutUs = lazy(() => import('pages/AboutUs/about'));
const SuccessPage = lazy(() => import('pages/GoogleResponse/success'));
const Errorpage = lazy(() => import('pages/GoogleResponse/error'));

function App(props) {
  return (
    <Suspense fallback={<div className="loader-container">
      <ClipLoader loading size={40} color="var(--primaryColor)" />
    </div>}>
      <Router>
        <div id="modal-container-id"></div>
        <Switch>
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <ProtectedRoute exact path="/streak-list" component={StreakListPage} />
          <ProtectedRoute path="/streak/:id" component={Streak} />
          <ProtectedRoute path="/recent-activities" component={RecentActivities} />
          <ProtectedRoute path="/reward-list" component={RewardList} />
          <ProtectedRoute path="/success" component={SuccessPage} />
          <ProtectedRoute path="/error" component={Errorpage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/terms-and-condition" component={TermsAndCondition} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/refund-policy" component={CancellationPolicy} />
          <Route path="/about-us" component={AboutUs} />

          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </Suspense>
  );
}


export default App;