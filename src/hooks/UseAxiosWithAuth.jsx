import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAxiosWithAuth = () => {
  const { accessToken, refreshAccessToken, logout } = useContext(AuthContext);

  const axiosInstance = axios.create({}); 

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();
        console.log(newToken)
        if (newToken) {
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config); 
        } else {
          // logout(); 
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
