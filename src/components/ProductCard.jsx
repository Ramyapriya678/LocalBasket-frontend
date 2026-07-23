import React from "react";
import {FaHeart,FaPlus} from "react-icons/fa";


function ProductCard({image,name,price}){


return(

<div className="product-card">


<div className="heart">
<FaHeart/>
</div>


<img src={image}/>


<h3>{name}</h3>

<p>
Fresh organic product
</p>


<div className="price">

₹{price}/kg

<button>
<FaPlus/>
</button>

</div>


</div>

)

}


export default ProductCard;