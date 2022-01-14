import { combineReducers } from "redux";

import streak from "./streak";
import reward from "./reward";
import user from "./user";
import recentActivities from './recentActivities';

export default combineReducers({
    streak,
    reward,
    user,
    recentActivities
})