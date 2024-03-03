import moment from "moment";
import { isAfter, isSameOrAfter, isSameOrBefore } from "Utilities";
import { StreakListInterface } from "../constants/StreakList.interfaces";

export const runningStreaks = (streaks: StreakListInterface[]) => {
  const currentDate = moment().format();
  return [...streaks].filter((streak: StreakListInterface) => {
    if (
      isSameOrBefore(streak.dateFrom, currentDate) &&
      isSameOrAfter(streak.dateTo, currentDate) &&
      !streak.tag
    ) {
      return streak;
    } else return null;
  });
};

export const upcomingStreaks = (streaks: StreakListInterface[]) => {
  const currentDate = moment().format();
  return [...streaks].filter((streak: StreakListInterface) => {
    if (isAfter(streak.dateFrom, currentDate) && !streak.tag) {
      return streak;
    } else return null;
  });
};

export const unfinishedStreaks = (streaks: StreakListInterface[]) => {
  return streaks.filter((streak: StreakListInterface) => streak.tag === "unfinished");
};

export const finishedStreaks = (streaks: StreakListInterface[]) => {
  return streaks.filter((streak: StreakListInterface) => streak.tag === "finished");
};
