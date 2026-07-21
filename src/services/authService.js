import axiosInstance from "../api/axiosConfig";

export const registerUser = (user) => {
    return axiosInstance.post("/auth/register", user);
};

export const loginUser = (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
};