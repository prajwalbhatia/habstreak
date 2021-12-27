import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});

//REWARDS
export const getRewards = () => API.get('/reward');
export const deleteReward = (id) => API.delete(`/reward/${id}`);
export const updateReward = (reward, id) => API.patch(`/reward/${id}`, reward);
export const createReward = (reward) => API.post('/reward', reward);

//STREAK
export const getStreaks = () => API.get('/streak');
export const deleteStreak = (id) => API.delete(`/streak/${id}`);
export const updateStreak = (streak, id) => API.patch(`/streak/${id}`, streak);
export const createStreak = (streak) => API.post('/streak', streak);

//STREAK DETAILS
export const createStreakDetail = (streakDetail) => API.post('/streakDetail', streakDetail);
export const getStreaksDetail = (id) => API.get(`/streakDetail/${id}`);
export const updateStreakDetail = (streakDetail, id) => API.patch(`/streakDetail/${id}`, streakDetail);
export const deleteStreakDetail = (id) => API.delete(`/streakDetail/${id}`);
