import { useEffect, useMemo, useState } from "react";
import {
    FiSearch,
    FiShoppingCart,
    FiPackage,
    FiFilter
} from "react-icons/fi";

import { addToCart } from "../services/cartService";
import { getProductsByStore } from "../services/productService";
import "../styles/products.css";

function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    // TODO: Replace with selected store later
    const storeId = 2;

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response = await getProductsByStore(storeId);

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredProducts = useMemo(() => {

        return products.filter((item) => {

            const name = item.product?.productName?.toLowerCase() || "";
            const brand = item.product?.brand?.toLowerCase() || "";

            return (
                name.includes(search.toLowerCase()) ||
                brand.includes(search.toLowerCase())
            );

        });

    }, [products, search]);

    const handleAddToCart = async (storeProductId) => {

        const userId = localStorage.getItem("userId");

        if (!userId) {

            alert("Please login first");

            return;

        }

        try {

            await addToCart(userId, storeProductId, 1);

            alert("Product added to cart");

        } catch (error) {

            console.log(error);

            alert("Failed to add cart");

        }

    };

    return (

        <div className="products-page">

            <div className="container">

                {/* Hero */}

                <div className="products-hero">

                    <div>

                        <span className="hero-tag">
                            🌿 Fresh Grocery Collection
                        </span>

                        <h1>
                            Shop Fresh Products
                        </h1>

                        <p>
                            Fresh vegetables, fruits, groceries and daily essentials from trusted local stores.
                        </p>

                    </div>

                    <div className="hero-count">

                        <FiPackage />

                        <div>

                            <h3>{filteredProducts.length}</h3>

                            <span>Products Available</span>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="search-section">

                    <div className="search-box">

                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search products or brands..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <button className="filter-btn">

                        <FiFilter />

                        Filter

                    </button>

                </div>

                {/* Products */}

                <div className="row g-4">

                    {filteredProducts.length === 0 ? (

                        <div className="col-12">

                            <div className="empty-products">

                                <h3>No Products Found</h3>

                            </div>

                        </div>

                    ) : (

                        filteredProducts.map((item) => (

                            <div
                                className="col-xl-3 col-lg-4 col-md-6"
                                key={item.id}
                            >

                                <div className="product-card">

                                    <div className="product-image">

                                        🛒

                                    </div>

                                    <div className="product-body">

                                        <span className="brand">

                                            {item.product?.brand}

                                        </span>

                                        <h4>

                                            {item.product?.productName}

                                        </h4>

                                        <p>

                                            {item.product?.description}

                                        </p>

                                        <div className="product-meta">

                                            <span className="price">

                                                ₹{item.sellingPrice}

                                            </span>

                                            <span className="unit">

                                                {item.product?.unit}

                                            </span>

                                        </div>

                                        <div className="stock-row">

                                            {item.stockQuantity > 0 ? (

                                                <span className="stock in-stock">

                                                    In Stock ({item.stockQuantity})

                                                </span>

                                            ) : (

                                                <span className="stock out-stock">

                                                    Out of Stock

                                                </span>

                                            )}

                                        </div>

                                        <button
                                            className="btn btn-success w-100 mt-3"
                                            disabled={item.stockQuantity <= 0}
                                            onClick={() => handleAddToCart(item.id)}
                                        >

                                            <FiShoppingCart />

                                            Add To Cart

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}

export default Products;