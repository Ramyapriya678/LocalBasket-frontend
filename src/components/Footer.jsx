import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

function Footer() {
    return (
        <footer
            className="mt-auto pt-5 pb-4"
            style={{
                background: "var(--lb-surface)",
                borderTop: "1px solid var(--lb-border)",
            }}
        >
            <div className="container">
                <div className="row g-4">
                    <div className="col-6 col-md-3">
                        <p className="fw-bold d-flex align-items-center gap-2 mb-3">
                            <span
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: 28,
                                    height: 28,
                                    background: "var(--lb-green)",
                                    borderRadius: "var(--lb-radius-sm)",
                                    fontSize: "0.9rem",
                                }}
                            >
                                🧺
                            </span>
                            LocalBasket
                        </p>
                        <p className="lb-text-muted small mb-0">
                            Fresh groceries from local stores, delivered to your door.
                        </p>
                    </div>

                    <div className="col-6 col-md-3">
                        <p className="fw-semibold mb-3">Shop</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li><Link to="/stores" className="lb-text-muted">Browse Stores</Link></li>
                            <li><Link to="/products" className="lb-text-muted">All Products</Link></li>
                            <li><Link to="/cart" className="lb-text-muted">My Cart</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <p className="fw-semibold mb-3">Account</p>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li><Link to="/profile" className="lb-text-muted">Profile</Link></li>
                            <li><Link to="/orders" className="lb-text-muted">My Orders</Link></li>
                            <li><Link to="/addresses" className="lb-text-muted">Addresses</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <p className="fw-semibold mb-3">Follow us</p>
                        <div className="d-flex gap-3 lb-text-muted">
                            <FiInstagram size={18} />
                            <FiTwitter size={18} />
                            <FiFacebook size={18} />
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "var(--lb-border)", margin: "32px 0 16px" }} />

                <p className="text-center lb-text-muted small mb-0">
                    © {new Date().getFullYear()} LocalBasket. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;