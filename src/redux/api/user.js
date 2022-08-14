import axios from 'axios';
import { urls } from "constants/index";

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

//USER
export const createUser = (user) => API.post('/user', user);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const verifyEmail = (data) => API.post('/user/verifyEmail', data);
export const resendOtp = (data) => API.post('/user/resendOtp' , data);

export const refreshToken = (refreshToken) => API.post('/user/refreshToken', refreshToken);
