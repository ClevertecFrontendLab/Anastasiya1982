import axios from 'axios';

const config = {
  baseURL: 'https://strapi.cleverland.by/api/',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
};

// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });

// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await axios.get('http://localhost:5000/api/refresh', { withCredentials: true });
//         localStorage.setItem('token', response.data.accessToken);
//         return api.request(originalRequest);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     throw error;
//   }
// );

export const axiosInstance = axios.create(config);

