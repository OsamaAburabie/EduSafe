import axios from 'axios';
import {storage} from '../context/MainContextProvider';
const DEVURL = 'http://192.168.1.67:5000';
const PRODURL = 'http://edusafe.ddns.net';
export const baseURL = PRODURL;
const instance = axios.create({baseURL});

instance.interceptors.request.use(function (config) {
  const token = storage.getString('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
