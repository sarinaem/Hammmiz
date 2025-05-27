import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const axiosApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
});

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate();
    // No Response(netError)
    if (error.response === undefined && originalRequest._retry === true) {
      return;
    } else if (error.response === undefined && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosApiInstance(originalRequest);
    }

    // 401 --> (Refresh_token)
    else if (error.response.status === 401 && !originalRequest._retry) {
      localStorage.clear();
      return navigate('/login');

      // 500 --> (Server Internal Error)
    } else if (error.response.status === 500 && originalRequest._retry) {
      console.log('error', 'Internal server error Please try again later.');
    } else if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosApiInstance(originalRequest);

      // 404
    } else if (error.response.status === 404) {
      console.log('warning', 'Server not found');

      // >500
    } else if (error.response.status > 500 && originalRequest._retry) {
      console.log('error', 'Server error Please try again later');
    } else if (error.response.status > 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosApiInstance(originalRequest);

      // 400
    } else if (error.response.status === 400) {
      console.log('error', 'Please try again later.');
    } else if (error.response.status === 403) {
      console.log('error', 'Forbidden !!.');
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
