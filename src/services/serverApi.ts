import axios from 'axios';

const dev = 'http://localhost:8080';
const prod = process.env.SERVER_API || 'https://trainya-app-api.herokuapp.com/';

export const serverApi = axios.create({
  baseURL: dev,
});