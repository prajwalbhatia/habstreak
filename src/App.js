import React, { Component , useEffect } from 'react';

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
import RewardPage from "./pages/Reward/reward";

import './App.css';

//Components
import Navigation from "./components/navigation/navigation";




class App extends Component {

  componentDidMount()
  {
    window.addEventListener('beforeunload' , () => {
      console.log('refresh')
   })
  }

  render() {
    return (
      <Router>
        {/* Modal Container */}
        <Navigation />
        <div id="modal-container-id"></div>
        <Switch>
          <Route path="/dashboard" component={DashboardPage}/>
          <Route exact path="/streak-list" component={StreakListPage}/>
          <Route path="/streak-list/:id" component={Streak}/>
          <Route path="/reward" component={RewardPage}/>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;