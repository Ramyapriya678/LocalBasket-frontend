import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createPayment } from "../services/paymentService";

function Payment() {

    const location = useLocation();
    const navigate = useNavigate();

    const order = location.state?.order;

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handlePayment = async () => {

        try {

            const paymentData = {

                orderId: order.id,
                paymentMethod: paymentMethod

            };

            const response = await createPayment(paymentData);

            console.log("Payment Success:", response.data);

            alert("Payment Successful!");

            navigate("/orders");

        } catch (error) {

            console.error(error);

            if (error.response) {

                alert(error.response.data.message || "Payment Failed");

            } else {

                alert("Payment Failed");

            }

        }

    };

    if (!order) {

        return (

            <div className="container mt-4">

                <div className="alert alert-danger">
                    No Order Found
                </div>

            </div>

        );

    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3 className="mb-0">
                                Payment Gateway
                            </h3>

                        </div>

                        <div className="card-body">

                            <h5>
                                Order ID : {order.id}
                            </h5>

                            <h4 className="text-success mb-4">
                                Amount : ₹{order.totalAmount}
                            </h4>

                            <div className="mb-3">

                                <label className="form-label">
                                    Select Payment Method
                                </label>

                                <select
                                    className="form-select"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                >

                                    <option value="COD">
                                        Cash On Delivery
                                    </option>

                                    <option value="UPI">
                                        UPI
                                    </option>

                                    <option value="DEBIT_CARD">
                                        Debit Card
                                    </option>

                                    <option value="CREDIT_CARD">
                                        Credit Card
                                    </option>

                                    <option value="NET_BANKING">
                                        Net Banking
                                    </option>

                                </select>

                            </div>

                            <div className="d-grid gap-2">

                                <button
                                    className="btn btn-success"
                                    onClick={handlePayment}
                                >
                                    Pay ₹{order.totalAmount}
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Payment;