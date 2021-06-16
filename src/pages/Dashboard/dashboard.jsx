import React from 'react';

//COMPONENTS
import Navigation from "../../components/navigation/navigation";

//CSS
import './dashboard.css';

function Dashboard(props) {
  return (
    <div className="dashboard">
      <Navigation />
      {/* <h1>DASHBOARD</h1> */}
    </div>
  );
}

export default Dashboard;