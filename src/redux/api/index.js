
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { urls } from "constants/index";

import { storeRefreshToken } from "redux/actions/user";

import {
  refreshToken,
} from './user';

const baseUrl = process.env.REACT_APP_ENV === 'development'
  ?
  (window.ReactNativeWebView ? urls.devMob : urls.dev)
  :
  (
    process.env.REACT_APP_ENV === 'pre-production'
      ?
      urls.preProd
      :
      urls.prod
  );

const API = axios.create({ baseURL: baseUrl });


API.interceptors.request.use(async (req) => {
  if (localStorage.getItem('profile')) {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user.result.fromGoogle) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    else {
      let currentDate = new Date();
      const decodeToken = jwt_decode(user.token);
      if (decodeToken.exp * 1000 < currentDate.getTime()) {
        const { data } = await refreshToken({ refreshToken: user.refreshToken });
        storeRefreshToken(data);
        req.headers.Authorization = `Bearer ${data.token}`
      }
      else {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
      }
    }
  }
  return req;
}, (error) => {
  console.log('INTERSEPTOR ERROR', error)
});

//REWARDS
export const getRewards = () => API.get('/reward');
export const deleteReward = (id) => API.delete(`/reward/${id}`);
export const deleteRewardsBulk = (streakId) => API.delete(`/reward/${streakId}/bulk`);
export const updateReward = (reward, id) => API.patch(`/reward/${id}`, reward);
export const createReward = (reward) => API.post('/reward', reward);

//STREAK
export const getStreaks = () => API.get('/streak');
export const getStreak = (id) => API.get(`/streak/${id}`);
export const deleteStreak = (id) => API.delete(`/streak/${id}`);
export const deleteStreakAndReward = (id) => API.delete(`/streak/${id}/deleteAndUpdate`);
export const updateStreak = (streak, id) => API.patch(`/streak/${id}`, streak);
export const createStreak = (streak) => API.post('/streak', streak);

//STREAK DETAILS
export const createStreakDetail = (streakDetail) => API.post('/streakDetail', streakDetail);
export const getStreaksDetail = (id) => API.get(`/streakDetail/${id}`);
export const updateStreakDetail = (streakDetail, id) => API.patch(`/streakDetail/${id}`, streakDetail);
export const deleteStreakDetail = (id) => API.delete(`/streakDetail/${id}`);

//RECENT ACTIVITIES
export const getRecentActivities = () => API.get(`/recentActivities`);

//AUTH
export const logout = (token) => API.post('/user/logout', token);


export const checkUserExist = (data) => API.post('/user/check', data);
export const checkUserExistFromGoogle = (data) => API.post('/user/checkFromGoogle', data);

export const updateUser = (userData, email) => API.patch(`/user/${email}`, userData);
export const getUser = (email) => API.get(`/user/${email}`);

//PAYMAENT
export const paymentRequest = () => API.post('/razorpay');