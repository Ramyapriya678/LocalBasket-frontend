import axiosInstance from "../api/axiosConfig";


export const addAddress = (userId, address) => {

    return axiosInstance.post(
        `/addresses/add/${userId}`,
        address
    );

};


export const getUserAddresses = (userId) => {

    return axiosInstance.get(
        `/addresses/user/${userId}`
    );

};


export const deleteAddress = (id) => {

    return axiosInstance.delete(
        `/addresses/${id}`
    );

};