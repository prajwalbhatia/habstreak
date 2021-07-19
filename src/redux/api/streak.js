import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getStreaks = () => API.get('/streak');
export const deleteStreak = (id) => API.delete(`/streak/${id}`);
export const updateStreak = (streak , id) => API.patch(`/streak/${id}` , streak);
export const createStreak = (streak) => API.post('/streak' , streak);