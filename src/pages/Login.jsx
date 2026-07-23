import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(loginData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);

            if (response.data.storeId) {
                localStorage.setItem("storeId", response.data.storeId);
            }

            if (response.data.deliveryPartnerId) {
                localStorage.setItem("deliveryPartnerId", response.data.deliveryPartnerId);
            }

            alert("Login Successful");

            const role = response.data.role;

            if (role === "ADMIN") {
                navigate("/admin-dashboard");
            }
            else if (role === "STORE_OWNER") {
                navigate("/store-owner-dashboard");
            }
            else if (role === "DELIVERY_PARTNER") {
                navigate("/delivery-dashboard");
            }
            else {
                navigate("/customer-dashboard");
            }

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message || "Login Failed");
            } else {
                alert("Cannot connect to backend");
            }
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-left">
                <div className="auth-left-content">

                    <div className="auth-logo">🧺 LocalBasket</div>

                    <h2>Fresh groceries, delivered from stores near you.</h2>
                    <p>Login to track orders, manage your cart, and shop from your favorite local stores.</p>

                    <div className="auth-feature">
                        <div className="auth-feature-icon">🏪</div>
                        <span>Shop from trusted local stores</span>
                    </div>

                    <div className="auth-feature">
                        <div className="auth-feature-icon">⚡</div>
                        <span>Fast, reliable delivery</span>
                    </div>

                    <div className="auth-feature">
                        <div className="auth-feature-icon">🔒</div>
                        <span>Secure account & payments</span>
                    </div>

                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-box">

                    <h3 className="fw-bold mb-1">Welcome Back</h3>
                    <p className="text-muted mb-4">Login to your account</p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="you@example.com"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                            Login
                        </button>

                    </form>

                    <p className="text-center text-muted small mt-4 mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-success fw-semibold text-decoration-none">
                            Register
                        </Link>
                    </p>

                </div>
            </div>

        </div>

    );

}

export default Login;