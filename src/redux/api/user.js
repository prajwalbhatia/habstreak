import axios from 'axios';

const API = axios.create({ baseURL: 'https://habstreak.herokuapp.com/' });

//USER
export const createUser = (user) => API.post('/user', user);