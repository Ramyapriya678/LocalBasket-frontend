import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/orderService";
import "../styles/orders.css";

function Orders() {

    const userId = localStorage.getItem("userId");

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const response = await getOrdersByUser(userId);

            setOrders(response.data);

        } catch (error) {

            console.error(error);

            setError("Failed to load orders");

        }

    };

    return (

        <div className="orders-page">

            <h2>📦 My Orders</h2>

            {
                error &&
                <p className="error">{error}</p>
            }

            {
                orders.length > 0 ?

                    <div className="orders-grid">

                        {
                            orders.map((order) => (

                                <div
                                    className="order-card"
                                    key={order.id}
                                >

                                    <h4>
                                        Order #{order.id}
                                    </h4>

                                    <p>
                                        <strong>Total Amount:</strong> ₹{order.totalAmount}
                                    </p>

                                    <p>
                                        <strong>Status:</strong> {order.orderStatus}
                                    </p>

                                    <p>
                                        <strong>Payment:</strong> {order.paymentStatus}
                                    </p>

                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {
                                            order.orderDate
                                                ? new Date(order.orderDate).toLocaleString()
                                                : "N/A"
                                        }
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                    :

                    <div className="empty-orders">

                        <h3>No Orders Found</h3>

                        <p>
                            Place your first grocery order.
                        </p>

                    </div>

            }

        </div>

    );

}

export default Orders;