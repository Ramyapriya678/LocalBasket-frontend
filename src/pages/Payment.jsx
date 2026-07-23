import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createPayment } from "../services/paymentService";
import "../styles/payment.css";

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

            <div className="payment-page">

                <div className="error-card">

                    <h3>No Order Found</h3>

                    <button
                        className="cancel-btn"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="payment-page">

            <div className="payment-card">

                <div className="payment-header">

                    <h2>💳 Payment Gateway</h2>

                </div>

                <div className="payment-body">

                    <div className="order-summary">

                        <h4>Order Summary</h4>

                        <p>
                            <strong>Order ID:</strong> {order.id}
                        </p>

                        <p className="amount">
                            ₹{order.totalAmount}
                        </p>

                    </div>

                    <div className="payment-method">

                        <label>
                            Select Payment Method
                        </label>

                        <select
                            className="payment-select"
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

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                    >
                        Pay ₹{order.totalAmount}
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Payment;