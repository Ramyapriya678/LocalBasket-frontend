import { useEffect, useState } from "react";

import {
    getDeliveriesByPartner,
    updateDeliveryStatus
} from "../services/deliveryService";


function DeliveryDashboard() {


    const [deliveries, setDeliveries] = useState([]);


    // Temporary delivery partner id
    // Later we will get this from login
    const deliveryPartnerId = 1;



    useEffect(() => {

        loadDeliveries();

    }, []);




    const loadDeliveries = async () => {

        try {

            const response =
                await getDeliveriesByPartner(
                    deliveryPartnerId
                );


            console.log(
                "DELIVERIES RESPONSE:",
                response.data
            );


            setDeliveries(response.data);


        } catch(error) {

            console.error(error);

            alert(
                "Failed to load deliveries"
            );

        }

    };





    const changeStatus = async (
        deliveryId,
        status
    ) => {

        try {


            await updateDeliveryStatus(
                deliveryId,
                status
            );


            alert(
                "Status Updated"
            );


            loadDeliveries();



        } catch(error) {

            console.error(error);

            alert(
                "Failed to update status"
            );

        }

    };





    return (


        <div className="container mt-4">


            <h2>
                Delivery Dashboard
            </h2>




            {
                deliveries.length > 0 ?


                deliveries.map((delivery)=>(


                    <div
                        className="card mb-3"
                        key={delivery.id}
                    >


                        <div className="card-body">


                            <h5>
                                Delivery ID:
                                {delivery.id}
                            </h5>



                            <p>
                                Order ID:
                                {delivery.orderId}
                            </p>



                            <p>
                                Status:
                                {delivery.status}
                            </p>




                            <button
                                className="btn btn-warning me-2"
                                onClick={() =>
                                    changeStatus(
                                        delivery.id,
                                        "PICKED_UP"
                                    )
                                }
                            >
                                Pick Up
                            </button>




                            <button
                                className="btn btn-primary me-2"
                                onClick={() =>
                                    changeStatus(
                                        delivery.id,
                                        "OUT_FOR_DELIVERY"
                                    )
                                }
                            >
                                Out For Delivery
                            </button>




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



                        </div>


                    </div>


                ))


                :


                <h4>
                    No Deliveries Assigned
                </h4>


            }



        </div>


    );

}


export default DeliveryDashboard;