import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export const createSignal = (data) => API.post("/signals", data);
export const getSignals = () => API.get("/signals");
export const getSignalStatus = (id) => API.get(`/signals/${id}/status`);
export const deleteSignal = (id) => API.delete(`/signals/${id}`);
