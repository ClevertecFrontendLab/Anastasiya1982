import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/',
  withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
});

// axiosInstance.interceptors.request.use(() => {
//    const token = localStorage.getItem('token');
//    if (token) {
//          axios.defaults.headers.common.Authorization= `Bearer ${token}`;
//      } else {
//          axios.defaults.headers.common.Authorization = null;
//      }
// //   res.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
// //   return res;
// });
// export function jwtInterceptor() {
//   axiosInstance.interceptors.request.use((request) => {
//     // add auth header with jwt if account is logged in and request is to the api url
//     const account = accountService.accountValue;
//     const isLoggedIn = account?.token;
//     const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

//     if (isLoggedIn && isApiUrl) {
//       request.headers.common.Authorization = `Bearer ${account.token}`;
//     }

//     return request;
//   });
// }

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const req = config;
  req.headers.Authorization = token? `Bearer ${token}`:'';
  return req;
});

export { axiosInstance };
