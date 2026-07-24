import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOrdersByUser } from "../services/orderService";

import "../styles/orders.css";


function Orders(){

    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const [orders,setOrders] = useState([]);

    const [error,setError] = useState("");



    useEffect(()=>{

        loadOrders();

    },[]);



    const loadOrders = async()=>{

        try{

            const response =
            await getOrdersByUser(userId);

            setOrders(response.data);

        }
        catch(error){

            console.log(error);

            setError("Failed to load orders");

        }

    };



return(

<div className="orders-page">


<h1>
📦 My Orders
</h1>



{
error &&

<p className="error">
{error}
</p>

}




{
orders.length > 0 ?


<div className="orders-grid">


{

orders.map(order=>(


<div
className="order-card"
key={order.id}
>



<div className="order-header">


<h3>
Order #{order.id}
</h3>



<span 
className={`status ${order.orderStatus?.toLowerCase()}`}
>

{order.orderStatus}

</span>


</div>





<div className="order-info">


<div>

<p>
Amount
</p>

<strong>
₹{order.totalAmount}
</strong>


</div>



<div>

<p>
Date
</p>

<strong>

{
new Date(order.orderDate)
.toLocaleDateString()

}

</strong>

</div>


</div>




<button

className="view-order-btn"

onClick={()=>navigate(`/orders/${order.id}`)}

>

View Details

</button>




</div>



))


}



</div>



:



<div className="empty-orders">


<h2>
🛒 No Orders Yet
</h2>


<p>
Start shopping from local stores.
</p>


</div>



}



</div>


);


}


export default Orders;