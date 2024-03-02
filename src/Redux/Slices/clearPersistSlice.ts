import { createSlice } from '@reduxjs/toolkit';

const ClearPersistSlice = createSlice({
  name: 'clear',
  initialState: {
    status: 'idle',
    error: null,
    response: null,
  },
  reducers: {
    clearResults() {},
  },
});

export const { clearResults } = ClearPersistSlice.actions