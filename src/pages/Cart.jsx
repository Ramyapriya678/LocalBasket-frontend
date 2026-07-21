import { useEffect, useState } from "react";

import { placeOrder } from "../services/orderService";

import {
    getCart,
    updateCartItem,
    removeCartItem
} from "../services/cartService";


function Cart() {


    const [cart, setCart] = useState(null);

    const userId = localStorage.getItem("userId");



    useEffect(() => {

        loadCart();

    }, []);



    const loadCart = async () => {

        try {

            const response = await getCart(userId);

            console.log(response.data);

            setCart(response.data);


        } catch(error) {

            console.error(error);

            alert("Failed to load cart");

        }

    };



    const increaseQuantity = async (item) => {

        try {

            await updateCartItem(
                item.id,
                item.quantity + 1
            );

            loadCart();

        } catch(error) {

            console.error(error);

        }

    };



    const decreaseQuantity = async (item) => {


        if(item.quantity <= 1){

            return;

        }


        try {

            await updateCartItem(
                item.id,
                item.quantity - 1
            );

            loadCart();

        } catch(error) {

            console.error(error);

        }

    };



    const removeItem = async (cartItemId) => {


        try {

            await removeCartItem(cartItemId);

            loadCart();

        } catch(error) {

            console.error(error);

        }

    };



    const handleCheckout = async () => {


        try {


            // Temporary address id
            // Replace after address selection page
            const addressId = 3;


            const response = await placeOrder(
                userId,
                addressId
            );


            console.log("ORDER RESPONSE:", response.data);


            alert("Order placed successfully");


            // Refresh cart after order
            loadCart();



        } catch(error) {


            console.error(error);


            if(error.response){

                console.log(error.response.data);

            }


            alert("Order failed");


        }

    };




    if(!cart){


        return (

            <h3 className="container mt-4">
                Loading Cart...
            </h3>

        );

    }




    return (

        <div className="container mt-4">


            <h2>
                My Cart
            </h2>




            {
                cart.cartItems && cart.cartItems.length > 0 ?


                cart.cartItems.map((item)=>(


                    <div
                        className="card mb-3"
                        key={item.id}
                    >


                        <div className="card-body">


                            <h5>
                                {
                                item.storeProduct.product.productName
                                }
                            </h5>



                            <p>
                                Price: ₹{item.price}
                            </p>



                            <p>
                                Quantity: {item.quantity}
                            </p>




                            <button

                                className="btn btn-success me-2"

                                onClick={() =>
                                    increaseQuantity(item)
                                }

                            >

                                +

                            </button>





                            <button

                                className="btn btn-warning me-2"

                                onClick={() =>
                                    decreaseQuantity(item)
                                }

                            >

                                -

                            </button>





                            <button

                                className="btn btn-danger"

                                onClick={() =>
                                    removeItem(item.id)
                                }

                            >

                                Remove

                            </button>



                        </div>


                    </div>


                ))


                :


                <h4>
                    Cart is empty
                </h4>


            }




            <hr/>




            <h3>
                Total Amount: ₹{cart.totalAmount}
            </h3>




            {
                cart.cartItems && cart.cartItems.length > 0 &&

                <button

                    className="btn btn-primary mt-3"

                    onClick={handleCheckout}

                >

                    Checkout

                </button>

            }



        </div>

    );


}


export default Cart;