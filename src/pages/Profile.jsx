import { useEffect, useState } from "react";

import {
    getUserById,
    updateUser
} from "../services/userService";

import "../styles/profile.css";



function Profile(){


const userId = localStorage.getItem("userId");



const [user,setUser]=useState({

    firstName:"",
    lastName:"",
    email:"",
    phone:""

});




useEffect(()=>{

    loadUser();

},[]);





const loadUser=async()=>{


try{


const response =
await getUserById(userId);


setUser(response.data);


}
catch(error){


console.log(error);

alert(
"Unable to load profile"
);


}


};






const handleChange=(e)=>{


setUser({

...user,

[e.target.name]:e.target.value

});


};







const handleSubmit=async(e)=>{


e.preventDefault();



try{


await updateUser(
userId,
user
);



alert(
"Profile Updated Successfully"
);



}
catch(error){


console.log(error);

alert(
"Failed to update profile"
);


}



};






return(



<div className="profile-page">





<div className="profile-card">





<div className="profile-header">


<div className="profile-avatar">

👤

</div>


<h1>
My Profile
</h1>


<p>
Manage your LocalBasket account
</p>


</div>







<form onSubmit={handleSubmit}>


<div className="profile-grid">



<div className="profile-field">


<label>
First Name
</label>


<input

type="text"

name="firstName"

value={user.firstName}

onChange={handleChange}

/>


</div>





<div className="profile-field">


<label>
Last Name
</label>


<input

type="text"

name="lastName"

value={user.lastName}

onChange={handleChange}

/>


</div>





<div className="profile-field">


<label>
Email
</label>


<input

type="email"

name="email"

value={user.email}

onChange={handleChange}

/>


</div>





<div className="profile-field">


<label>
Phone
</label>


<input

type="text"

name="phone"

value={user.phone}

onChange={handleChange}

/>


</div>



</div>





<button

className="update-btn"

type="submit"

>

Update Profile

</button>




</form>




</div>





</div>


);


}



export default Profile;