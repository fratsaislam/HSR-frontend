import axios from 'axios';

const axiosPlain = axios.create({
  baseURL: "https://hsr-backend-1.onrender.com/api",
});

export default axiosPlain;
