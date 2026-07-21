import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoreProducts } from "../services/storeService";
import { addToCart } from "../services/cartService";

function ProductList() {

    const { storeId } = useParams();

    const [products, setProducts] = useState([]);

    // Get logged-in user id
    const userId = localStorage.getItem("userId");


    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {

        try {

            const response = await getStoreProducts(storeId);

            console.log(response.data);

            setProducts(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load products.");

        }

    };


    const handleAddToCart = async (storeProductId) => {

        try {

            await addToCart(
                userId,
                storeProductId,
                1
            );

            alert("Product added to cart");

        } catch (error) {

            console.error(error);

            alert("Failed to add product to cart");

        }

    };


    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Store Products
            </h2>


            <div className="row">

                {products.length > 0 ? (

                    products.map((item) => (

                        <div 
                            className="col-md-4 mb-4" 
                            key={item.id}
                        >

                            <div className="card shadow h-100">

                                <div className="card-body">


                                    <h5 className="card-title">
                                        {item.product.productName}
                                    </h5>


                                    <p>
                                        <strong>Brand:</strong> {item.product.brand}
                                    </p>


                                    <p>
                                        <strong>Unit:</strong> {item.product.unit}
                                    </p>


                                    <p>
                                        <strong>Price:</strong> ₹{item.sellingPrice}
                                    </p>


                                    <p>
                                        <strong>Discount:</strong> {item.discountPercentage}%
                                    </p>


                                    <p>
                                        <strong>Stock:</strong> {item.stockQuantity}
                                    </p>


                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => handleAddToCart(item.id)}
                                    >
                                        Add to Cart
                                    </button>


                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <h5>No Products Available</h5>

                )}

            </div>

        </div>

    );

}

export default ProductList;