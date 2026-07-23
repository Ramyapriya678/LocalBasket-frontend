import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../services/adminService";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            console.log(response.data);

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load dashboard");

        }

    };

    if (!dashboard) {

        return (

            <div className="container mt-5">

                <h3>Loading Dashboard...</h3>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">
                Admin Dashboard
            </h2>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Customers</h5>
                            <h2>{dashboard.totalCustomers}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Stores</h5>
                            <h2>{dashboard.totalStores}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Products</h5>
                            <h2>{dashboard.totalProducts}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Orders</h5>
                            <h2>{dashboard.totalOrders}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Revenue</h5>
                            <h2>₹ {dashboard.totalRevenue}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <hr className="my-5" />

            <h3 className="text-center mb-4">
                Quick Actions
            </h3>

            <div className="row">

                <div className="col-md-3 mb-4">
                    <div
                        className="card shadow text-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/manage-users")}
                    >
                        <div className="card-body">
                            <h1>👥</h1>
                            <h5>Manage Users</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div
                        className="card shadow text-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/manage-stores")}
                    >
                        <div className="card-body">
                            <h1>🏪</h1>
                            <h5>Manage Stores</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div
                        className="card shadow text-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/manage-products")}
                    >
                        <div className="card-body">
                            <h1>📦</h1>
                            <h5>Manage Products</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div
                        className="card shadow text-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/manage-orders")}
                    >
                        <div className="card-body">
                            <h1>🛒</h1>
                            <h5>Manage Orders</h5>
                        </div>
                    </div>
                </div>

                <div
    className="card p-4 text-center shadow"
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/assign-delivery")}
>
    <h1>🚚</h1>
    <h5>Assign Delivery</h5>
</div>

            </div>

        </div>

    );

}

export default AdminDashboard;