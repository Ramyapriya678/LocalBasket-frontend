import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductsByStore } from "../services/productService";
import { addToCart } from "../services/cartService";

import "../styles/productList.css";


function ProductList() {

    const { storeId } = useParams();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");



    useEffect(() => {

        if(storeId){
            fetchProducts();
        }

    },[storeId]);



    const fetchProducts = async()=>{

        try{

            const response =
            await getProductsByStore(storeId);

            setProducts(response.data);

        }
        catch(error){

            console.error("Product Error:",error);

            setError("Failed to load products");

        }

    };




    const handleAddToCart = async(storeProductId)=>{


        try{


            const userId =
            localStorage.getItem("userId");



            if(!userId){

                alert("Please login first");
                return;

            }



            await addToCart(
                userId,
                storeProductId,
                1
            );


            alert("Product added to cart");


        }
        catch(error){

            console.error("Cart Error:",error);

            alert("Failed to add product to cart");

        }


    };





    return(


        <div className="products-page">


            <h2>
                🥦 Available Products
            </h2>



            {
                error &&
                <p className="error">
                    {error}
                </p>
            }




            <div className="product-grid">


            {
                products.length > 0 ?


                products.map((item)=>(


                    <div 
                    className="product-card"
                    key={item.id}
                    >


                        <h4>
                            {item.product?.productName}
                        </h4>



                        <p>
                            Brand:
                            {item.product?.brand}
                        </p>



                        <p>
                            {item.product?.description}
                        </p>



                        <p>
                            Unit:
                            {item.product?.unit}
                        </p>



                        <h3>
                            ₹{item.sellingPrice}
                        </h3>



                        <p>
                            Stock:
                            {item.stockQuantity}
                        </p>



                        <button

                        className="cart-btn"

                        onClick={()=>
                            handleAddToCart(item.id)
                        }

                        >

                            🛒 Add To Cart

                        </button>



                    </div>


                ))


                :

                <p>
                    No products available
                </p>


            }


            </div>


        </div>


    );


}


export default ProductList;