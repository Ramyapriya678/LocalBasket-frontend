import axiosInstance from "../api/axiosConfig";


// Place order
export const placeOrder = (userId, addressId) => {

    return axiosInstance.post(
        "/orders/place",
        null,
        {
            params: {
                userId,
                addressId
            }
        }
    );

};


// Get orders by user
export const getOrdersByUser = (userId) => {

    return axiosInstance.get(
        `/orders/user/${userId}`
    );

};


// Get order by id
export const getOrderById = (orderId) => {

    return axiosInstance.get(
        `/orders/${orderId}`
    );

};