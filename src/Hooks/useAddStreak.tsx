import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { plansFeatures } from "Constants";
import useGetPlanType from "./useGetPlanType";
import {
  dialogForCreateAndUpdateStreak,
  dialogForUpgrade,
  isSame,
} from "Utilities";

import {
  useCreateStreakMutation,
  useGetStreaksQuery,
} from "../Redux/Slices/streakSlice";
import { useCreateStreakDetailMutation } from "../Redux/Slices/streakDetailSlices";

const useAddStreak = () => {
  const [streakCount, setStreakCount] = useState<number>(0);
  const planType = useGetPlanType();
  const navigate = useNavigate();

  const [createStreak, { isSuccess, isLoading: createStreakLoading, isError }] =
    useCreateStreakMutation();

  const {
    data: streaks,
    isLoading: getStreaksLoading,
    isFetching: getStreaksFetching,
  } = useGetStreaksQuery({});

  const [createStreakDetail] = useCreateStreakDetailMutation();

  useEffect(() => {
    if (streaks) setStreakCount(streaks?.length || 0);
  }, [streaks]);

  const handleAddStreak = () => {
    if (streakCount < plansFeatures[planType].streaks)
      dialogForCreateAndUpdateStreak(
        "create",
        {},
        "",
        async (type: string, data: object) => {
          if (type === "create") {
            try {
              const streak: any = await createStreak(data);
              if (isSame(streak?.data?.dateFrom, Date.now())) {
                const streadDetail = {
                  date: streak?.data?.dateFrom,
                  streakId: streak?.data._id,
                  rewards: [],
                };
                try {
                  await createStreakDetail(streadDetail);
                } catch (error) {}
              }
            } catch (error) {}
          }
          return;
        }
      );
    else dialogForUpgrade(navigate);
  };

  return {
    addStreak: () => handleAddStreak(),
    createStreakLoading,
    streaks,
    getStreaksLoading,
    getStreaksFetching,
  };
};

export default useAddStreak;
