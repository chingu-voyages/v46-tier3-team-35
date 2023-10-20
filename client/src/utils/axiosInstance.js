import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get token from local storage
    const token = localStorage.getItem("accessToken");

    // If the token exists, set it in the header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await axios.post("users/refresh");
      localStorage.setItem("accessToken", data.accessToken);
      console.log("refresh successful");

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
