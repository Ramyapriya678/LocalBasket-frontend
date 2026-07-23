import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductsByStore } from "../services/productService";
import { addToCart } from "../services/cartService";


function ProductList() {

    const { storeId } = useParams();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {

        if (storeId) {
            fetchProducts();
        }

    }, [storeId]);


    const fetchProducts = async () => {

        try {

            const response = await getProductsByStore(storeId);

            setProducts(response.data);

        } catch (error) {

            console.error("Product Error:", error);

            setError("Failed to load products");

        }

    };


    const handleAddToCart = async (storeProductId) => {

        try {

            const userId = localStorage.getItem("userId");


            if (!userId) {

                alert("Please login first");
                return;

            }


            await addToCart(
                userId,
                storeProductId,
                1
            );


            alert("Product added to cart");


        } catch (error) {

            console.error("Cart Error:", error);

            alert("Failed to add product to cart");

        }

    };



    return (

        <div className="container mt-4">


            <h2>Products</h2>


            {
                error && (

                    <p style={{color:"red"}}>
                        {error}
                    </p>

                )
            }



            {
                products.length > 0 ? (

                    products.map((item) => (

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
                                    Status: {item.product?.status}
                                </p>


                                <p>
                                    Price: ₹{item.sellingPrice}
                                </p>


                                <p>
                                    Discount: {item.discountPercentage}%
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

                ) : (

                    <p>No products available</p>

                )
            }


        </div>

    );

}


export default ProductList;