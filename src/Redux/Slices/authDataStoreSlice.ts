import { createSlice } from '@reduxjs/toolkit';

const AuthDataStoreSlice = createSlice({
  name: 'authDataStore',
  initialState: null,
  reducers: {
    storeAuthData: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeAuthData } = AuthDataStoreSlice.actions;

export default AuthDataStoreSlice.reducer;
