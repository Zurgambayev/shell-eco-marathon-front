// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3050', // замените на ваш базовый URL
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;


// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:3050', // замените на ваш базовый URL
// });

// instance.interceptors.request.use((config) => {
//     const token = window.localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default instance;
