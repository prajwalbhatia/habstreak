import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";

const paymentURL = "/razorpay";

export const PaymentSlice = createApi({
  reducerPath: "payment",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    paymentRequest: builder.mutation({
      query: (body) => ({ url: paymentURL, method: "POST" , body }),
    }),
  }),
});

export const { usePaymentRequestMutation } = PaymentSlice;

export default PaymentSlice.reducer;
