import axios from 'axios';

const dev = 'http://localhost:8080';
const prod = process.env.SERVER_API;

export const serverApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? dev : prod,
});
