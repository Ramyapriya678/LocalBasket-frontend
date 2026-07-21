import axiosInstance from "../api/axiosConfig";

// Create Payment
export const createPayment = (paymentData) => {
    return axiosInstance.post("/payments/pay", paymentData);
};

// Get Payment by ID
export const getPaymentById = (id) => {
    return axiosInstance.get(`/payments/${id}`);
};

// Get Payment by Order ID
export const getPaymentByOrderId = (orderId) => {
    return axiosInstance.get(`/payments/order/${orderId}`);
};

// Update Payment Status
export const updatePaymentStatus = (id, status) => {
    return axiosInstance.put(
        `/payments/${id}/status`,
        null,
        {
            params: { status }
        }
    );
};

// Get All Payments
export const getAllPayments = () => {
    return axiosInstance.get("/payments");
};

// Delete Payment
export const deletePayment = (id) => {
    return axiosInstance.delete(`/payments/${id}`);
};