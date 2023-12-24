import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  // withCredentials: true,
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      console.error(
        "Server responded with a 400 Bad Request error:",
        error.response.data
      );
      console.log(
        "Server responded with a 400 Bad Request error:",
        error.response.data
      );
    }
    return Promise.reject(error);
  }
);

export default instance;
