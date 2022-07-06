import { combineReducers } from "redux";

import streak from "./streak";
import reward from "./reward";
import user from "./user";
import recentActivities from './recentActivities';
import support from './support';

const allReducers = combineReducers({
    streak,
    reward,
    user,
    recentActivities,
    support
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
   return allReducers(state , action);
}

export default rootReducer;