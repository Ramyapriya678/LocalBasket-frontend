import { useState } from "react";
import { addStoreProduct } from "../services/storeProductService";


function AddStoreProduct() {


    const [product, setProduct] = useState({

        storeId: "",
        productId: "",
        sellingPrice: "",
        stockQuantity: "",
        discountPercentage: "",
        isAvailable: true

    });



    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };



    const saveProduct = async () => {


        try {


            const data = {


                store: {

                    id: Number(product.storeId)

                },


                product: {

                    id: Number(product.productId)

                },


                sellingPrice: Number(product.sellingPrice),


                stockQuantity: Number(product.stockQuantity),


                discountPercentage: Number(product.discountPercentage),


                isAvailable: product.isAvailable


            };



            console.log(
    "Sending Data:",
    JSON.stringify(data, null, 2)
);



            await addStoreProduct(data);



            alert("Product added successfully");



            setProduct({

                storeId: "",
                productId: "",
                sellingPrice: "",
                stockQuantity: "",
                discountPercentage: "",
                isAvailable: true

            });


        }
        catch(error) {


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Failed to add product"
            );


        }


    };



    return (

        <div className="container mt-5">


            <h2>
                Add Store Product
            </h2>



            <input

                className="form-control mb-3"

                name="storeId"

                placeholder="Store ID"

                value={product.storeId}

                onChange={handleChange}

            />



            <input

                className="form-control mb-3"

                name="productId"

                placeholder="Product ID"

                value={product.productId}

                onChange={handleChange}

            />



            <input

                className="form-control mb-3"

                name="sellingPrice"

                placeholder="Selling Price"

                value={product.sellingPrice}

                onChange={handleChange}

            />



            <input

                className="form-control mb-3"

                name="stockQuantity"

                placeholder="Stock Quantity"

                value={product.stockQuantity}

                onChange={handleChange}

            />



            <input

                className="form-control mb-3"

                name="discountPercentage"

                placeholder="Discount %"

                value={product.discountPercentage}

                onChange={handleChange}

            />



            <button

                className="btn btn-primary"

                onClick={saveProduct}

            >

                Add Product

            </button>



        </div>

    );

}


export default AddStoreProduct;