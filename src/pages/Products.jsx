import { useEffect, useState } from "react";
import { addToCart } from "../services/cartService";
import { getProductsByStore } from "../services/productService";


function Products() {


    const [products, setProducts] = useState([]);


    const storeId = 2;   // change later if user selects store



    useEffect(() => {

        loadProducts();

    }, []);



    const loadProducts = async () => {

        try {

            const response = await getProductsByStore(storeId);

            console.log("Store Products:", response.data);

            setProducts(response.data);


        } catch(error) {

            console.log(error);

        }

    };




    const handleAddToCart = async (storeProductId) => {


        const userId = localStorage.getItem("userId");


        if(!userId){

            alert("Please login first");

            return;

        }


        try {


            await addToCart(
                userId,
                storeProductId,
                1
            );


            alert("Product added to cart");


        } catch(error) {


            console.log(error);

            alert("Failed to add cart");


        }


    };




    return (

        <div className="container mt-4">


            <h2>
                Products
            </h2>



            {
                products.map((item)=>(


                    <div
                        className="card mb-3"
                        key={item.id}
                    >

                        <div className="card-body">


                            <h5>
                                {item.product?.productName}
                            </h5>


                            <p>
                                Brand: {item.product?.brand}
                            </p>


                            <p>
                                Description: {item.product?.description}
                            </p>


                            <p>
                                Unit: {item.product?.unit}
                            </p>


                            <p>
                                Price: ₹{item.sellingPrice}
                            </p>


                            <p>
                                Stock: {item.stockQuantity}
                            </p>



                            <button
                                className="btn btn-success"
                                onClick={() => handleAddToCart(item.id)}
                            >

                                Add to Cart

                            </button>



                        </div>


                    </div>


                ))
            }


        </div>

    );

}


export default Products;