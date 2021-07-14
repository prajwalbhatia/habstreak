import { combineReducers } from "redux";

import streak from "./streak";
import reward from "./reward";

export default combineReducers({
    streak,
    reward
})