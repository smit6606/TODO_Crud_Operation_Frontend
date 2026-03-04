import axios from "axios";

// Centrally located Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Endparts (Routes)
export const ENDPOINTS = {
  AUTH: "/auth",
  TASK: "/task",
  USER: "/user",
};

// Configured Axios Instances
export const authApi = axios.create({
  baseURL: `${API_BASE_URL}${ENDPOINTS.AUTH}`,
  headers: { "Content-Type": "application/json" },
});

export const todoApi = axios.create({
  baseURL: `${API_BASE_URL}${ENDPOINTS.TASK}`,
  headers: { "Content-Type": "application/json" },
});

export const userApi = axios.create({
  baseURL: `${API_BASE_URL}${ENDPOINTS.USER}`,
  headers: { "Content-Type": "application/json" },
});

// ==========================================
// AUTHENTICATION APIs
// ==========================================
export const registerUserAPI = async (formData: FormData) => {
  return await authApi.post("/register", formData);
};

export const loginUserAPI = async (data: Record<string, string>) => {
  return await authApi.post("/login", data);
};

export const forgotPasswordAPI = async (data: Record<string, string>) => {
  return await authApi.post("/forgot-password/send-otp", data);
};

export const verifyOtpAPI = async (data: Record<string, string>) => {
  return await authApi.post("/forgot-password/verify-otp", data);
};

export const resetPasswordAPI = async (data: Record<string, string>) => {
  return await authApi.post("/forgot-password/reset-password", data);
};

export const changePasswordAPI = async (
  data: Record<string, string>,
  token: string,
) => {
  return await userApi.put("/change-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ==========================================
// TODO / TASK APIs
// ==========================================
export const fetchTodosAPI = async (
  token: string,
  priority?: string,
  status?: string,
) => {
  let url = "/";
  const params = new URLSearchParams();
  if (priority && priority !== "All") params.append("priority", priority);
  if (status && status !== "All") params.append("status", status);
  if (params.toString()) url += `?${params.toString()}`;

  return await todoApi.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTodoAPI = async (
  data: Record<string, string>,
  token: string,
) => {
  return await todoApi.post("/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTodoAPI = async (
  id: number,
  data: Record<string, string>,
  token: string,
) => {
  return await todoApi.put(`/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTodoAPI = async (id: number, token: string) => {
  return await todoApi.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ==========================================
// USER APIs
// ==========================================
export const fetchAllUsersAPI = async (token: string) => {
  return await userApi.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfileAPI = async (formData: FormData, token: string) => {
  return await axios.put(`${API_BASE_URL}${ENDPOINTS.USER}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

// Live fetch profile for auto fill
export const fetchProfileAPI = async (token: string) => {
  return await userApi.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteAccountAPI = async (token: string) => {
  return await userApi.delete("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
