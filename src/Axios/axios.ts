import { urls } from "Constants";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const BASE_URL = urls.dev;
const axiosObject = axios.create({ baseURL: BASE_URL });

axiosObject.interceptors.request.use(
  async (req) => {
    if (localStorage.getItem("profile")) {
      const user = JSON.parse(localStorage.getItem("profile") || "");
      if (user?.result?.fromGoogle) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile") || "").token
        }`;
      } else {
        let currentDate = new Date();
        const decodeToken = jwtDecode(user.token);
        if (decodeToken.exp && decodeToken.exp * 1000 < currentDate.getTime()) {
          // const data  = await refreshToken({ refreshToken: user.refreshToken });
          const data = await axios.post("/user/refreshToken", {
            refreshToken: user.refreshToken,
          });
          localStorage.setItem("profile", JSON.stringify({ data }));
          // storeRefreshToken(data);
          req.headers.Authorization = data?.data && data?.data?.token && `Bearer ${data?.data?.token}`;
        } else {
          req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile") || "").token
          }`;
        }
      }
    }
    return req;
  },
  (error) => {
    console.log("INTERSEPTOR ERROR", error);
  }
);

// axiosObject.interceptors.response.use(
//   (response) => {

//   },
//   (error) => {

// );

export default axiosObject;
