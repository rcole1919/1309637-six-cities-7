import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;


export const api = axios({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});
