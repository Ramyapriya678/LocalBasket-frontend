import axiosInstance from "../api/axiosConfig";

export const getDashboard = () => {

    return axiosInstance.get("/admin/dashboard");

};