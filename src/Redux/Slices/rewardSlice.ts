import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";
import { RecentActivitiesSlice } from "./recentActivitiesSlice";
import { StreakSlice } from "./streakSlice";

const rewardURL = "/reward";

export const RewardSlice = createApi({
  reducerPath: "reward",
  baseQuery: axiosBaseQuery,
  tagTypes: ['GetRewards'],
  endpoints: (builder) => ({
    createReward: builder.mutation({
      query: (body) => ({ url: rewardURL, method: "POST", body }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(['GetActivities'])
          );
        });
      },
    }),
    getRewards: builder.query({
      query: () => ({ url: rewardURL, method: "GET" }),
      providesTags: ['GetRewards'],
    }),
    updateReward: builder.mutation({
      query: (body) => ({
        url: `${rewardURL}/${body?.rewardId}`,
        method: "PATCH",
        body : body?.rewardObj
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(['GetActivities'])
          );

          api.dispatch(
            StreakSlice.util.invalidateTags(['GetStreak'])
          );
        });
      },
      invalidatesTags: ['GetRewards'],
    }),
    deleteReward: builder.mutation({
      query: (id) => ({
        url: `${rewardURL}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(arg, api) {
        api.queryFulfilled.then(() => {
          api.dispatch(
            RecentActivitiesSlice.util.invalidateTags(['GetActivities'])
          );
        });
      },
      invalidatesTags: ['GetRewards'],
    }),
    deleteRewardBulk: builder.mutation({
        query: (body) => ({
          url: `${rewardURL}/${body?.id}/bulk`,
          method: "DELETE",
        }),
        onQueryStarted(arg, api) {
          api.queryFulfilled.then(() => {
            api.dispatch(
              RecentActivitiesSlice.util.invalidateTags(['GetActivities'])
            );
          });
        },
        invalidatesTags: ['GetRewards'],
      }),
  }),
});

export const { useCreateRewardMutation , useDeleteRewardMutation , useGetRewardsQuery , useUpdateRewardMutation } = RewardSlice;

export default RewardSlice.reducer;