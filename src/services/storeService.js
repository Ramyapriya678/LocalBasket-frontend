import axiosInstance from "../api/axiosConfig";

export const getAllStores = () => {
    return axiosInstance.get("/stores");
};

export const getStoreProducts = (storeId) => {
    return axiosInstance.get(`/store-products/store/${storeId}`);
};