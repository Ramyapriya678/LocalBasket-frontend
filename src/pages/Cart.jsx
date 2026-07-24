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


    const [cart,setCart] = useState(null);
    const [addresses,setAddresses] = useState([]);
    const [selectedAddress,setSelectedAddress] = useState("");



    useEffect(()=>{

        loadCart();
        loadAddresses();

    },[]);



    const loadCart = async()=>{

        try{

            const response = await getCart(userId);

            setCart(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    const loadAddresses = async()=>{

        try{

            const response = await getUserAddresses(userId);

            setAddresses(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    const changeQuantity = async(id,qty)=>{

        if(qty < 1)
            return;


        await updateCartItem(id,qty);

        loadCart();

    };



    const removeItem = async(id)=>{

        await removeCartItem(id);

        loadCart();

    };



    const checkout = async()=>{


        if(!selectedAddress){

            alert("Please select delivery address");

            return;

        }


        try{


            const response = await placeOrder(
                userId,
                selectedAddress
            );


            navigate("/payment",{

                state:{
                    order:response.data
                }

            });


        }
        catch(error){

            alert("Order failed");

        }


    };



    if(!cart){

        return(

            <div className="cart-loading">

                Loading Cart...

            </div>

        );

    }



    const items = cart.cartItems || [];


    const subtotal = items.reduce(
        (sum,item)=>sum + item.subtotal,
        0
    );


    const discount = subtotal > 500 ? 50 : 0;


    const delivery = subtotal > 0 ? 40 : 0;


    const total =
        subtotal - discount + delivery;



return(


<div className="cart-page">


<h1>
🛒 My Cart
</h1>



{
items.length === 0 ?


<div className="empty-cart">


<h2>
🛍️ Your cart is empty
</h2>


<p>
Add products from local stores and start shopping.
</p>


<button
onClick={()=>navigate("/products")}
>
Continue Shopping
</button>


</div>


:


<div className="cart-layout">



<div className="cart-items">


{
items.map(item=>(


<div
className="cart-card"
key={item.id}
>


<img

className="cart-image"

src={
item.storeProduct?.product?.imageUrl ||
"https://via.placeholder.com/120"
}

/>



<div className="cart-details">


<h3>

{
item.storeProduct?.product?.productName ||
item.storeProduct?.product?.name ||
"Product"
}

</h3>


<p>
₹{item.price}
</p>


<div className="quantity-box">


<button
onClick={()=>changeQuantity(
item.id,
item.quantity-1
)}
>
−
</button>


<span>
{item.quantity}
</span>


<button
onClick={()=>changeQuantity(
item.id,
item.quantity+1
)}
>
+
</button>


</div>



<button

className="remove-btn"

onClick={()=>removeItem(item.id)}

>

Remove

</button>


</div>


</div>


))

}



</div>





<div className="summary-card">


<h2>
Order Summary
</h2>


<div className="summary-row">

<span>
Subtotal
</span>

<b>
₹{subtotal}
</b>

</div>



<div className="summary-row">

<span>
Discount
</span>

<b>
- ₹{discount}
</b>

</div>



<div className="summary-row">

<span>
Delivery Fee
</span>

<b>
₹{delivery}
</b>

</div>



<hr/>


<div className="total-row">

<span>
Total
</span>


<strong>
₹{total}
</strong>

</div>





<h3>
Delivery Address
</h3>



<select

value={selectedAddress}

onChange={
e=>setSelectedAddress(e.target.value)
}

>


<option value="">
Select Address
</option>


{

addresses.map(address=>(


<option
key={address.id}
value={address.id}
>

{
address.addressLine1
},
{
address.city
}

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

}



</div>


);


}


export default Cart;