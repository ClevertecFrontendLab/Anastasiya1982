import axios from 'axios';

const config = {
  baseURL: 'https://strapi.cleverland.by/api/',
  headers: {
    'Content-type': 'application/json',   
  },
};

export const axiosInstance = axios.create(config);
