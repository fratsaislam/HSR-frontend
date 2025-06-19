import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://hsr-backend-1.onrender.com/api",
  withCredentials: true, //pass cookies for like auth
});

export default axiosInstance;
