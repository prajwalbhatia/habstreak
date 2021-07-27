import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//STREAK
export const getRewards = () => API.get('/reward');
export const deleteReward = (id) => API.delete(`/reward/${id}`);
export const updateReward = (reward, id) => API.patch(`/reward/${id}`, reward);
export const createReward = (reward) => API.post('/reward', reward);