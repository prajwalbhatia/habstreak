import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dialogForCreateAndUpdateReward,
  dialogForMessage,
  dialogForUpgrade,
} from "Utilities";

import { useGetStreaksQuery } from "../Redux/Slices/streakSlice";

import {
  useCreateRewardMutation,
  useGetRewardsQuery,
} from "../Redux/Slices/rewardSlice";
import { plansFeatures } from "Constants";
import useGetPlanType from "./useGetPlanType";
import useSnackBar from "./useSnackBar";

const useAddReward = () => {
  const navigate = useNavigate();
  const planType = useGetPlanType();
  const { SnackbarComponent, showSnackBar } = useSnackBar();

  const [rewardCount, setRewardCount] = useState<number>(0);

  const [
    createReward,
    { isSuccess: createRewardSuccess, isLoading: createRewardLoading },
  ] = useCreateRewardMutation();

  const {
    data: rewards,
    isLoading: rewardListLoading,
    isFetching: rewardListFetching,
    refetch,
  } = useGetRewardsQuery({});

  useEffect(() => {
    if (rewards) setRewardCount(rewards?.length || 0);
  }, [rewards]);

  useEffect(() => {
    if (createRewardSuccess) {
      showSnackBar("success", "Reward created successfully");
    }
  }, [createRewardSuccess]);

  const {
    data: streaks,
    isLoading: getStreaksLoading,
    isFetching: getStreaksFetching,
  } = useGetStreaksQuery({});

  const handleAddReward = () => {
    const filterStreak = streaks.filter(
      (streak: any) => streak.tag !== "unfinished"
    );

    if (streaks.length === 0) dialogForMessage(navigate);
    else {
      if (rewardCount < plansFeatures[planType].rewards)
        dialogForCreateAndUpdateReward(
          "create",
          {},
          "",
          filterStreak,
          (type: string, data: object) => {
            if (type === "create") {
              createReward(data);
            }
            return;
          }
        );
      else dialogForUpgrade(navigate);
    }
  };
  return {
    addReward: () => handleAddReward(),
    rewards,
    rewardListLoading,
    rewardListFetching,
    createRewardLoading,
    SnackbarComponent
  };
};

export default useAddReward;
