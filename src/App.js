import React from 'react';

//Third party libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";


//Paged
import DashboardPage from 'pages/Dashboard/dashboard';
import StreakListPage from 'pages/StreakList/streak-list';
import Streak from "pages/Streak/streak";
import RewardPage from "pages/Reward/reward";
import LoginPage from 'pages/Login/login';
import SuccessPage from 'pages/GoogleResponse/success';
import Errorpage from 'pages/GoogleResponse/error';

import './App.css';

function App(props) {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    // isAuthenticated
    // ?
    <Router>
      <div id="modal-container-id"></div>
      <Switch>
        <Route path="/dashboard" component={DashboardPage} />
        <Route exact path="/streak-list" component={StreakListPage} />
        <Route path="/streak-list/:id" component={Streak} />
        <Route path="/reward" component={RewardPage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" component={Errorpage} />
        <Route path="/" component={LoginPage} />
        {/* <Route path="/">
            <Redirect to="/" />
          </Route> */}
      </Switch>
    </Router>
    // :
    // <Router>
    //   <div id="modal-container-id"></div>
    //   <Switch>
    //     <Route path="/" component={LoginPage} />
    //   </Switch>
    // </Router>
  );
}


export default App;