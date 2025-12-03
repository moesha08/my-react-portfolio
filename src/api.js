import axios from "axios";

// =========================
// BACKEND BASE URL
// =========================

// Local testing:
export const API_BASE = "http://localhost:5000/api";

// Deployment (Render):
// export const API_BASE = "https://portfolio-backend-edky.onrender.com/api";

const api = axios.create({ baseURL: API_BASE });

/* =============================
    AUTH
============================= */
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);

/* Attach token to all protected requests */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("portfolio_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* =============================
    USERS CRUD
============================= */
export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

/* =============================
    PROJECTS CRUD
============================= */
export const getProjects = () => api.get("/projects");
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

/* =============================
    SERVICES CRUD
============================= */
export const getServices = () => api.get("/services");
export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

/* =============================
    CONTACTS CRUD
============================= */
export const getContacts = () => api.get("/contacts");
export const createContact = (data) => api.post("/contacts", data);
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

export default api;
