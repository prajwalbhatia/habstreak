import { useEffect, useState } from "react";
import moment from "moment";

import { perPerDay } from "Utilities";
import { Skeleton } from "@mui/material";

const StreakPerformanceDetail: React.FC<any> = ({
  streak,
  streakDetail,
  loading,
}) => {
  const [progressData, setProgressData] = useState<any>({
    weekDaysArr: [],
    daysArr: [],
    percentage: 0.0,
    rewards: [],
  });

  useEffect(() => {
    if (streak && streak?.[0]) {
      const { dateFrom, dateTo, days, rewards } =
        streak.length > 0 && streak?.[0];
      const weekDaysArr = [];
      const daysArr = [];
      const perDayPercentage: any = (100 / Number(days)).toFixed(2);
      const daysCompleted =
        streakDetail?.length > 0
          ? streak[0]?.tag === "finished"
            ? streakDetail?.length
            : streakDetail?.length - 1
          : 0;
      const progress = daysCompleted * perDayPercentage;

      for (let i = 0; i < days; i++) {
        let date = moment(dateFrom).add(i, "days").format("D");
        let day = moment(dateFrom).add(i, "days").format("ddd");

        weekDaysArr.push(day);
        daysArr.push(date);
      }

      const modifiedReward =
        rewards &&
        rewards.map((reward: any) => {
          let from = moment(dateFrom);
          let rewardDate = moment(new Date(reward.date));
          const daysDiffOfReward = rewardDate.diff(from, "days") + 1;
          const perDayPercentage = perPerDay(dateFrom, dateTo);
          return {
            percentage: Number(perDayPercentage) * daysDiffOfReward,
            title: reward.title,
            date: rewardDate.format("DD-MM-YYYY"),
          };
        });

      let progressData = {
        weekDaysArr,
        daysArr,
        percentage: progress,
        rewards: modifiedReward || [],
      };

      setProgressData(progressData);
    }
  }, [streak, streakDetail]);

  return (
    <div className="d-flex flex-1 flex-dir-col w-100">
      <div className="d-flex justify-space-between detail-head-container">
        <h3 className="jos-18-primary">Performance</h3>
      </div>

      <div className="progress-data flex-auto mt-20">
        <div className="dates-info">
          <div className="d-flex days">
            {progressData.weekDaysArr.map((day: any, index: any) => {
              return (
                <div key={index}>
                  {loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ width: 50, minHeight: 30 }}
                    />
                  ) : (
                    <span className="rob-med-12-black">{day}</span>
                  )}

                  {loading ? (
                    <div className="d-flex">
                      <Skeleton
                        variant="circular"
                        width={45}
                        height={45}
                        sx={{ marginTop: 2, marginRight: 4 }}
                      />
                    </div>
                  ) : (
                    <div className="d-flex date-circles">
                      <div
                        className="center-items back-circle"
                        style={
                          index <
                          (streak?.[0]?.tag === "finished"
                            ? streakDetail?.length
                            : streakDetail?.length - 1)
                            ? { background: "var(--primaryColor)" }
                            : {}
                        }
                      >
                        <div
                          className="center-items circle"
                          style={
                            index >=
                            (streak?.[0]?.tag === "finished"
                              ? streakDetail?.length
                              : streakDetail?.length - 1)
                              ? {
                                  background: "#E8EEF2",
                                  minWidth: "4rem",
                                  height: "4rem",
                                }
                              : {}
                          }
                        >
                          <span className="rob-med-12-black">
                            {progressData.daysArr[index]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="progress-container">
          <div className="d-flex justify-space-between">
            {loading ? (
              <Skeleton variant="text" sx={{ minWidth: 100, minHeight: 20 }} />
            ) : (
              <span className="rob-med-10-primary">Progress Bar</span>
            )}

            {loading ? (
              <Skeleton variant="text" sx={{ minWidth: 100, minHeight: 20 }} />
            ) : (
              <span className="rob-med-10-primary">
                {progressData?.percentage > 100
                  ? "100% done"
                  : `${progressData?.percentage?.toFixed(2)}% done`}
              </span>
            )}
          </div>

          {loading ? (
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={40}
              sx={{ marginTop: 2, borderRadius: 4 }}
            />
          ) : (
            <div className="prgress-slider">
              <div
                className="inner-slider"
                style={{ width: `${progressData.percentage}%` }}
              >
                {streakDetail?.length >= 2 && (
                  <i className="demo-icon icon-streak" />
                )}
              </div>

              {progressData.rewards.length > 0 ? (
                progressData.rewards.map((reward: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="center-items trophy-container"
                      style={{ left: `calc(${reward.percentage}% - 3rem)` }}
                    >
                      <div className="title reward-info ">
                        <span className="rob-med-10-primary">
                          {reward.date}
                        </span>
                        <span className="rob-med-10-primary reward-title">
                          {reward.title}
                        </span>
                      </div>
                      <i className="demo-icon icon-reward" />
                    </div>
                  );
                })
              ) : (
                <div className="center-items trophy-container-no-hover">
                  <i className="demo-icon icon-flag" />
                </div>
              )}
            </div>
          )}

          <div className="center-items mt-20">
            {loading ? (
              <Skeleton variant="text" sx={{ minWidth: 120, minHeight: 20 }} />
            ) : (
              <span className="rob-med-10-primary">
                {!streak?.[0]?.tag
                  ? "Come On! You can Do It."
                  : streak?.[0]?.tag === "finished"
                  ? "Yay!! You have done it"
                  : "Better Luck next time !!"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakPerformanceDetail;
