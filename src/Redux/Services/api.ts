import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({
    // Define your API endpoints here
  }),
});

// export const { useQuery } = api;
// export const { useMutation } = api;
