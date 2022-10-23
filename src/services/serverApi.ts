import axios from 'axios';

const dev = 'http://localhost:8080';
const prod = 'https://trainya-app-p9dqv.ondigitalocean.app/';

export const serverApi = axios.create({
  baseURL: prod,
});
