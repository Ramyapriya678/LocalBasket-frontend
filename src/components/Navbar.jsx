import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiMapPin } from "react-icons/fi";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-expand-lg sticky-top"
            style={{
                background: "var(--lb-surface)",
                borderBottom: "1px solid var(--lb-border)",
                boxShadow: "var(--lb-shadow-sm)",
                padding: "12px 0",
            }}
        >
            <div className="container">
                <Link
                    className="navbar-brand fw-bold d-flex align-items-center gap-2"
                    to="/"
                    style={{ color: "var(--lb-text)", fontSize: "1.4rem" }}
                >
                    <span
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: 34,
                            height: 34,
                            background: "var(--lb-green)",
                            borderRadius: "var(--lb-radius-sm)",
                            fontSize: "1.1rem",
                        }}
                    >
                        🧺
                    </span>
                    LocalBasket
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/stores">
                                Stores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/products">
                                Products
                            </Link>
                        </li>

                        {token && role === "CUSTOMER" && (
                            <li className="nav-item">
                                <Link className="nav-link fw-medium" to="/orders">
                                    My Orders
                                </Link>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                        {token && role === "CUSTOMER" && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link d-flex align-items-center gap-1 fw-medium"
                                    to="/cart"
                                >
                                    <FiShoppingCart size={18} />
                                    Cart
                                </Link>
                            </li>
                        )}

                        {token && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link d-flex align-items-center gap-1 fw-medium"
                                    to="/addresses"
                                >
                                    <FiMapPin size={18} />
                                    Addresses
                                </Link>
                            </li>
                        )}

                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fw-medium" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="btn btn-success btn-sm px-3 ms-lg-2"
                                        to="/register"
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link d-flex align-items-center gap-1 fw-medium"
                                        to="/profile"
                                    >
                                        <FiUser size={18} />
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 ms-lg-2"
                                        onClick={handleLogout}
                                    >
                                        <FiLogOut size={16} />
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;