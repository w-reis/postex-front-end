import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-postex.herokuapp.com/',
});

export default api;
