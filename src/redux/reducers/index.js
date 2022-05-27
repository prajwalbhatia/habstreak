import { combineReducers } from "redux";

import streak from "./streak";
import reward from "./reward";
import user from "./user";
import recentActivities from './recentActivities';
import support from './support';

export default combineReducers({
    streak,
    reward,
    user,
    recentActivities,
    support
})