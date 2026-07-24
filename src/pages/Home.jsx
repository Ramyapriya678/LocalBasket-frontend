import { Link } from "react-router-dom";
import {
    FiArrowRight,
    FiShoppingBag,
    FiTruck,
    FiShield,
    FiStar,
    FiMapPin
} from "react-icons/fi";
import "./Home.css";

function Home() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const dashboardLink =
        role === "ADMIN"
            ? "/admin-dashboard"
            : role === "STORE_OWNER"
                ? "/store-owner-dashboard"
                : role === "DELIVERY_PARTNER"
                    ? "/delivery-dashboard"
                    : "/customer-dashboard";

    return (
        <>

            {/* Hero */}

            <section className="hero-section">

                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <span className="hero-badge">
                                🌿 Fresh • Local • Fast Delivery
                            </span>

                            <h1 className="hero-title">
                                Fresh Groceries
                                <br />
                                Delivered To
                                <span> Your Doorstep</span>
                            </h1>

                            <p className="hero-text">
                                Order vegetables, fruits, dairy products and
                                daily essentials from trusted local stores near you.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mt-4">

                                {!token ? (
                                    <>
                                        <Link
                                            to="/register"
                                            className="btn btn-success btn-lg hero-btn"
                                        >
                                            Get Started
                                            <FiArrowRight />
                                        </Link>

                                        <Link
                                            to="/stores"
                                            className="btn btn-outline-success btn-lg hero-btn-outline"
                                        >
                                            Browse Stores
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/stores"
                                            className="btn btn-success btn-lg hero-btn"
                                        >
                                            Shop Now
                                            <FiShoppingBag />
                                        </Link>

                                        <Link
                                            to={dashboardLink}
                                            className="btn btn-outline-success btn-lg hero-btn-outline"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                )}

                            </div>

                            <div className="hero-stats">

                                <div>
                                    <h3>500+</h3>
                                    <p>Products</p>
                                </div>

                                <div>
                                    <h3>50+</h3>
                                    <p>Stores</p>
                                </div>

                                <div>
                                    <h3>4.9★</h3>
                                    <p>Rating</p>
                                </div>

                            </div>

                        </div>

                        <div className="col-lg-6">

                            <div className="hero-card">

                                <div className="floating-card">

                                    <h5>🥬 Fresh Vegetables</h5>

                                    <p>Farm fresh every morning</p>

                                </div>

                                <div className="basket-circle">

                                    🧺

                                </div>

                                <div className="floating-card second">

                                    <h5>🍎 Fresh Fruits</h5>

                                    <p>Premium quality</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Categories */}

            <section className="container py-5">

                <div className="section-title">

                    <h2>Shop By Category</h2>

                    <p>Everything you need in one place.</p>

                </div>

                <div className="row g-4">

                    {[
                        "🥬 Vegetables",
                        "🍎 Fruits",
                        "🥛 Dairy",
                        "🍚 Groceries",
                        "🥖 Bakery",
                        "🥤 Beverages"
                    ].map((item) => (

                        <div className="col-lg-2 col-md-4 col-6" key={item}>

                            <div className="category-card">

                                <h4>{item.split(" ")[0]}</h4>

                                <span>{item.substring(2)}</span>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* Why Choose */}

            <section className="container pb-5">

                <div className="section-title">

                    <h2>Why Choose LocalBasket?</h2>

                </div>

                <div className="row g-4">

                    <div className="col-lg-4">

                        <div className="feature-card">

                            <FiMapPin className="feature-icon" />

                            <h4>Nearby Stores</h4>

                            <p>
                                Shop directly from trusted local grocery stores.
                            </p>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="feature-card">

                            <FiTruck className="feature-icon" />

                            <h4>Fast Delivery</h4>

                            <p>
                                Groceries delivered quickly to your doorstep.
                            </p>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="feature-card">

                            <FiShield className="feature-icon" />

                            <h4>Secure Payments</h4>

                            <p>
                                Safe checkout with reliable payment methods.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Featured */}

            <section className="featured-section">

                <div className="container">

                    <div className="section-title text-white">

                        <h2>Featured Stores</h2>

                    </div>

                    <div className="row g-4">

                        {[
                            "Fresh Mart",
                            "Green Basket",
                            "Daily Needs"
                        ].map((store) => (

                            <div className="col-lg-4" key={store}>

                                <div className="store-card">

                                    <div className="store-image">

                                        🏪

                                    </div>

                                    <h4>{store}</h4>

                                    <p>

                                        <FiStar />

                                        4.8 Rating

                                    </p>

                                    <Link
                                        to="/stores"
                                        className="btn btn-success"
                                    >
                                        Visit Store
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {!token && (

                <section className="cta-section">

                    <div className="container text-center">

                        <h2>Ready To Start Shopping?</h2>

                        <p>
                            Join thousands of customers using LocalBasket.
                        </p>

                        <Link
                            to="/register"
                            className="btn btn-light btn-lg px-5"
                        >
                            Create Free Account
                        </Link>

                    </div>

                </section>

            )}

        </>
    );
}

export default Home;