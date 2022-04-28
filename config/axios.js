import axios from 'axios';
export const baseURL = 'http://192.168.1.67:5000';
const instance = axios.create({baseURL});
export default instance;
