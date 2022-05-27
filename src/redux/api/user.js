import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_ENV === 'development' ? 'http://localhost:5000' : 'https://habstreak.herokuapp.com/' });

// const API = axios.create({ baseURL: process.env.REACT_APP_ENV === 'development' ? 'http://192.168.1.43:5000' : 'https://habstreak.herokuapp.com/' });

//USER
export const createUser = (user) => API.post('/user', user);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const verifyEmail = (data) => API.post('/user/verifyEmail' , data);

export const refreshToken = (refreshToken) => API.post('/user/refreshToken', refreshToken);
