import axios from "axios";

// ✅ connect frontend to backend
const API = axios.create({
  baseURL: "http://localhost:5000",
});

// ✅ Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Login request
async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user || {}));
  }
  return res.data;
}

// ✅ export
const apiService = {
  ...API,
  login,
};
export default apiService;
