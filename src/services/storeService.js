import axiosInstance from "../api/axiosConfig";

// Get all stores
export const getAllStores = () => {
    return axiosInstance.get("/stores");
};

// Get store by ID
export const getStoreById = (id) => {
    return axiosInstance.get(`/stores/${id}`);
};

// Get products of a store
export const getStoreProducts = (storeId) => {
    return axiosInstance.get(`/stores/${storeId}/products`);
};

// Add store
export const addStore = (store) => {
    return axiosInstance.post("/stores", store);
};

// Update store
export const updateStore = (id, store) => {
    return axiosInstance.put(`/stores/${id}`, store);
};

// Delete store
export const deleteStore = (id) => {
    return axiosInstance.delete(`/stores/${id}`);
};