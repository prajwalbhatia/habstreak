import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";

const SendSupportMessageURL =
  "/support/write-message";

export const SendSupportMessageSlice = createApi({
  reducerPath: "sendSupportMessage",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    sendSupportMessage: builder.mutation({
      query: (body) => ({ url: SendSupportMessageURL, method: "POST", body }),
    }),
  }),
});

export const { useSendSupportMessageMutation } = SendSupportMessageSlice;

export default SendSupportMessageSlice.reducer;
