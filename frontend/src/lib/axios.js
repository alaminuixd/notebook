import axios from "axios";

// in production we don't have "localhost"
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://notebook-6mda.onrender.com/api"
    : "/api";

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export default axiosApi;

/* import axios from "axios";

// in production we don't have "localhost"
const BASE_URL =
  import.meta.env.MODE === "production" ? "http://localhost:3001/api" : "/api";

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export default axiosApi; */
