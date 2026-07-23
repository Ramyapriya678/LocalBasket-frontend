import { useEffect, useState } from "react";
import { 
    getOrdersByStore,
    updateOrderStatus
} from "../services/orderService";


function StoreOrders() {


    const [orders, setOrders] = useState([]);

    const storeId = localStorage.getItem("storeId");



    useEffect(() => {

        loadOrders();

    }, []);



    const loadOrders = async () => {

        try {

            const response = await getOrdersByStore(storeId);

            setOrders(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    const changeStatus = async (id, status) => {


        try {

            await updateOrderStatus(id, status);

            loadOrders();

        }
        catch(error){

            console.log(error);

        }

    };



    return (

        <div className="container mt-5">


            <h2 className="mb-4">
                Store Orders
            </h2>



            {
                orders.map((order)=>(


                    <div 
                    className="card shadow p-4 mb-3"
                    key={order.id}
                    >


                        <h5>
                            Order ID : {order.id}
                        </h5>



                        <p>
                            Customer :
                            {" "}
                            {order.user.firstName}
                            {" "}
                            {order.user.lastName}
                        </p>



                        <p>
                            Amount :
                            ₹ {order.totalAmount}
                        </p>



                        <p>
                            Status :
                            <b>
                                {" "}
                                {order.status}
                            </b>
                        </p>



                        <p>
                            Date :
                            {order.orderDate}
                        </p>



                        <hr />



                        <h6>
                            Products
                        </h6>



                        {
                            order.orderItems.map((item)=>(

                                <div key={item.id}>


                                    <p>

                                    {item.storeProduct.product.productName}

                                    {" - "}

                                    Quantity:
                                    {" "}
                                    {item.quantity}

                                    </p>


                                </div>


                            ))
                        }



                        <div>



                        {
                            order.status === "PLACED" &&

                            <button
                            className="btn btn-primary me-2"
                            onClick={() =>
                                changeStatus(
                                    order.id,
                                    "CONFIRMED"
                                )
                            }
                            >
                                Confirm Order
                            </button>

                        }



                        {
                            order.status === "CONFIRMED" &&

                            <button
                            className="btn btn-warning me-2"
                            onClick={() =>
                                changeStatus(
                                    order.id,
                                    "PACKED"
                                )
                            }
                            >
                                Pack Order
                            </button>

                        }



                        {
                            order.status === "PACKED" &&

                            <button
                            className="btn btn-success"
                            onClick={() =>
                                changeStatus(
                                    order.id,
                                    "OUT_FOR_DELIVERY"
                                )
                            }
                            >
                                Send Delivery
                            </button>

                        }
                        {
    order.status === "OUT_FOR_DELIVERY" &&

    <button
        className="btn btn-dark"
        onClick={() =>
            changeStatus(
                order.id,
                "DELIVERED"
            )
        }
    >
        Mark Delivered
    </button>

}



                        </div>



                    </div>


                ))
            }



        </div>

    );

}


export default StoreOrders;