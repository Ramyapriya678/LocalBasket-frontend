import axiosInstance from "../api/axiosConfig";


// Customer - Get products by store
export const getProductsByStore = (storeId) => {

    return axiosInstance.get(`/store-products/store/${storeId}`);

};


// Get all products
export const getAllProducts = () => {

    return axiosInstance.get("/products");

};


// Get product by ID
export const getProductById = (id) => {

    return axiosInstance.get(`/products/${id}`);

};


// Admin - Add product
export const addProduct = (product) => {

    return axiosInstance.post("/products", product);

};


// Admin - Update product
export const updateProduct = (id, product) => {

    return axiosInstance.put(`/products/${id}`, product);

};


// Admin - Delete product
export const deleteProduct = (id) => {

    return axiosInstance.delete(`/products/${id}`);

};