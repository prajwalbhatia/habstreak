import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_ENV === 'development' ? 'http://localhost:5000' : 'https://habstreak.herokuapp.com/' });

//USER
export const createUser = (user) => API.post('/user', user);