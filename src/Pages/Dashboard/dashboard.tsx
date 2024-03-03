import { ErrorBoundary } from "react-error-boundary";

import Frame from "Components/frame/frame";
import StreakSummary from "./components/StreakSummary";
import StreakAnalysis from "./components/StreakAnalysis";
import Activities from "./components/Activities";

import { errorHandler } from "Utilities";
import Fallback from "Utilities/fallback/fallback";

import "Styles/Pages/dashboard.scss";
import "index.scss";
import { useState } from "react";

function Dashboard() {
  const [refetchVal, setRefetchVal] = useState(false);
  return (
    <Frame
      withHeader={true}
      withDate={true}
      headerTitle={"Dashboard"}
      withSearchBox={false}
      containerClass="dashboard"
      updateData={() => {
        setRefetchVal(true);
        setTimeout(() => {
          setRefetchVal(false);
        }, 0);
      }}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <>
          <div className="d-flex dashboard-inner-container">
            <div className="flex-dir-col left-container">
              <StreakSummary/>
              <div className="flex-dir-col data-container">
                <StreakAnalysis />
              </div>
            </div>
            <div className="flex-dir-col right-container">
              <Activities refetchVal={refetchVal} />
            </div>
          </div>
        </>
      </ErrorBoundary>
    </Frame>
  );
}

export default Dashboard;
