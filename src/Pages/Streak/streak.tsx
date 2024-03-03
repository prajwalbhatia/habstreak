/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Fallback from "Utilities/fallback/fallback";
import { errorHandler } from "Utilities";

import Frame from "Components/frame/frame";
import StreakPerformanceDetail from "./Components/StreakPerformanceDetail";
import StreakDetail from "./Components/StreakDetail";
import DayContainer from "./Components/DayContainer";
import { checkingStatusForStreak } from "./helpers/StreakDetail.renderers";

import { useGetStreakQuery } from "../../Redux/Slices/streakSlice";
import { useGetStreakDetailQuery } from "../../Redux/Slices/streakDetailSlices";

import "Styles/Pages/streak.scss";
import { Skeleton } from "@mui/material";

function Streak() {
  const streakContainerRef = useRef(null);
  const location = useLocation();
  const [streakId, setStreakId] = useState<string | null>(null);

  const {
    data: streakDetail,
    isLoading: streakDetailLoading,
    isFetching: streakDetailIsFetching,
  } = useGetStreakDetailQuery({ streakId: streakId }, { skip: !streakId });

  const {
    data: streak,
    isLoading: streakLoading,
    isFetching: streakIsFetching,
  } = useGetStreakQuery({ streakId: streakId }, { skip: !streakId });

  useEffect(() => {
    const pathname = location?.pathname;
    const parts = pathname.split("/");

    if (parts.length >= 3 && parts[1] === "streak") {
      const id = parts[2];
      setStreakId(id);
    } else {
      console.log("ID not found in the pathname");
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let ref: any = streakContainerRef;
    if (ref) {
      ref.current?.scrollTo(0, 0);
    }
  }, [streakContainerRef]);

  return (
    <Frame
      containerClass="streak"
      withHeader={true}
      withSearchBox={false}
      headerTitle={streak?.[0]?.title}
      withInternalNavigation={true}
      internalNavigation={location?.state?.from}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <div
          ref={streakContainerRef}
          className="d-flex streak-details-container"
        >
          <div className="left-container">
            <div className="d-flex justify-space-between container-heading">
              <h3 className="jos-18-primary task-heading">Tasks</h3>
              <div className="rob-med-12-primary streak-status center-items">
                State:{"  "}
                {streakDetailLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ minWidth: 80, minHeight: 25, marginLeft: 0.5 }}
                  />
                ) : streak?.[0]?.tag ? (
                  streak?.[0]?.tag.toUpperCase()
                ) : (
                  <span className="ml-5">
                    {checkingStatusForStreak(
                      streak?.[0]?.dateFrom
                    ).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="task-container  mt-20">
              {streakDetailLoading ? (
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={120}
                  sx={{ marginTop: 2 }}
                />
              ) : (
                <DayContainer
                  streakDetail={streakDetail}
                  streak={streak}
                  loading={streakDetailLoading}
                />
              )}
            </div>
          </div>
          <div className="flex-dir-col right-container">
            <div className="d-flex streak-detail-container">
              <StreakDetail
                streak={streak}
                loading={streakLoading || streakIsFetching}
              />
            </div>

            <div className="d-flex performance-container">
              <StreakPerformanceDetail
                streak={streak}
                streakDetail={streakDetail}
                loading={streakLoading}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Frame>
  );
}

export default Streak;
