import { useEffect, useState } from "react";

import {
    getDeliveriesByPartner,
    updateDeliveryStatus
} from "../services/deliveryService";

function DeliveryDashboard() {

    const [deliveries, setDeliveries] = useState([]);

    // Get Delivery Partner ID from localStorage
    const deliveryPartnerId = localStorage.getItem("deliveryPartnerId");

    useEffect(() => {

        if (deliveryPartnerId) {
            loadDeliveries();
        } else {
            alert("Delivery Partner not logged in.");
        }

    }, []);

    const loadDeliveries = async () => {

        try {

            const response = await getDeliveriesByPartner(deliveryPartnerId);

            console.log("DELIVERIES RESPONSE:", response.data);

            setDeliveries(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load deliveries.");

        }

    };

    const changeStatus = async (deliveryId, status) => {

        try {

            await updateDeliveryStatus(deliveryId, status);

            alert("Delivery status updated successfully.");

            loadDeliveries();

        } catch (error) {

            console.error(error);
            alert("Failed to update delivery status.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Delivery Dashboard</h2>

            {
                deliveries.length > 0 ? (

                    deliveries.map((delivery) => (

                        <div
                            className="card mb-3 shadow-sm"
                            key={delivery.id}
                        >

                            <div className="card-body">

                                <h5 className="card-title">
                                    Delivery ID: {delivery.id}
                                </h5>

                                <p>
                                    <strong>Order ID:</strong> {delivery.orderId}
                                </p>

                                <p>
                                    <strong>Status:</strong> {delivery.status}
                                </p>

                                {delivery.status === "ASSIGNED" && (
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            changeStatus(
                                                delivery.id,
                                                "PICKED_UP"
                                            )
                                        }
                                    >
                                        Pick Up
                                    </button>
                                )}

                                {delivery.status === "PICKED_UP" && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            changeStatus(
                                                delivery.id,
                                                "OUT_FOR_DELIVERY"
                                            )
                                        }
                                    >
                                        Out For Delivery
                                    </button>
                                )}

                                {delivery.status === "OUT_FOR_DELIVERY" && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            changeStatus(
                                                delivery.id,
                                                "DELIVERED"
                                            )
                                        }
                                    >
                                        Delivered
                                    </button>
                                )}

                                {delivery.status === "DELIVERED" && (
                                    <span className="badge bg-success fs-6">
                                        Delivered
                                    </span>
                                )}

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="alert alert-info">
                        No deliveries assigned.
                    </div>

                )
            }

        </div>

    );

}

export default DeliveryDashboard;