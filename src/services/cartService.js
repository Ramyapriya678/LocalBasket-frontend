import axiosInstance from "../api/axiosConfig";


// Add item to cart
export const addToCart = (userId, storeProductId, quantity) => {

    return axiosInstance.post(
        "/cart/add",
        null,
        {
            params: {
                userId,
                storeProductId,
                quantity
            }
        }
    );

};


// Get cart by user id
export const getCart = (userId) => {

    return axiosInstance.get(
        `/cart/${userId}`
    );

};


// Update cart item quantity
export const updateCartItem = (cartItemId, quantity) => {

    return axiosInstance.put(
        `/cart/update/${cartItemId}`,
        null,
        {
            params: {
                quantity
            }
        }
    );

};


// Remove cart item
export const removeCartItem = (cartItemId) => {

    return axiosInstance.delete(
        `/cart/remove/${cartItemId}`
    );

};