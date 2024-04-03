import { urls } from "Constants";

import axios from "axios";

import store from "../Redux/Store/store";
import { clearResults } from "../Redux/Slices/clearPersistSlice";

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

      try {
        await axios.post(
          BASE_URL + "user/refreshToken",
          {},
          { withCredentials: true }
        );
        return axiosObject(originalRequest);
      } catch (error: any) {
        if (
          error?.response?.data?.error?.status === 403 &&
          error?.response?.data?.error?.message === "Token is Expired"
        ) {
          localStorage.clear();
          sessionStorage.clear();
          store.dispatch(clearResults());

          window.location.replace(`/account`);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosObject;
