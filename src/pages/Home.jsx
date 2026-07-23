import { Link } from "react-router-dom";

function Home() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const dashboardLink =
        role === "ADMIN" ? "/admin-dashboard" :
        role === "STORE_OWNER" ? "/store-owner-dashboard" :
        role === "DELIVERY_PARTNER" ? "/delivery-dashboard" :
        "/customer-dashboard";

    return (
        <div>

            {/* Hero Section */}
            <div className="bg-success bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold text-success display-4 mb-3">
                        🧺 Welcome to LocalBasket
                    </h1>

                    <p className="lead text-muted mb-4">
                        Fresh groceries from local stores near you,
                        delivered straight to your door.
                    </p>

                    {!token ? (
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/register" className="btn btn-success btn-lg">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-outline-success btn-lg">
                                Login
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/stores" className="btn btn-success btn-lg">
                                Browse Stores
                            </Link>
                            <Link to={dashboardLink} className="btn btn-outline-success btn-lg">
                                Go to Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="container py-5">

                <h2 className="text-center fw-bold mb-5">
                    Why LocalBasket?
                </h2>

                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm text-center p-4">
                            <div style={{ fontSize: "2.5rem" }}>🏪</div>
                            <h5 className="fw-bold mt-3">Local Stores</h5>
                            <p className="text-muted mb-0">
                                Shop directly from stores in your neighborhood
                                and support your local community.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm text-center p-4">
                            <div style={{ fontSize: "2.5rem" }}>⚡</div>
                            <h5 className="fw-bold mt-3">Fast Delivery</h5>
                            <p className="text-muted mb-0">
                                Get your groceries delivered quickly by our
                                trusted delivery partners.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm text-center p-4">
                            <div style={{ fontSize: "2.5rem" }}>💳</div>
                            <h5 className="fw-bold mt-3">Easy Payments</h5>
                            <p className="text-muted mb-0">
                                Simple checkout and secure payment options,
                                every time you order.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* CTA Banner */}
            {!token && (
                <div className="bg-dark text-white text-center py-5">
                    <div className="container">
                        <h3 className="fw-bold mb-3">
                            Ready to start shopping?
                        </h3>
                        <p className="text-white-50 mb-4">
                            Create your free account and browse stores near you in seconds.
                        </p>
                        <Link to="/register" className="btn btn-success btn-lg">
                            Create Account
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Home;