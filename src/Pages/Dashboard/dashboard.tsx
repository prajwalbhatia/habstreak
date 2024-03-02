import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { clone } from "lodash";

import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import size from "lodash/size";

import Frame from "Components/frame/frame";

import { errorHandler, activityTitle } from "Utilities";
import Fallback from "Utilities/fallback/fallback";

import { theme } from "Constants/index";

import {
  useGetStreaksQuery,
  useCreateStreakMutation,
} from "../../Redux/Slices/streakSlice";
import { useGetRewardsQuery } from "../../Redux/Slices/rewardSlice";
import { useGetRecentActivitiesQuery } from "../../Redux/Slices/recentActivitiesSlice";
import { useCreateStreakDetailMutation } from "../../Redux/Slices/streakDetailSlices";

import {
  ActivityInterface,
  RewardInterface,
  StreakInterface,
} from "./constants/dashboard.interfaces";

import "Styles/Pages/dashboard.scss";
import "index.scss";
import StreakSummary from "./components/StreakSummary";

function Dashboard() {
  const navigate = useNavigate();

  const [groupedActivities, setGroupedActivities] = useState({});

  const [percentageData, setPercentageData] = useState<{
    streakSuccess: string;
    streakCompleted: number;
    rewardsCollectedPercentage: string;
    rewardsCollected: number;
    streakUnsuccessfulPercentage: string;
    streakUnsuccessful: number;
  }>({
    streakSuccess: "0",
    streakCompleted: 0,
    rewardsCollectedPercentage: "0",
    rewardsCollected: 0,
    streakUnsuccessfulPercentage: "0",
    streakUnsuccessful: 0,
  });

  const {
    data: streakList,
    isLoading: streakListLoading,
    refetch: streakRefetch,
  } = useGetStreaksQuery({});

  const { data: rewardList, isLoading: rewardListLoading } = useGetRewardsQuery(
    {}
  );

  const {
    data: recentActivitiesList,
    isLoading: recentActivitiesListLoading,
    refetch: activitiesRefetch,
  } = useGetRecentActivitiesQuery({});

  useEffect(() => {
    if (streakList && streakList.length) {
      const finished = streakList.filter(
        (streak: StreakInterface) => streak.tag === "finished"
      );
      const unfinishedStreak = streakList.filter(
        (streak: StreakInterface) => streak.tag === "unfinished"
      );

      const earned = rewardList
        ? rewardList.filter((reward: RewardInterface) => reward.rewardEarned)
        : [];
      const totalStreak = streakList ? streakList.length : 0;
      const totalRewards = rewardList ? rewardList.length : 0;

      const successfulStreak = finished.length;
      const rewardsCollected = earned.length;
      const streakUnsuccessful = unfinishedStreak.length;

      const successfulStreakPerc =
        totalStreak > 0
          ? ((successfulStreak / totalStreak) * 100).toFixed(2)
          : "0";
      const rewardsCollectedPercentage =
        totalRewards > 0
          ? ((rewardsCollected / totalRewards) * 100).toFixed(2)
          : "0";
      const streakUnsuccessfulPercentage =
        totalStreak > 0
          ? ((streakUnsuccessful / totalStreak) * 100).toFixed(2)
          : "0";

      setPercentageData({
        streakSuccess: successfulStreakPerc,
        streakCompleted: successfulStreak,
        rewardsCollectedPercentage: rewardsCollectedPercentage,
        rewardsCollected,
        streakUnsuccessfulPercentage,
        streakUnsuccessful,
      });
    }
  }, [streakList, rewardList]);

  useEffect(() => {
    if (recentActivitiesList && recentActivitiesList.length) {
      let activitiesClone: ActivityInterface[] = [...recentActivitiesList];
      const modifiedActivities = activitiesClone.map(
        (activityData: ActivityInterface) => {
          let activity = clone(activityData);
          const dateFromApi = activity.date;
          const modifiedDate = moment(dateFromApi).format("ll");
          const modifiedTime = moment(dateFromApi).format("LT");
          if (activity.date) delete activity.date;
          activity.date = modifiedDate;
          activity.time = modifiedTime;
          return activity;
        }
      );
      const groupedByDate = groupBy(modifiedActivities, "date");
      const currentDate = moment(moment().format()).format("ll");
      if (groupedByDate[currentDate]) {
        setGroupedActivities({ [currentDate]: groupedByDate[currentDate] });
      } else setGroupedActivities({});
    }
  }, [recentActivitiesList]);

  const recentActivityCardJsx = () => {
    const isEmpty = size(groupedActivities) === 0;
    if (!isEmpty) {
      return map(groupedActivities, (value, key) => {
        return (
          <div key={key} className="date-data">
            <span className="date-content">{key}</span>
            {map(value, (val: ActivityInterface, index) => {
              return (
                <div key={index} className="info-container">
                  <h3 className="time">{val.time}</h3>
                  <div
                    className="hr-line"
                    style={{ background: theme[Math.ceil(Math.random() * 10)] }}
                  ></div>
                  <div className="flex-dir-col action-info">
                    <span className="name">{val.title}</span>
                    <span className="action">{`Action: ${activityTitle(
                      val.type,
                      "",
                      "dashboard"
                    )}`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    } else {
      return (
        <div className="d-flex center-items h-100">
          <h3>No Latest data</h3>
        </div>
      );
    }
  };

  const progressDataJsx = () => {
    return (
      <>
        <div className="d-flex header-data">
          <h2>Data</h2>
        </div>

        <div className="d-flex progress-container">
          <div className="flex-dir-col progress-card">
            <div className="flex-dir-col title-container">
              <div className="center-items title-icon title-icon-succ">
                <i className="demo-icon icon-streak" />
              </div>
              <h3 className="d-flex">Streak Successful</h3>
            </div>
            <div className="d-flex progress-bar">
              <div className="d-flex bar">
                <div
                  className="bar-complete bar-comp-succ"
                  style={{ width: `${percentageData.streakSuccess}%` }}
                ></div>
              </div>
              <h4 className="perc prog-succ">{`${percentageData.streakSuccess}%`}</h4>
            </div>
            <div
              onClick={() => {
                navigate("/streak-list", { state: { goTo: "Finished" } });
              }}
              className="count-container count-container-succ c-pointer"
            >
              <h4>{`${percentageData?.streakCompleted} Streak completed`}</h4>
            </div>
          </div>

          <div className="flex-dir-col progress-card">
            <div className="flex-dir-col title-container">
              <div className="center-items title-icon title-icon-reward">
                <i className="demo-icon icon-reward" />
              </div>
              <h3 className="d-flex">Reward Collected</h3>
            </div>
            <div className="d-flex progress-bar">
              <div className="d-flex bar">
                <div
                  className="bar-complete bar-comp-reward"
                  style={{
                    width: `${percentageData.rewardsCollectedPercentage}%`,
                  }}
                ></div>
              </div>
              <h4 className="perc prog-reward">{`${percentageData.rewardsCollectedPercentage}%`}</h4>
            </div>
            <div
              className="count-container count-container-reward c-pointer"
              onClick={() => {
                navigate("/reward-list", { state: { goTo: "Earned" } });
              }}
            >
              <h4>{`${percentageData.rewardsCollected} Rewards completed`}</h4>
            </div>
          </div>

          <div className="flex-dir-col progress-card">
            <div className="flex-dir-col title-container">
              <div className="center-items title-icon title-icon-unsucc">
                <i className="demo-icon icon-streak" />
              </div>
              <h3 className="d-flex">Streak Unsuccessful</h3>
            </div>
            <div className="d-flex progress-bar">
              <div className="d-flex bar">
                <div
                  className="bar-complete bar-comp-unsucc"
                  style={{
                    width: `${percentageData.streakUnsuccessfulPercentage}%`,
                  }}
                ></div>
              </div>
              <h4 className="perc prog-unsucc">{`${percentageData.streakUnsuccessfulPercentage}%`}</h4>
            </div>
            <div
              className="count-container count-container-unsucc c-pointer"
              onClick={() => {
                navigate("/streak-list", { state: { goTo: "Unfinished" } });
              }}
            >
              <h4>{`${percentageData.streakUnsuccessful} Streak unsuccessful`}</h4>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Frame
      withHeader={true}
      withDate={true}
      headerTitle={"Dashboard"}
      withSearchBox={false}
      containerClass="dashboard"
      updateData={() => {
        streakRefetch();
        activitiesRefetch();
      }}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {streakListLoading ||
        rewardListLoading ||
        recentActivitiesListLoading ? (
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
        ) : (
          <>
            <div className="d-flex dashboard-inner-container">
              <div className="flex-dir-col left-container">
                <StreakSummary />
                <div className="flex-dir-col data-container">
                  {progressDataJsx()}
                </div>
              </div>
              <div className="flex-dir-col right-container">
                <div className="d-flex flex-auto flex-dir-col">
                  <h3 className="right-container-title">Calendar</h3>
                  {recentActivityCardJsx()}
                </div>

                <div
                  className="see-all-container center-items mt-50"
                  onClick={() => {
                    navigate({
                      pathname: `/recent-activities`,
                    });
                  }}
                >
                  <span className="see-all">SEE ALL</span>
                  <span className="see-all-btn center-items">
                    <i className="demo-icon icon-going-in" />
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </ErrorBoundary>
    </Frame>
  );
}

export default Dashboard;
