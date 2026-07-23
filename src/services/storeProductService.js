import axiosInstance from "../api/axiosConfig";


// Add product to store
export const addStoreProduct = (storeProduct) => {

    return axiosInstance.post(
        "/store-products",
        storeProduct
    );

};


// Get products by store
export const getProductsByStore = (storeId) => {

    return axiosInstance.get(
        `/store-products/store/${storeId}`
    );

};


// Get all store products
export const getAllStoreProducts = () => {

    return axiosInstance.get(
        "/store-products"
    );

};


// Get store product by id
export const getStoreProductById = (id) => {

    return axiosInstance.get(
        `/store-products/${id}`
    );

};


// Update store product
export const updateStoreProduct = (id, data) => {

    return axiosInstance.put(
        `/store-products/${id}`,
        data
    );

};


// Delete store product
export const deleteStoreProduct = (id) => {

    return axiosInstance.delete(
        `/store-products/${id}`
    );

};