import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    updateCartItem,
    removeCartItem
} from "../services/cartService";

import { getUserAddresses } from "../services/addressService";
import { placeOrder } from "../services/orderService";

import "../styles/cart.css";

function Cart() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const [cart, setCart] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

    useEffect(() => {

        loadCart();
        loadAddresses();

    }, []);

    const loadCart = async () => {

        try {

            const response = await getCart(userId);
            setCart(response.data);

        } catch (error) {

            console.log("Failed to load cart", error);

        }

    };

    const loadAddresses = async () => {

        try {

            const response = await getUserAddresses(userId);
            setAddresses(response.data);

        } catch (error) {

            console.log("Failed to load addresses", error);

        }

    };

    const changeQuantity = async (cartItemId, quantity) => {

        if (quantity < 1) return;

        try {

            await updateCartItem(cartItemId, quantity);

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const removeItem = async (cartItemId) => {

        try {

            await removeCartItem(cartItemId);

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const checkout = async () => {

        if (!selectedAddress) {

            alert("Please select delivery address");
            return;

        }

        try {

            const response = await placeOrder(
                userId,
                selectedAddress
            );

            navigate("/payment", {
                state: {
                    order: response.data
                }
            });

        } catch (error) {

            console.log("Order failed", error);

            alert("Order failed");

        }

    };

    if (!cart) {

        return (

            <div className="cart-page">

                <h3>Loading Cart...</h3>

            </div>

        );

    }

    return (

        <div className="cart-page">

            <h2>🛒 My Cart</h2>

            {
                cart.cartItems &&
                cart.cartItems.length > 0 ?

                    cart.cartItems.map((item) => (

                        <div
                            key={item.id}
                            className="cart-card"
                        >

                            <h4>
                                {
                                    item.storeProduct?.product?.productName ||
                                    item.storeProduct?.product?.name ||
                                    "Product"
                                }
                            </h4>

                            <p>
                                <strong>Price:</strong> ₹{item.price}
                            </p>

                            <p>
                                <strong>Subtotal:</strong> ₹{item.subtotal}
                            </p>

                            <div className="quantity-controls">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        changeQuantity(
                                            item.id,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span className="quantity">
                                    {item.quantity}
                                </span>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        changeQuantity(
                                            item.id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>

                            <button
                                className="btn btn-danger mt-3"
                                onClick={() =>
                                    removeItem(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))

                    :

                    <div className="empty-cart">

                        <h4>🛒 Cart is Empty</h4>

                        <p>
                            Add some products to continue shopping.
                        </p>

                    </div>

            }

            <hr />

            <div className="checkout-section">

                <h4>Select Delivery Address</h4>

                <select

                    className="address-select"

                    value={selectedAddress}

                    onChange={(e) =>
                        setSelectedAddress(e.target.value)
                    }

                >

                    <option value="">
                        Select Address
                    </option>

                    {
                        addresses.map((address) => (

                            <option
                                key={address.id}
                                value={address.id}
                            >

                                {address.addressLine1},{" "}
                                {address.city},{" "}
                                {address.state} -{" "}
                                {address.pincode}

                            </option>

                        ))
                    }

                </select>

                <button
                    className="checkout-btn"
                    onClick={checkout}
                >
                    Proceed To Checkout
                </button>

            </div>

        </div>

    );

}

export default Cart;