import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { SendSupportMessageSlice } from "../../Redux/Slices/sendSupportMessageSlice";
import { AccountSlice } from "../../Redux/Slices/accountSlice";
import { PaymentSlice } from "../../Redux/Slices/paymentSlice";
import { RecentActivitiesSlice } from "../../Redux/Slices/recentActivitiesSlice";
import { RewardSlice } from "../../Redux/Slices/rewardSlice";
import { StrealDetailSlice } from "../../Redux/Slices/streakDetailSlices";
import { StrealSlice } from "../../Redux/Slices/streakSlice";

import authDataReducer from "../../Redux/Slices/authDataStoreSlice";
import streakListTypeReducer from "../../Redux/Slices/streakListTypeSlice";
import searchTextReduer from "../../Redux/Slices/searchTextSlice";

export const reducers = {
  [SendSupportMessageSlice.reducerPath]: SendSupportMessageSlice.reducer,
  [AccountSlice.reducerPath]: AccountSlice.reducer,
  [PaymentSlice.reducerPath]: PaymentSlice.reducer,
  [RecentActivitiesSlice.reducerPath]: RecentActivitiesSlice.reducer,
  [RewardSlice.reducerPath]: RewardSlice.reducer,
  [StrealDetailSlice.reducerPath]: StrealDetailSlice.reducer,
  [StrealSlice.reducerPath]: StrealSlice.reducer,
  authDataStore: authDataReducer,
  streakListType: streakListTypeReducer,
  searchText: searchTextReduer,
};

const appReducer = combineReducers({ ...reducers });

const rootReducer = (state: any, action: any) => {
  console.log('🚀 ~ rootReducer ~ action:', action)
  if (action.type === "clear/clearResults") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem("persist:root");

    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
