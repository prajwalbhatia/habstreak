import { configureStore } from "@reduxjs/toolkit";
import { SendSupportMessageSlice } from "../../Redux/Slices/sendSupportMessageSlice";
import { AccountSlice } from "../../Redux/Slices/accountSlice";
import { PaymentSlice } from "../../Redux/Slices/paymentSlice";
import { RecentActivitiesSlice } from "../../Redux/Slices/recentActivitiesSlice";
import { RewardSlice } from "../../Redux/Slices/rewardSlice";
import { StreakDetailSlice } from "../../Redux/Slices/streakDetailSlices";
import { StreakSlice } from "../../Redux/Slices/streakSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blackList: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(SendSupportMessageSlice.middleware)
      .concat(AccountSlice.middleware)
      .concat(PaymentSlice.middleware)
      .concat(RecentActivitiesSlice.middleware)
      .concat(RewardSlice.middleware)
      .concat(StreakDetailSlice.middleware)
      .concat(StreakSlice.middleware),
});

export default store;
