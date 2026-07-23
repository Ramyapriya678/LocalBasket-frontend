import { useEffect, useState } from "react";
import "../styles/address.css";

import {
    addAddress,
    getUserAddresses,
    deleteAddress
} from "../services/addressService";


function Address() {


    const userId = localStorage.getItem("userId");


    const [addresses, setAddresses] = useState([]);



    const emptyAddress = {

        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        latitude: "",
        longitude: ""

    };



    const [address, setAddress] = useState(emptyAddress);



    useEffect(()=>{

        loadAddresses();

    },[]);



    const loadAddresses = async()=>{

        try{

            const response = await getUserAddresses(userId);

            setAddresses(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    const handleChange = (e)=>{

        setAddress({

            ...address,

            [e.target.name]:e.target.value

        });

    };



    const saveAddress = async()=>{


        try{


            await addAddress(
                userId,
                address
            );


            alert("Address added successfully");


            setAddress(emptyAddress);


            loadAddresses();


        }
        catch(error){

            console.log(error);

        }


    };



    const removeAddress = async(id)=>{


        try{

            await deleteAddress(id);

            loadAddresses();

        }
        catch(error){

            console.log(error);

        }


    };



    return (

        <div className="container mt-5 address-page">


            <h2 className="mb-4">
                My Addresses
            </h2>



            <div className="card shadow p-4 mb-5 address-form-card">


                <h4 className="mb-4">
                    Add New Address
                </h4>



                <div className="row">


                    {
                        Object.keys(address).map((field)=>(


                            <div
                                className="col-md-6 mb-3"
                                key={field}
                            >


                                <label className="form-label text-capitalize">

                                    {field}

                                </label>


                                <input

                                    type="text"

                                    className="form-control"

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

                    className="btn btn-success mt-3 save-address-btn"

                    onClick={saveAddress}

                >

                    Save Address

                </button>



            </div>





            <h4 className="mb-3">
                Saved Addresses
            </h4>




            <div className="row">


                {
                    addresses.length === 0 ?

                    (

                        <p>
                            No addresses saved
                        </p>

                    )

                    :

                    addresses.map((item)=>(


                        <div

                            className="col-md-6 mb-4"

                            key={item.id}

                        >


                            <div className="card shadow h-100 saved-address-card">


                                <div className="card-body">


                                    <h5 className="card-title">

                                        {item.city}

                                    </h5>



                                    <p className="card-text">

                                        {item.addressLine1}

                                        <br/>

                                        {
                                            item.addressLine2
                                        }

                                        <br/>

                                        {item.city},
                                        {item.state}

                                        <br/>

                                        PIN:
                                        {item.pincode}

                                        <br/>

                                        {item.country}

                                    </p>




                                    <button

                                        className="btn btn-danger delete-address-btn"
                                        onClick={()=>
                                            removeAddress(item.id)
                                        }

                                    >

                                        Delete

                                    </button>



                                </div>


                            </div>


                        </div>


                    ))

                }


            </div>


        </div>

    );

}


export default Address;