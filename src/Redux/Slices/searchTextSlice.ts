import { createSlice } from "@reduxjs/toolkit";

const SearchTextSlice = createSlice({
  name: "searchText",
  initialState: "",
  reducers: {
    storeSearchText: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeSearchText } = SearchTextSlice.actions;

export default SearchTextSlice.reducer;
