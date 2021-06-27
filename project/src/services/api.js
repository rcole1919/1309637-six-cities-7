import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const Method = {
  POST: 'post',
  GET: 'get',
}

export const api = axios({
  method: Method.GET,
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});
