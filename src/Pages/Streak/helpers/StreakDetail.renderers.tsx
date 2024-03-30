import moment from "moment";
import {
  isAfter,
  isSame,
} from "Utilities";

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
