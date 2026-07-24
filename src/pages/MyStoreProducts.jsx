import { useEffect, useState } from "react";
import axios from "axios";
import "./MyStoreProducts.css";

import {
    updateStoreProduct,
    deleteStoreProduct
} from "../services/storeProductService";

import {
    FaBoxOpen,
    FaEdit,
    FaTrash,
    FaSearch,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

function MyStoreProducts() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

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

    const startEdit=(item)=>{

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

    const saveUpdate=async(id)=>{

        try{

            await updateStoreProduct(id,editData);

            setEditId(null);

            loadProducts();

        }
        catch(error){

            console.log(error);

        }

    };

    const removeProduct=async(id)=>{

        try{

            await deleteStoreProduct(id);

            loadProducts();

        }
        catch(error){

            console.log(error);

        }

    };

    const filteredProducts = products.filter(item =>
        item.product.productName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return(

    <div className="products-page">

        <div className="products-header">

            <div>

                <h2>My Store Products</h2>

                <p>
                    Manage your inventory and products.
                </p>

            </div>

        </div>

        <div className="search-box">

            <FaSearch/>

            <input

                type="text"

                placeholder="Search Product..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

        </div>

        <div className="product-summary">

            <div className="summary-box">

                <h3>{products.length}</h3>

                <span>Total Products</span>

            </div>

            <div className="summary-box">

                <h3>

                    {products.filter(p=>p.isAvailable).length}

                </h3>

                <span>Available</span>

            </div>

            <div className="summary-box">

                <h3>

                    {products.filter(p=>!p.isAvailable).length}

                </h3>

                <span>Unavailable</span>

            </div>

        </div>

        <div className="products-grid">

        {

            filteredProducts.length===0 ?

            (

                <h4>No Products Found</h4>

            )

            :

            filteredProducts.map((item)=>(

            <div

                className="product-card"

                key={item.id}

            >

                <div className="product-top">

                    <FaBoxOpen className="product-icon"/>

                    <div>

                        <h3>

                            {item.product.productName}

                        </h3>

                        <p>

                            {item.product.brand}

                        </p>

                    </div>

                </div>

                                {

                    editId===item.id ?

                    (

                        <>

                            <input
                                className="edit-input"
                                name="sellingPrice"
                                value={editData.sellingPrice}
                                onChange={handleChange}
                                placeholder="Selling Price"
                            />

                            <input
                                className="edit-input"
                                name="stockQuantity"
                                value={editData.stockQuantity}
                                onChange={handleChange}
                                placeholder="Stock Quantity"
                            />

                            <input
                                className="edit-input"
                                name="discountPercentage"
                                value={editData.discountPercentage}
                                onChange={handleChange}
                                placeholder="Discount %"
                            />

                            <select
                                className="edit-input"
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

                            <div className="button-group">

                                <button
                                    className="save-btn"
                                    onClick={()=>saveUpdate(item.id)}
                                >
                                    Save
                                </button>

                                <button
                                    className="cancel-btn"
                                    onClick={()=>setEditId(null)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </>

                    )

                    :

                    (

                        <>

                            <div className="product-info">

                                <p>

                                    <strong>Price :</strong>

                                    ₹ {item.sellingPrice}

                                </p>

                                <p>

                                    <strong>Stock :</strong>

                                    {item.stockQuantity}

                                </p>

                                <p>

                                    <strong>Discount :</strong>

                                    {item.discountPercentage}%

                                </p>

                            </div>

                            <div className="status-row">

                                {

                                    item.isAvailable ?

                                    <span className="available">

                                        <FaCheckCircle />

                                        Available

                                    </span>

                                    :

                                    <span className="unavailable">

                                        <FaTimesCircle />

                                        Not Available

                                    </span>

                                }

                            </div>

                            <div className="button-group">

                                <button
                                    className="edit-btn"
                                    onClick={()=>startEdit(item)}
                                >

                                    <FaEdit />

                                    Edit

                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={()=>removeProduct(item.id)}
                                >

                                    <FaTrash />

                                    Delete

                                </button>

                            </div>

                        </>

                    )

                }

            </div>

            ))

        }

        </div>

    </div>

    );

}

export default MyStoreProducts;