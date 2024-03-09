import moment from "moment";
import { isSameOrAfter, isSameOrBefore } from "Utilities";
import { StreakListInterface } from "../constants/dashboard.interfaces";

export const navigateToStreakList = (navigate: any, goTo: string = "") => {
  navigate("/streak-list", { state: { goTo } });
};

export const navigateToRewardList = (navigate: any, goTo: string = "") => {
  navigate("/reward-list", { state: { goTo } });
};

export const navigateToRecentActivities = (navigate: any) => {
  navigate("/recent-activities");
};

export const navigateToStreak = (
  e: any,
  navigate: any,
  id: string,
  from: string
) => {
  e.stopPropagation();
  navigate(`/streak/${id}`, {
    state: { from },
  });
};

export const activeStreaks = (streakList: StreakListInterface[]) => {
  const currentDate = moment().format();

  const activeStreaks = streakList.filter((streak: StreakListInterface) => {
    if (
      (isSameOrBefore(streak.dateFrom, currentDate) ||
        isSameOrAfter(streak.dateTo, currentDate)) &&
      !streak.tag
    ) {
      return streak;
    } else return null;
  });

  return activeStreaks || [];
};
