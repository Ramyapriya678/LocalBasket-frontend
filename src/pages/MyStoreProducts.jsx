import { useEffect, useState } from "react";
import axios from "axios";

import {
    updateStoreProduct,
    deleteStoreProduct
} from "../services/storeProductService";


function MyStoreProducts() {


    const [products, setProducts] = useState([]);

    const [editId, setEditId] = useState(null);


    const [editData, setEditData] = useState({

        sellingPrice:"",
        stockQuantity:"",
        discountPercentage:"",
        isAvailable:true

    });


    const ownerId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");




    useEffect(()=>{

        loadProducts();

    },[]);





    const loadProducts = async()=>{

        try{


            const response = await axios.get(

                `http://localhost:8080/api/store-products/owner/${ownerId}`,

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            setProducts(response.data);


        }
        catch(error){

            console.log(error);

        }

    };






    const startEdit = (item)=>{


        setEditId(item.id);


        setEditData({

            sellingPrice:item.sellingPrice,

            stockQuantity:item.stockQuantity,

            discountPercentage:item.discountPercentage,

            isAvailable:item.isAvailable

        });


    };







    const handleChange=(e)=>{


        setEditData({

            ...editData,

            [e.target.name]:e.target.value

        });


    };







    const saveUpdate = async(id)=>{


        try{


            await updateStoreProduct(

                id,

                editData

            );


            setEditId(null);


            loadProducts();


        }
        catch(error){

            console.log(error);

        }


    };







    const removeProduct = async(id)=>{


        try{


            await deleteStoreProduct(id);


            loadProducts();


        }
        catch(error){

            console.log(error);

        }


    };








    return(


        <div className="container mt-5">


            <h2 className="mb-4">
                My Store Products
            </h2>





            {
                products.length===0 ?

                (

                    <h5>
                        No products available
                    </h5>

                )

                :

                products.map((item)=>(


                    <div 
                    className="card shadow mb-3"
                    key={item.id}
                    >


                        <div className="card-body">


                            <h4>
                                {item.product.productName}
                            </h4>


                            <p>
                                Brand : {item.product.brand}
                            </p>





                            {
                                editId===item.id ?

                                (

                                    <>


                                    <input

                                    className="form-control mb-2"

                                    name="sellingPrice"

                                    value={editData.sellingPrice}

                                    onChange={handleChange}

                                    placeholder="Selling Price"

                                    />




                                    <input

                                    className="form-control mb-2"

                                    name="stockQuantity"

                                    value={editData.stockQuantity}

                                    onChange={handleChange}

                                    placeholder="Stock"

                                    />




                                    <input

                                    className="form-control mb-2"

                                    name="discountPercentage"

                                    value={editData.discountPercentage}

                                    onChange={handleChange}

                                    placeholder="Discount"

                                    />





                                    <select

                                    className="form-control mb-3"

                                    name="isAvailable"

                                    value={editData.isAvailable}

                                    onChange={handleChange}

                                    >


                                    <option value={true}>
                                        Available
                                    </option>


                                    <option value={false}>
                                        Not Available
                                    </option>


                                    </select>





                                    <button

                                    className="btn btn-success me-2"

                                    onClick={()=>saveUpdate(item.id)}

                                    >

                                        Save

                                    </button>




                                    <button

                                    className="btn btn-secondary"

                                    onClick={()=>setEditId(null)}

                                    >

                                        Cancel

                                    </button>


                                    </>


                                )

                                :

                                (

                                    <>


                                    <p>
                                        Selling Price :
                                        ₹ {item.sellingPrice}
                                    </p>


                                    <p>
                                        Stock :
                                        {item.stockQuantity}
                                    </p>


                                    <p>
                                        Discount :
                                        {item.discountPercentage}%
                                    </p>


                                    <p>
                                        Available :
                                        {
                                            item.isAvailable
                                            ?
                                            " Yes"
                                            :
                                            " No"
                                        }
                                    </p>





                                    <button

                                    className="btn btn-primary me-2"

                                    onClick={()=>startEdit(item)}

                                    >

                                        Edit

                                    </button>





                                    <button

                                    className="btn btn-danger"

                                    onClick={()=>removeProduct(item.id)}

                                    >

                                        Delete

                                    </button>


                                    </>

                                )

                            }



                        </div>


                    </div>


                ))

            }



        </div>


    );


}


export default MyStoreProducts;