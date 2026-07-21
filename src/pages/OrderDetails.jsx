import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOrderById } from "../services/orderService";
import { getDeliveryByOrderId } from "../services/deliveryService";

function OrderDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [delivery, setDelivery] = useState(null);

    useEffect(() => {

        loadOrder();
        loadDelivery();

    }, []);

    const loadOrder = async () => {

        try {

            const response = await getOrderById(id);

            console.log("ORDER DETAILS:", response.data);

            setOrder(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load order details");

        }

    };

    const loadDelivery = async () => {

        try {

            const response = await getDeliveryByOrderId(id);

            console.log("DELIVERY DETAILS:", response.data);

            setDelivery(response.data);

            console.log("Delivery Status:", response.data.status);

        } catch (error) {

            console.log("Delivery not assigned yet");

        }

    };

    if (!order) {

        return (

            <h3 className="container mt-4">
                Loading...
            </h3>

        );

    }

    return (

        <div className="container mt-4">

            <h2>Order Details</h2>

            <div className="card">

                <div className="card-body">

                    <h5>
                        Order ID: {order.id}
                    </h5>

                    <p>
                        <strong>Status:</strong> {order.status}
                    </p>

                    <p>
                        <strong>Total Amount:</strong> ₹{order.totalAmount}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.orderDate).toLocaleString()}
                    </p>

                    <hr />

                    <h4>Items</h4>

                    {order.orderItems?.map((item) => (

                        <div key={item.id}>

                            <p>
                                <strong>Product:</strong>{" "}
                                {item.storeProduct?.product?.productName}
                            </p>

                            <p>
                                <strong>Quantity:</strong> {item.quantity}
                            </p>

                            <p>
                                <strong>Price:</strong> ₹{item.price}
                            </p>

                            <p>
                                <strong>Subtotal:</strong> ₹{item.subtotal}
                            </p>

                            <hr />

                        </div>

                    ))}

                    <h4>Delivery Status</h4>

                    {delivery ? (

                        <p className="text-success fw-bold">
                            {delivery.status}
                        </p>

                    ) : (

                        <p className="text-warning">
                            Delivery Not Assigned Yet
                        </p>

                    )}

                    <hr />

                    <h4>Address</h4>

                    <p>{order.address.street}</p>

                    <p>{order.address.city}</p>

                    <hr />

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate("/payment", {
                                state: {
                                    order: order
                                }
                            })
                        }
                    >
                        Pay Now
                    </button>

                </div>

            </div>

        </div>

    );

}

export default OrderDetails;