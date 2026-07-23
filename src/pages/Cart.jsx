import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    updateCartItem,
    removeCartItem
} from "../services/cartService";

import { getUserAddresses } from "../services/addressService";

import { placeOrder } from "../services/orderService";


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

        } catch(error) {

            console.log("Failed to load cart", error);

        }

    };



    const loadAddresses = async () => {

        try {

            const response = await getUserAddresses(userId);

            setAddresses(response.data);

        } catch(error) {

            console.log("Failed to load addresses", error);

        }

    };



    const changeQuantity = async(cartItemId, quantity) => {


        if(quantity < 1){
            return;
        }


        try {

            await updateCartItem(
                cartItemId,
                quantity
            );

            loadCart();

        } catch(error) {

            console.log(error);

        }

    };



    const removeItem = async(cartItemId) => {


        try {

            await removeCartItem(cartItemId);

            loadCart();

        } catch(error) {

            console.log(error);

        }

    };



    const checkout = async() => {


        if(!selectedAddress){

            alert("Please select delivery address");

            return;

        }



        try {


            const response = await placeOrder(
                userId,
                selectedAddress
            );


            navigate("/payment", {

                state:{
                    order: response.data
                }

            });


        } catch(error) {


            console.log(
                "Order failed",
                error
            );


            alert("Order failed");


        }


    };



    if(!cart){

        return (

            <div className="container mt-4">

                <h3>
                    Loading Cart...
                </h3>

            </div>

        );

    }



    return (

        <div className="container mt-4">


            <h2>
                My Cart
            </h2>



            {
                cart.cartItems &&
                cart.cartItems.length > 0 ?


                cart.cartItems.map((item)=>(


                    <div
                        key={item.id}
                        className="card p-3 mb-3"
                    >


                        <h5>

                            {
                                item.storeProduct?.product?.productName
                                ||
                                item.storeProduct?.product?.name
                                ||
                                "Product"
                            }

                        </h5>



                        <p>
                            Price: ₹{item.price}
                        </p>


                        <p>
                            Subtotal: ₹{item.subtotal}
                        </p>



                        <div>


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



                            <span className="mx-3">

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

                <h5>
                    Cart is empty
                </h5>

            }





            <hr />



            <h4>
                Select Delivery Address
            </h4>



            <select

                className="form-select"

                value={selectedAddress}

                onChange={(e)=>
                    setSelectedAddress(e.target.value)
                }

            >


                <option value="">
                    Select Address
                </option>



                {
                    addresses.map((address)=>(


                        <option

                            key={address.id}

                            value={address.id}

                        >

                            {address.addressLine1},
                            {address.city},
                            {address.state}
                            -
                            {address.pincode}


                        </option>


                    ))
                }


            </select>



            <button

                className="btn btn-success mt-4"

                onClick={checkout}

            >

                Proceed To Checkout

            </button>



        </div>

    );

}


export default Cart;