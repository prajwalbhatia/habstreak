import { urls } from "Constants";

import axios from "axios";

const mode = process.env.REACT_APP_API_MODE;
// @ts-ignore
const BASE_URL = urls[mode];
const axiosObject = axios.create({ baseURL: BASE_URL, withCredentials: true });

axiosObject.interceptors.response.use(
  // @ts-ignore
  (response) => {
    return response;
  },
  async (error) => {
    const errorVal = error?.response?.data?.error;
    const originalRequest = error.config;

    if (
      errorVal?.status === 403 &&
      errorVal?.message === "Access token expired. Please re-authenticate." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await axios.post(
        BASE_URL + "user/refreshToken",
        {},
        { withCredentials: true }
      );

      return axiosObject(originalRequest);
    }
    console.log("INTERSEPTOR", error);
    return Promise.reject(error);
  }
);

export default axiosObject;
