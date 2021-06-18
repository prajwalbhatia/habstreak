import React from 'react';

//COMPONENTS
import Navigation from "../../components/navigation/navigation";
import Header from "../../components/header/header";
import Card from "../../components/card/card";
import {PrimaryButton} from "../../components/button/button";

//CSS
import './dashboard.css';
import "../../index.css";

function Dashboard(props) {
  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard-main-container">
          <Header
            headerText={'DASHBOARD'}
            withSearchBox={true}
          />

          {/* Notification Card */}
          <Card cardClass="notification-card">
            <h2>Welcom back, Prajwal Bhatia!</h2>
            <h4 className="mt-1">You have 10 task to complete today</h4>
            <PrimaryButton
              name={'Check now'}
              btnContainerClass={'mt-1'}
            />
          </Card>

          {/* Progress streak */}
          <div className="progress-streak-container">
              <diV className="header-container">
                <h4>Streak in Progress</h4>
                <PrimaryButton
                  name={'View all'}
                />
            </diV>

            <div className="streak-list">
              <Card cardClass="streak-card">
                <h2>Welcom back, Prajwal Bhatia!</h2>
                <h4 className="mt-1">You have 10 task to complete today</h4>
                <PrimaryButton
                  name={'Check now'}
                  btnContainerClass={'mt-1'}
                />
              </Card>
            </div>
          </div>

      </div>
    </div>
  );
}

export default Dashboard;