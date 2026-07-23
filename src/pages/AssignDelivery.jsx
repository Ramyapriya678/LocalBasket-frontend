import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

function AssignDelivery() {

    const [orders, setOrders] = useState([]);
    const [partners, setPartners] = useState([]);

    const [orderId, setOrderId] = useState("");
    const [deliveryPartnerId, setDeliveryPartnerId] = useState("");

    useEffect(() => {
        loadOrders();
        loadPartners();
    }, []);

    const loadOrders = async () => {
        try {
            const res = await axiosInstance.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadPartners = async () => {
        try {
            const res = await axiosInstance.get("/delivery-partners");
            setPartners(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const assignDelivery = async () => {

        try {

            await axiosInstance.post("/deliveries/assign", {
                orderId,
                deliveryPartnerId
            });

            alert("Delivery Assigned Successfully");

            setOrderId("");
            setDeliveryPartnerId("");

        } catch (err) {

            console.log(err);

            alert("Assignment Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Assign Delivery</h2>

            <div className="mb-3">

                <label>Order</label>

                <select
                    className="form-control"
                    value={orderId}
                    onChange={(e)=>setOrderId(e.target.value)}
                >

                    <option value="">Select Order</option>

                    {
                        orders.map(order=>(
                            <option
                                key={order.id}
                                value={order.id}
                            >
                                Order #{order.id}
                            </option>
                        ))
                    }

                </select>

            </div>

            <div className="mb-3">

                <label>Delivery Partner</label>

                <select
                    className="form-control"
                    value={deliveryPartnerId}
                    onChange={(e)=>setDeliveryPartnerId(e.target.value)}
                >

                    <option value="">Select Partner</option>

                    {
                        partners.map(partner=>(
                            <option
                                key={partner.id}
                                value={partner.id}
                            >
                                {partner.name}
                            </option>
                        ))
                    }

                </select>

            </div>

            <button
                className="btn btn-primary"
                onClick={assignDelivery}
            >
                Assign Delivery
            </button>

        </div>

    );

}

export default AssignDelivery;