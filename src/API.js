import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
  });

// Add a request interceptor to set content type headers
axios.interceptors.request.use(function (config) {
  const headers = "application/json"
  config.headers['Content-Type'] =  headers;

  return config;
});