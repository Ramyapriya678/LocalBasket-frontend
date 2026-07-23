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


// Customer - Get orders by user
export const getOrdersByUser = (userId) => {
    return axiosInstance.get(
        `/orders/user/${userId}`
    );
};


// Get order by ID
export const getOrderById = (orderId) => {
    return axiosInstance.get(
        `/orders/${orderId}`
    );
};


// Admin - Get all orders
export const getAllOrders = () => {
    return axiosInstance.get(
        "/orders"
    );
};


// Store Owner - Get orders by store
export const getOrdersByStore = (storeId) => {
    return axiosInstance.get(
        `/orders/store/${storeId}`
    );
};


// Update order status
export const updateOrderStatus = (id, status) => {
    return axiosInstance.put(
        `/orders/${id}/status`,
        null,
        {
            params: {
                status
            }
        }
    );
};


// Delete order
export const deleteOrder = (id) => {
    return axiosInstance.delete(
        `/orders/${id}`
    );
};