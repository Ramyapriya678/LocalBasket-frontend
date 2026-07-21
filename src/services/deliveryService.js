import axiosInstance from "../api/axiosConfig";


// Get delivery by order id (Customer tracking)
export const getDeliveryByOrderId = (orderId) => {

    return axiosInstance.get(
        `/deliveries/order/${orderId}`
    );

};



// Get all deliveries (Admin)
export const getAllDeliveries = () => {

    return axiosInstance.get(
        "/deliveries"
    );

};



// Get deliveries by delivery partner
export const getDeliveriesByPartner = (deliveryPartnerId) => {

    return axiosInstance.get(
        `/deliveries/partner/${deliveryPartnerId}`
    );

};



// Assign delivery partner to order
export const assignDelivery = (deliveryData) => {

    return axiosInstance.post(
        "/deliveries/assign",
        deliveryData
    );

};



// Update delivery status
export const updateDeliveryStatus = (
    deliveryId,
    status
) => {

    return axiosInstance.put(
        `/deliveries/${deliveryId}/status`,
        null,
        {
            params: {
                status
            }
        }
    );

};



// Update live location
export const updateDeliveryLocation = (
    deliveryId,
    latitude,
    longitude
) => {

    return axiosInstance.put(
        `/deliveries/${deliveryId}/location`,
        null,
        {
            params: {
                latitude,
                longitude
            }
        }
    );

};



// Delete delivery
export const deleteDelivery = (deliveryId) => {

    return axiosInstance.delete(
        `/deliveries/${deliveryId}`
    );

};