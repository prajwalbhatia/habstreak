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
import { OutlinedPrimaryButton } from "Components/buttons/buttons";

import {
  useGetStreaksQuery,
  useCreateStreakMutation,
} from "../../Redux/Slices/streakSlice";
import { useGetRewardsQuery } from "../../Redux/Slices/rewardSlice";
import { useGetRecentActivitiesQuery } from "../../Redux/Slices/recentActivitiesSlice";

import {
  errorHandler,
  isSameOrBefore,
  activityTitle,
  isSameOrAfter,
  planDetail,
  dialogForUpgrade,
  dialogForCreateAndUpdateStreak,
  isSame,
  perPerDay,
  dialogForError,
} from "Utilities";
import Fallback from "Utilities/fallback/fallback";

import { icons, theme, plansFeatures } from "Constants/index";

import "Styles/Pages/dashboard.scss";
import "index.scss";
import { useCreateStreakDetailMutation } from "../../Redux/Slices/streakDetailSlices";

interface StreakInterace {
  _id: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  days: string;
  description: string;
  userId: string;
  __v: number;
  rewards: object;
  tag?: string;
}

interface RewardInterface {
  rewardEarned: boolean;
  _id: string;
  userId: string;
  title: string;
  streakId: string;
  date: string;
  __v: number;
}

interface ActivityInterface {
  _id: string;
  userId: string;
  type: string;
  title: string;
  date?: string;
  time: string;
  __v: number;
}

interface PercentageDataInterface {
  streakSuccess: string;
  streakUnsuccessful: number;
  streakCompleted: number;
  rewardsCollectedPerc: string;
  rewardsCollected: number;
  streakUnsuccessfulPerc: string;
}

interface StreakInterface {
  tag: string;
  dateFrom: string;
  dateTo: string;
}

interface RewardInterface {
  rewardEarned: boolean;
}

function Dashboard() {
  const navigate = useNavigate();

  const [groupedActivities, setGroupedActivities] = useState({});
  const [planType, setPlanType] = useState("");

  const [streakCount, setStreakCount] = useState<number>(0);
  const [percentageData, setPercentageData] = useState<{
    streakSuccess: string;
    streakCompleted: number;
    rewardsCollectedPerc: string;
    rewardsCollected: number;
    streakUnsuccessfulPerc: string;
    streakUnsuccessful: number;
  }>({
    streakSuccess: "0",
    streakCompleted: 0,
    rewardsCollectedPerc: "0",
    rewardsCollected: 0,
    streakUnsuccessfulPerc: "0",
    streakUnsuccessful: 0,
  });
  const [taskCount, setTaskCount] = useState<number>(0);

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

  const [createStreak, { isSuccess: createStreakSuccess }] =
    useCreateStreakMutation();

  const [createStreakDetail, { isSuccess: createStreakDetsilSuccess }] =
    useCreateStreakDetailMutation();

  const authData = useSelector((state: any) => state.authDataStore);

  useEffect(() => {
    if (streakList && streakList.length) {
      const currentDate = moment().format();
      const finished = streakList.filter(
        (streak: StreakInterface) => streak.tag === "finished"
      );
      const unfinishedStreak = streakList.filter(
        (streak: StreakInterface) => streak.tag === "unfinished"
      );

      const running = streakList.filter((streak: StreakInterface) => {
        if (
          (moment(streak.dateFrom).isSameOrBefore(currentDate) ||
            moment(streak.dateTo).isSameOrAfter(currentDate)) &&
          !streak.tag
        ) {
          return streak;
        }
        return null;
      });

      const filterStreaks = running.filter(
        (streak: StreakInterface, index: number) => {
          if (
            index <= 2 &&
            moment(streak.dateFrom).isSameOrBefore(currentDate)
          ) {
            return streak;
          }
          return null;
        }
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
      const rewardsCollectedPerc =
        totalRewards > 0
          ? ((rewardsCollected / totalRewards) * 100).toFixed(2)
          : "0";
      const streakUnsuccessfulPerc =
        totalStreak > 0
          ? ((streakUnsuccessful / totalStreak) * 100).toFixed(2)
          : "0";

      setStreakCount(streakList.length);
      setPercentageData({
        streakSuccess: successfulStreakPerc,
        streakCompleted: successfulStreak,
        rewardsCollectedPerc: rewardsCollectedPerc,
        rewardsCollected,
        streakUnsuccessfulPerc,
        streakUnsuccessful,
      });
      setTaskCount(filterStreaks.length);
    }
  }, [streakList, rewardList]);

  useEffect(() => {
    if (authData) setPlanType(planDetail(authData?.planType));
  }, [authData]);

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

  useEffect(() => {
    if (streakRefetch && activitiesRefetch) {
      streakRefetch();
      activitiesRefetch();
    }
  }, [createStreakSuccess]);

  const streakCardJsx = (streakList: StreakInterace[]) => {
    const currentDate = moment().format();

    //Streaks that are artice currently or will become active in future (i.e upcoming)
    //Finished and unfinished streak will be excluded

    const running = streakList.filter((streak: StreakInterace) => {
      if (
        (isSameOrBefore(streak.dateFrom, currentDate) ||
          isSameOrAfter(streak.dateTo, currentDate)) &&
        !streak.tag
      ) {
        return streak;
      } else return null;
    });

    if (running.length > 0) {
      const filterStreaks = running.filter(
        (streak: StreakInterace, index: number) => {
          if (index <= 2 && isSameOrBefore(streak.dateFrom, currentDate))
            return streak;
        }
      );
      if (filterStreaks.length > 0) {
        return filterStreaks.map((streak: StreakInterace, index: number) => {
          if (streak.tag !== "unfinished") {
            const { dateFrom, dateTo, _id } = streak;
            const todayDate = moment(new Date());
            const percPerDay = perPerDay(dateFrom, dateTo);

            const daysDone = isSame(todayDate, dateFrom)
              ? 0
              : todayDate.diff(dateFrom, "days");
            const progress = percPerDay * daysDone;
            return (
              <div
                key={index}
                className="flex-dir-col streak-card"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/streak/${_id}`, { state: { from: "Dashboard" } });
                }}
              >
                <div
                  className="center-items card-icon"
                  style={{ background: theme[index] }}
                >
                  <i className={`demo-icon ${icons[index]}`} />
                </div>
                <h4>{streak.title}</h4>
                <h6 className="mt-10">Running</h6>
                <h1 style={{ color: theme[index] }}>{`${progress.toFixed(
                  2
                )}%`}</h1>
                <span>{`${streak.days} day to go`}</span>
                <div
                  className="d-flex go-btn"
                  style={{ background: theme[index] }}
                >
                  <i className="demo-icon icon-going-in" />
                </div>
              </div>
            );
          }
        });
      } else {
        return <h2>No Current Tasks</h2>;
      }
    } else {
      return <h2>No Current Tasks</h2>;
    }
  };

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
                  style={{ width: `${percentageData.rewardsCollectedPerc}%` }}
                ></div>
              </div>
              <h4 className="perc prog-reward">{`${percentageData.rewardsCollectedPerc}%`}</h4>
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
                  style={{ width: `${percentageData.streakUnsuccessfulPerc}%` }}
                ></div>
              </div>
              <h4 className="perc prog-unsucc">{`${percentageData.streakUnsuccessfulPerc}%`}</h4>
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
                <div className="d-flex task-container">
                  <div className="flex-dir-col summary">
                    <h2>Tasks for today</h2>
                    <h4>
                      You have{" "}
                      <span
                        onClick={() => navigate("/streak-list")}
                        className="color-primary c-pointer"
                      >
                        {taskCount} task
                      </span>{" "}
                      to complete today
                    </h4>
                    <OutlinedPrimaryButton
                      name={"Add New Streak"}
                      click={() => {
                        if (streakCount < plansFeatures[planType].streaks)
                          dialogForCreateAndUpdateStreak(
                            "create",
                            {},
                            "",
                            async (type: string, data: object) => {
                              if (type === "create") {
                                try {
                                  const streak: any = await createStreak({});

                                  if (streak?.error) {
                                    dialogForError(
                                      streak?.error?.data?.error?.message || ""
                                    );
                                  } else {
                                    if (
                                      isSame(streak?.data?.dateFrom, Date.now())
                                    ) {
                                      const streadDetail = {
                                        date: streak?.data?.dateFrom,
                                        streakId: streak?.data._id,
                                        rewards: [],
                                      };
                                      try {
                                        const streakDetail: any =
                                          await createStreakDetail(
                                            streadDetail
                                          );
                                        if (streakDetail?.error) {
                                          dialogForError(
                                            streakDetail?.error?.data?.error
                                              ?.message || ""
                                          );
                                        }
                                      } catch (error) {}
                                    }
                                  }
                                } catch (error) {}
                              }
                            }
                          );
                        else dialogForUpgrade(navigate);
                      }}
                      btnContainerClass="add-btn"
                      btnClass="h-40"
                    />
                  </div>

                  <div
                    className={
                      taskCount === 0
                        ? "d-flex streaks center-items"
                        : "d-flex streaks"
                    }
                  >
                    {streakCardJsx(streakList || [])}
                  </div>
                </div>
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
