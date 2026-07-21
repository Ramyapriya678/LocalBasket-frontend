import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdersByUser } from "../services/orderService";


function MyOrders() {


    const [orders, setOrders] = useState([]);

    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();



    useEffect(() => {

        loadOrders();

    }, []);




    const loadOrders = async () => {

        try {

            const response = await getOrdersByUser(userId);

            console.log("ORDERS RESPONSE:", response.data);

            setOrders(response.data);


        } catch(error) {

            console.error(error);

            alert("Failed to load orders");

        }

    };




    return (

        <div className="container mt-4">


            <h2>
                My Orders
            </h2>



            {
                orders.length > 0 ?


                orders.map((order)=>(


                    <div
                        className="card mb-3"
                        key={order.id}
                    >


                        <div className="card-body">


                            <h5>
                                Order ID: {order.id}
                            </h5>



                            <p>
                                Status: {order.status}
                            </p>



                            <p>
                                Total Amount: ₹{order.totalAmount}
                            </p>



                            <p>
                                Date: {
                                    new Date(order.orderDate)
                                    .toLocaleString()
                                }
                            </p>




                            <button

                                className="btn btn-primary"

                                onClick={() =>
                                    navigate(`/orders/${order.id}`)
                                }

                            >

                                View Details

                            </button>



                        </div>


                    </div>


                ))



                :



                <h4>
                    No Orders Found
                </h4>


            }



        </div>

    );

}


export default MyOrders;