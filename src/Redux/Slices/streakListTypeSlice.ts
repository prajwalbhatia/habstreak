import { createSlice } from '@reduxjs/toolkit';

const StreakListTypeSlice = createSlice({
  name: 'streakListType',
  initialState: 'Running',
  reducers: {
    storeStreakListType: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeStreakListType } = StreakListTypeSlice.actions;

export default StreakListTypeSlice.reducer;
