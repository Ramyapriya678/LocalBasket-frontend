import axiosInstance from "../api/axiosConfig";

export const getProductsByStore = (storeId) => {
    return axiosInstance.get(`/store-products/store/${storeId}`);
};