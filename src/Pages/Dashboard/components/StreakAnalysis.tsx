import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetStreaksQuery } from "../../../Redux/Slices/streakSlice";
import { useGetRewardsQuery } from "../../../Redux/Slices/rewardSlice";

import {
  navigateToRewardList,
  navigateToStreakList,
} from "../helpers/dashboard.helpers";
import {
  RewardInterface,
  StreakInterface,
} from "../constants/dashboard.interfaces";
import ProgressCard from "./ProgressCard";
import { Skeleton } from "@mui/material";

const StreakAnalysis = () => {
  const navigate = useNavigate();
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
    isFetching: streakListFetching,
    refetch: streakRefetch,
  } = useGetStreaksQuery({});

  const { data: rewardList, isLoading: rewardListLoading } = useGetRewardsQuery(
    {}
  );

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

      const successfulStreakPercentage =
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
        streakSuccess: successfulStreakPercentage,
        streakCompleted: successfulStreak,
        rewardsCollectedPercentage: rewardsCollectedPercentage,
        rewardsCollected,
        streakUnsuccessfulPercentage,
        streakUnsuccessful,
      });
    }
  }, [streakList, rewardList]);

  return (
    <>
      <div className="d-flex header-data">
        <h2>Analysis</h2>
      </div>

      <div className="d-flex progress-container">
        {streakListLoading || streakListFetching ? (
          Array(3)
            .fill(1)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                className="progress-card-skeleton"
              />
            ))
        ) : (
          <>
            <ProgressCard
              title="Streak Successful"
              iconClass="title-icon-succ"
              percentageData={percentageData.streakSuccess}
              count={percentageData.streakCompleted}
              onClick={() => navigateToStreakList(navigate, "Finished")}
              icon="streak"
              type="succ"
            />

            <ProgressCard
              title="Reward Collected"
              iconClass="title-icon-reward"
              percentageData={percentageData.rewardsCollectedPercentage}
              count={percentageData.rewardsCollected}
              onClick={() => {
                navigateToRewardList(navigate, "Earned");
              }}
              icon="reward"
              type="reward"
            />

            <ProgressCard
              title="Streak Unsuccessful"
              iconClass="title-icon-unsuccessful"
              percentageData={percentageData.streakUnsuccessfulPercentage}
              count={percentageData.streakUnsuccessful}
              onClick={() => navigateToStreakList(navigate, "Unfinished")}
              icon="streak"
              type="unsuccessful"
            />
          </>
        )}
      </div>
    </>
  );
};

export default StreakAnalysis;
