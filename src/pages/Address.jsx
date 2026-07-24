import { useEffect, useState } from "react";

import "../styles/address.css";

import {
    addAddress,
    getUserAddresses,
    deleteAddress
} from "../services/addressService";



function Address(){


const userId = localStorage.getItem("userId");



const emptyAddress={

    addressLine1:"",
    addressLine2:"",
    city:"",
    state:"",
    pincode:"",
    country:"India",
    latitude:"",
    longitude:""

};



const [addresses,setAddresses]=useState([]);

const [address,setAddress]=useState(emptyAddress);



useEffect(()=>{

    loadAddresses();

},[]);





const loadAddresses=async()=>{

    try{

        const response=
        await getUserAddresses(userId);

        setAddresses(response.data);

    }
    catch(error){

        console.log(error);

    }

};





const handleChange=(e)=>{


setAddress({

    ...address,

    [e.target.name]:e.target.value

});


};





const saveAddress=async()=>{


try{


await addAddress(
    userId,
    address
);



alert(
"Address added successfully"
);



setAddress(emptyAddress);


loadAddresses();



}
catch(error){

console.log(error);

}



};






const removeAddress=async(id)=>{


try{


await deleteAddress(id);


loadAddresses();



}
catch(error){

console.log(error);

}


};





return(



<div className="address-page">



<h1>
📍 My Addresses
</h1>





<div className="address-layout">





<div className="add-address-card">


<h2>
➕ Add New Address
</h2>




<div className="address-form">



{

Object.keys(address).map(field=>(


<div
className="address-input"
key={field}
>


<label>

{field}

</label>



<input

name={field}

value={address[field]}

onChange={handleChange}

placeholder={
`Enter ${field}`
}

/>



</div>


))


}



</div>





<button

className="save-btn"

onClick={saveAddress}

>

Save Address

</button>



</div>







<div className="saved-section">


<h2>
Saved Addresses
</h2>



{

addresses.length===0 ?



<div className="empty-address">


<h3>
No Saved Addresses
</h3>


<p>
Add your delivery address to order groceries.
</p>


</div>



:


<div className="address-grid">



{

addresses.map(item=>(



<div

className="saved-card"

key={item.id}

>


<div className="location-icon">

📍

</div>




<h3>

{item.city}

</h3>



<p>

{item.addressLine1}

<br/>

{
item.addressLine2
}


<br/>

{item.city},

{item.state}


<br/>

PIN :

{item.pincode}


<br/>

{item.country}


</p>





<button

className="delete-btn"

onClick={()=>
removeAddress(item.id)
}

>

Delete

</button>



</div>



))


}



</div>



}



</div>




</div>



</div>


);


}



export default Address;