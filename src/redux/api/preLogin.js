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
export const writeMessage = (messageObj) => API.post('/support/write-message', messageObj);
