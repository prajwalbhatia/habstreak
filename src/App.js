import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

//Third party libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//UTILITIES
import { refreshToken } from 'utilities';

//Paged
import DashboardPage from 'pages/Dashboard/dashboard';
import StreakListPage from 'pages/StreakList/streak-list';
import Streak from "pages/Streak/streak";
import RewardList from "pages/RewardList/rewardList";
import RecentActivities from 'pages/RecentActivities/recentActivities';
import AccountPage from 'pages/Account/account';
import LandingPage from 'pages/LandingPage/landingPage';
import ProfilePage from 'pages/Profile/profile';
import SuccessPage from 'pages/GoogleResponse/success';
import Errorpage from 'pages/GoogleResponse/error';

import "./fontello/css/habstreak.css"
import './App.css';

function App(props) {
  const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const authData = useSelector((state) => state.user.authData);


  // useEffect(() => {
  //   const token = user?.refreshToken;
  //   console.log('🚀 ~ file: App.js ~ line 33 ~ useEffect ~ token', token);
  //   let intervalId = '';
  //   if (token) {
  //     intervalId = setInterval(() => {
  //       refreshToken(token);
  //     }, 5000);


  //     return () => {
  //       clearInterval(intervalId)
  //     }
  //   }

  // }, [user])


  // useEffect(() => {
  //   setUser(authData)
  // } , [])



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
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}


export default App;