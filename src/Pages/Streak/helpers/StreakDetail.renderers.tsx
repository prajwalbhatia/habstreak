import moment from "moment";
import {
  dialogForCreateAndUpdateStreak,
  dialogForError,
  isAfter,
  isSame,
} from "Utilities";

export const updateStreakFun = (streak: any, updateStreak: any) => {
  if (streak?.tag !== "unfinished")
    dialogForCreateAndUpdateStreak(
      "update",
      streak,
      streak._id,
      async (_, data: any) => {
        const updatedStreak: any = await updateStreak({
          updatedVal: { description: data?.description, title: data?.title },
          streakId: streak._id,
        });

        if (updatedStreak?.error) {
          dialogForError(updatedStreak?.error?.data?.error?.message || "");
        } else {
          // refetch && refetch();
        }
      }
    );
};

export const checkingStatus = (date: any) => {
  let status = "";
  if (isSame(date, moment().format())) status = "Active";
  else if (isAfter(date, moment().format())) status = "Upcoming";
  else status = "Past";
  return status;
};

export const checkingStatusForStreak = (date: any) => {
  let status = "";
  if (isSame(date, moment().format())) status = "Active";
  else if (isAfter(date, moment().format())) status = "Upcoming";
  else status = "Active";
  return status;
};
