import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOrderById } from "../services/orderService";
import { getDeliveryByOrderId } from "../services/deliveryService";

import "../styles/orderDetails.css";


function OrderDetails() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [order,setOrder] = useState(null);

    const [delivery,setDelivery] = useState(null);



    useEffect(()=>{

        loadOrder();

        loadDelivery();

    },[]);





    const loadOrder = async()=>{


        try{


            const response = await getOrderById(id);


            setOrder(response.data);


        }
        catch(error){


            alert("Failed to load order");


        }


    };





    const loadDelivery = async()=>{


        try{


            const response =
            await getDeliveryByOrderId(id);


            setDelivery(response.data);


        }
        catch(error){

            console.log(
                "Delivery not assigned"
            );

        }


    };





    if(!order){


        return(

            <div className="order-loading">

                Loading Order Details...

            </div>

        );

    }




return(



<div className="order-details-page">



<div className="details-header">


<h1>
📦 Order Details
</h1>


<span className="order-id">

Order #{order.id}

</span>


</div>






<div className="details-grid">





<div className="details-main">



<div className="details-card">


<h2>
Order Summary
</h2>


<div className="summary-line">

<span>
Status
</span>


<b className="status-badge">

{order.status || order.orderStatus}

</b>


</div>



<div className="summary-line">

<span>
Total Amount
</span>

<strong>
₹{order.totalAmount}
</strong>

</div>



<div className="summary-line">

<span>
Order Date
</span>


<strong>

{
new Date(order.orderDate)
.toLocaleString()

}

</strong>


</div>


</div>







<div className="details-card">


<h2>
🛍️ Ordered Items
</h2>



{

order.orderItems?.map(item=>(


<div

className="product-item"

key={item.id}

>


<div>


<h3>

{
item.storeProduct?.product?.productName ||
"Product"

}

</h3>


<p>
Quantity : {item.quantity}
</p>


</div>



<div>


<p>
₹{item.price}
</p>


<strong>
₹{item.subtotal}
</strong>


</div>



</div>


))


}


</div>





</div>









<div className="details-side">



<div className="details-card">


<h2>
🚚 Delivery
</h2>


{

delivery ?


<div className="delivery-status">


<div className="track-circle">

✓

</div>


<p>

{delivery.status}

</p>


</div>



:


<p className="pending">

Delivery Not Assigned Yet

</p>


}



</div>







<div className="details-card">


<h2>
📍 Address
</h2>


<p>

{order.address?.street}

</p>


<p>

{order.address?.city}

</p>



</div>






<button

className="pay-btn"

onClick={()=>navigate(
"/payment",
{
state:{
order:order
}
}
)}

>

💳 Pay Now

</button>



</div>





</div>



</div>



);


}


export default OrderDetails;