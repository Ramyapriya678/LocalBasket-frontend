import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(user);

            alert("Registration Successful. Please login.");

            console.log(response.data);

            navigate("/login");

        } catch (error) {

            console.error("Error:", error);

            if (error.response) {
                alert(
                    error.response.data.message ||
                    JSON.stringify(error.response.data)
                );
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

                    <h2>Join thousands shopping smarter, locally.</h2>
                    <p>Create your free account and get fresh groceries delivered from stores in your neighborhood.</p>

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

                    <h3 className="fw-bold mb-1">Create Account</h3>
                    <p className="text-muted mb-4">Join LocalBasket and start shopping</p>

                    <form onSubmit={handleSubmit}>

                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label small fw-semibold">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="John"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label small fw-semibold">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={user.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="you@example.com"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                placeholder="9876543210"
                                value={user.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="••••••••"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                            Register
                        </button>

                    </form>

                    <p className="text-center text-muted small mt-4 mb-0">
                        Already have an account?{" "}
                        <Link to="/login" className="text-success fw-semibold text-decoration-none">
                            Login
                        </Link>
                    </p>

                </div>
            </div>

        </div>

    );
}

export default Register;