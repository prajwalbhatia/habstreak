import axios from 'axios';

const API = axios.create({ baseURL: 'https://habstreak.herokuapp.com/' });
// const API = axios.create({ baseURL: 'http://localhost:5000' });

//USER
export const createUser = (user) => API.post('/user', user);