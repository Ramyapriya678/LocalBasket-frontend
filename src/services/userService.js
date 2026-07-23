import axiosInstance from "../api/axiosConfig";

// Get all users
export const getAllUsers = () => {
    return axiosInstance.get("/users");
};

// Get user by ID
export const getUserById = (id) => {
    return axiosInstance.get(`/users/${id}`);
};

// Update user
export const updateUser = (id, user) => {
    return axiosInstance.put(`/users/${id}`, user);
};

// Delete user
export const deleteUser = (id) => {
    return axiosInstance.delete(`/users/${id}`);
};