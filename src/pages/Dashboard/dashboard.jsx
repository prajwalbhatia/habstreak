import React from 'react';

//COMPONENTS
import Navigation from "../../components/navigation/navigation";
import Header from "../../components/header/header";

//CSS
import './dashboard.css';

function Dashboard(props) {
  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard-main-container">
          <Header
            headerText={'DASHBOARD'}
            withSearchBox={true}
          />
      </div>
    </div>
  );
}

export default Dashboard;