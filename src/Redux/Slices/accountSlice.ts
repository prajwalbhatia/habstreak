import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Axios/axiosBaseQuery";

const accountURL = "/user";

export const AccountSlice = createApi({
  reducerPath: "account",
  baseQuery: axiosBaseQuery,
  tagTypes: ["GetUserData"],
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (body) => ({ url: accountURL, method: "POST", body }),
    }),
    signin: builder.mutation({
      query: (body) => ({ url: `${accountURL}/signin`, method: "POST", body }),
    }),
    signup: builder.mutation({
      query: (body) => ({ url: `${accountURL}/signup`, method: "POST", body }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/verifyEmail`,
        method: "POST",
        body,
      }),
    }),
    resendOtp: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/resendOtp`,
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/refreshToken`,
        method: "POST",
        body,
      }),
    }),
    checkUserExist: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/check`,
        method: "POST",
        body,
      }),
    }),
    checkUserExistFromGoogle: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/checkFromGoogle`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/logout`,
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query({
      query: ({email}) => ({ url: `${accountURL}/${email}`, method: "GET" }),
      providesTags: ["GetUserData"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `${accountURL}/${body?.email}`,
        method: "PATCH",
        body : body?.userData,
      }),
      invalidatesTags : ['GetUserData']
    }),
  }),
});

export const {
  useAuthMutation,
  useSigninMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useCheckUserExistMutation,
  useCheckUserExistFromGoogleMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation
} = AccountSlice;

export default AccountSlice.reducer;
