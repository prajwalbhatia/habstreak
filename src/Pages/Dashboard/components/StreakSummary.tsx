import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Skeleton } from "@mui/material";

import { OutlinedPrimaryButton } from "Components/buttons/buttons";

import { icons, plansFeatures, theme } from "Constants/index";
import {
  dialogForUpgrade,
  dialogForCreateAndUpdateStreak,
  isSame,
  dialogForError,
  isSameOrBefore,
  isSameOrAfter,
  perPerDay,
} from "Utilities";

import {
  useCreateStreakMutation,
  useGetStreaksQuery,
} from "../../../Redux/Slices/streakSlice";
import { useCreateStreakDetailMutation } from "../../../Redux/Slices/streakDetailSlices";
import useGetPlanType from "Hooks/useGetPlanType";

import {
  StreakInterface,
  StreakListInterface,
} from "../constants/dashboard.interfaces";
import {
  navigateToStreak,
  navigateToStreakList,
} from "../helpers/dashboard.helpers";

const StreakSummary = () => {
  const navigate = useNavigate();

  const [taskCount, setTaskCount] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);
  const planType = useGetPlanType();

  const [createStreak, { isLoading: createStreakLoading }] =
    useCreateStreakMutation();

  const [createStreakDetail] = useCreateStreakDetailMutation();

  const {
    data: streakList,
    isLoading: streakListLoading,
    isFetching: streakListFetching,
    refetch: streakRefetch,
  } = useGetStreaksQuery({});

  useEffect(() => {
    if (streakList && streakList.length) {
      const currentDate = moment().format();

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
          if (moment(streak.dateFrom).isSameOrBefore(currentDate)) {
            return streak;
          }
          return null;
        }
      );

      setStreakCount(streakList.length);

      setTaskCount(filterStreaks.length);
    }
  }, [streakList]);

  const streakCardJsx = useCallback(
    (streakList: StreakListInterface[]) => {
      const currentDate = moment().format();
      //Streaks that are article currently or will become active in future (i.e upcoming)
      //Finished and unfinished streak will be excluded
      const running = streakList.filter((streak: StreakListInterface) => {
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
          (streak: StreakListInterface, index: number) => {
            if (index <= 2 && isSameOrBefore(streak.dateFrom, currentDate))
              return streak;
          }
        );
        if (filterStreaks.length > 0) {
          return filterStreaks.map(
            (streak: StreakListInterface, index: number) => {
              if (streak.tag !== "unfinished") {
                const { dateFrom, dateTo, _id } = streak;
                const todayDate = moment(new Date());
                const percentagePerDay = perPerDay(dateFrom, dateTo);

                const daysDone = isSame(todayDate, dateFrom)
                  ? 0
                  : todayDate.diff(dateFrom, "days");
                const progress = percentagePerDay * daysDone;
                return (
                  <div
                    key={index}
                    className="flex-dir-col streak-card"
                    onClick={(e) =>
                      navigateToStreak(e, navigate, _id, "Dashboard")
                    }
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
            }
          );
        } else {
          return <h2>No Current Tasks</h2>;
        }
      } else {
        return <h2>No Current Tasks</h2>;
      }
    },
    [streakList]
  );

  const addNewStreak = () => {
    if (streakCount < plansFeatures[planType].streaks)
      dialogForCreateAndUpdateStreak(
        "create",
        {},
        "",
        async (type: string, data: object) => {
          if (type === "create") {
            try {
              const streak: any = await createStreak(data);

              if (streak?.error) {
                dialogForError(streak?.error?.data?.error?.message || "");
              } else {
                if (isSame(streak?.data?.dateFrom, Date.now())) {
                  const newStreak = {
                    date: streak?.data?.dateFrom,
                    streakId: streak?.data._id,
                    rewards: [],
                  };
                  try {
                    const streakDetail: any = await createStreakDetail(
                      newStreak
                    );
                    if (streakDetail?.error) {
                      dialogForError(
                        streakDetail?.error?.data?.error?.message || ""
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
  };

  return (
    <div className="d-flex task-container">
      <div className="flex-dir-col summary">
        <h2>Tasks for today</h2>

        {createStreakLoading || streakListLoading || streakListFetching ? (
          <Skeleton variant="text" sx={{ minWidth: 150, minHeight: 40 }} />
        ) : (
          <h4>
            You have{" "}
            <span
              onClick={() => navigateToStreakList(navigate)}
              className="color-primary c-pointer"
            >
              {taskCount} task
            </span>{" "}
            to complete today
          </h4>
        )}

        <OutlinedPrimaryButton
          name={"Add New Streak"}
          click={addNewStreak}
          btnContainerClass="add-btn"
          btnClass="h-40"
          loading={
            createStreakLoading || streakListLoading || streakListFetching
          }
        />
      </div>

      <div
        className={
          taskCount === 0 ? "d-flex streaks center-items" : "d-flex streaks"
        }
      >
        {createStreakLoading || streakListLoading || streakListFetching
          ? Array(
              createStreakLoading
                ? Math.min(streakList?.length + 1 || 1, 3)
                : streakList?.length || 1
            )
              .fill(1)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  className="streak-card-skeleton"
                />
              ))
          : streakCardJsx(streakList || [])}
      </div>
    </div>
  );
};

export default StreakSummary;