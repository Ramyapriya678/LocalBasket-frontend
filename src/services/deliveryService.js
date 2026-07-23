import axios from "axios";

const API_URL = "http://localhost:8080/api/deliveries";


const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

};


// Assign Delivery Partner
export const assignDelivery = (data) => {
    return axios.post(
        `${API_URL}/assign`,
        data,
        getAuthHeaders()
    );
};


// Get all deliveries
export const getAllDeliveries = () => {
    return axios.get(
        `${API_URL}`,
        getAuthHeaders()
    );
};


// Get delivery by ID
export const getDeliveryById = (id) => {
    return axios.get(
        `${API_URL}/${id}`,
        getAuthHeaders()
    );
};


// Get delivery by Order ID
export const getDeliveryByOrderId = (orderId) => {
    return axios.get(
        `${API_URL}/order/${orderId}`,
        getAuthHeaders()
    );
};


// Get deliveries by Delivery Partner
export const getDeliveriesByPartner = (deliveryPartnerId) => {

    return axios.get(
        `${API_URL}/partner/${deliveryPartnerId}`,
        getAuthHeaders()
    );

};


// Update delivery status
export const updateDeliveryStatus = (id, status) => {

    return axios.put(
        `${API_URL}/${id}/status?status=${status}`,
        {},
        getAuthHeaders()
    );

};


// Update live location
export const updateLocation = (
    id,
    latitude,
    longitude
) => {

    return axios.put(
        `${API_URL}/${id}/location?latitude=${latitude}&longitude=${longitude}`,
        {},
        getAuthHeaders()
    );

};


// Delete delivery
export const deleteDelivery = (id) => {

    return axios.delete(
        `${API_URL}/${id}`,
        getAuthHeaders()
    );

};