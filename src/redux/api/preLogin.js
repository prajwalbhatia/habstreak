import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_ENV === 'development' ? 'http://localhost:5000' : 'https://habstreak.herokuapp.com/' });

// const API = axios.create({ baseURL: process.env.REACT_APP_ENV === 'development' ? 'http://192.168.1.43:5000' : 'https://habstreak.herokuapp.com/' });

//USER
export const writeMessage = (messageObj) => API.post('/support/write-message', messageObj);
