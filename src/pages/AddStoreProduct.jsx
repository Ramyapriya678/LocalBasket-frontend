import { useState } from "react";

import {
    addStoreProduct
} from "../services/storeProductService";

import "./AddStoreProduct.css";


function AddStoreProduct() {


    const storeId = localStorage.getItem("storeId");


    const [product, setProduct] = useState({

        productName: "",
        category: "",
        sellingPrice: "",
        stockQuantity: "",
        discountPercentage: "",
        isAvailable: true

    });



    const handleChange = (e) => {

        const { name, value } = e.target;


        setProduct({

            ...product,

            [name]: value

        });

    };




    const saveProduct = async () => {


        if (!product.productName.trim()) {

            alert("Please enter product name");
            return;

        }


        if (!product.category.trim()) {

            alert("Please enter category");
            return;

        }


        if (!product.sellingPrice || Number(product.sellingPrice) <= 0) {

            alert("Enter a valid price");
            return;

        }


        if (!product.stockQuantity || Number(product.stockQuantity) < 0) {

            alert("Enter valid stock quantity");
            return;

        }




        try {


            const data = {


                storeId: Number(storeId),


                productName: product.productName,


                category: product.category,


                price: Number(product.sellingPrice),


                stock: Number(product.stockQuantity)


            };



            console.log("Sending Data:", data);



            await addStoreProduct(data);



            alert("Product Added Successfully");



            setProduct({

                productName: "",
                category: "",
                sellingPrice: "",
                stockQuantity: "",
                discountPercentage: "",
                isAvailable: true

            });


        }


        catch(error) {


            console.log("ERROR:", error);


            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            alert(

                error.response?.data ||

                "Failed to add product"

            );


        }


    };





    return (


        <div className="add-product-page">


            <div className="add-product-card">



                <h2>
                    Add Store Product
                </h2>



                <p>
                    Add a new product to your store inventory.
                </p>





                <div className="form-group">


                    <label>
                        Product
                    </label>



                    <input

                        type="text"

                        className="form-control"

                        name="productName"

                        value={product.productName}

                        onChange={handleChange}

                        placeholder="Enter product name"

                    />


                </div>






                <div className="form-group">


                    <label>
                        Category
                    </label>



                    <input

                        type="text"

                        className="form-control"

                        name="category"

                        value={product.category}

                        onChange={handleChange}

                        placeholder="Enter category"

                    />


                </div>






                <div className="form-group">


                    <label>
                        Selling Price
                    </label>



                    <input

                        type="number"

                        className="form-control"

                        name="sellingPrice"

                        value={product.sellingPrice}

                        onChange={handleChange}

                        placeholder="Enter selling price"

                    />


                </div>






                <div className="form-group">


                    <label>
                        Stock Quantity
                    </label>



                    <input

                        type="number"

                        className="form-control"

                        name="stockQuantity"

                        value={product.stockQuantity}

                        onChange={handleChange}

                        placeholder="Enter stock quantity"

                    />


                </div>






                <div className="form-group">


                    <label>
                        Discount (%)
                    </label>



                    <input

                        type="number"

                        className="form-control"

                        name="discountPercentage"

                        value={product.discountPercentage}

                        onChange={handleChange}

                        placeholder="Enter discount"

                    />


                </div>







                <button

                    className="save-btn"

                    onClick={saveProduct}

                >

                    Add Product

                </button>





            </div>


        </div>


    );


}


export default AddStoreProduct;