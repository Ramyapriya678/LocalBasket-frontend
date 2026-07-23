import { useEffect, useState } from "react";
import {
    getPartnerDeliveries,
    updateDeliveryStatus
} from "../services/deliveryService";


function DeliveryOrders(){

    const [deliveries,setDeliveries] = useState([]);

    const deliveryPartnerId =
        localStorage.getItem("deliveryPartnerId");


    useEffect(()=>{

        loadDeliveries();

    },[]);


    const loadDeliveries = async()=>{

        try{

            const res =
            await getPartnerDeliveries(deliveryPartnerId);

            setDeliveries(res.data);

        }
        catch(error){

            console.log(error);

        }

    };


    const changeStatus = async(id,status)=>{

        try{

            await updateDeliveryStatus(id,status);

            loadDeliveries();

        }
        catch(error){

            console.log(error);

        }

    };


    return(

        <div>

            <h2>My Deliveries</h2>


            {
                deliveries.map((delivery)=>(

                    <div key={delivery.id}>

                        <h3>
                            Order ID : {delivery.orderId}
                        </h3>


                        <p>
                            Status : {delivery.status}
                        </p>


                        {
                            delivery.status==="ASSIGNED" &&
                            <button
                            onClick={()=>
                            changeStatus(
                                delivery.id,
                                "PICKED_UP"
                            )}
                            >
                                Pick Order
                            </button>
                        }


                        {
                            delivery.status==="PICKED_UP" &&
                            <button
                            onClick={()=>
                            changeStatus(
                                delivery.id,
                                "OUT_FOR_DELIVERY"
                            )}
                            >
                                Start Delivery
                            </button>
                        }


                        {
                            delivery.status==="OUT_FOR_DELIVERY" &&
                            <button
                            onClick={()=>
                            changeStatus(
                                delivery.id,
                                "DELIVERED"
                            )}
                            >
                                Delivered
                            </button>
                        }


                    </div>

                ))
            }

        </div>

    );

}


export default DeliveryOrders;