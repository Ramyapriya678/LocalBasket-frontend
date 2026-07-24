import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiLock,
    FiArrowRight,
    FiEye,
    FiEyeOff
} from "react-icons/fi";
import "./Auth.css";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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

            await registerUser(user);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Cannot connect to backend");
            }

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-left">

                <div className="auth-left-content">

                    <div className="auth-logo">
                        🧺 LocalBasket
                    </div>

                    <h2>
                        Start Shopping
                        <br />
                        Smarter Today
                    </h2>

                    <p>
                        Join thousands of happy customers buying fresh groceries
                        from trusted stores near them.
                    </p>

                    <div className="auth-feature">
                        <div className="auth-feature-icon">🏪</div>
                        <span>50+ Trusted Local Stores</span>
                    </div>

                    <div className="auth-feature">
                        <div className="auth-feature-icon">🚚</div>
                        <span>Fast Doorstep Delivery</span>
                    </div>

                    <div className="auth-feature">
                        <div className="auth-feature-icon">⭐</div>
                        <span>Thousands of Happy Customers</span>
                    </div>

                </div>

            </div>

            <div className="auth-right">

                <div className="auth-form-box">

                    <h3>Create Account</h3>

                    <p className="text-muted mb-4">
                        Create your free account
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    First Name
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <FiUser />
                                    </span>

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

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Last Name
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <FiUser />
                                    </span>

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

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">
                                    <FiMail />
                                </span>

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

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Phone
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">
                                    <FiPhone />
                                </span>

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

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Password
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">
                                    <FiLock />
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="input-group-text bg-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>

                            </div>

                        </div>

                        <button
                            className="btn btn-success w-100 btn-lg d-flex align-items-center justify-content-center gap-2"
                        >
                            Create Account
                            <FiArrowRight />
                        </button>

                    </form>

                    <div className="text-center mt-4">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ms-2 fw-bold text-success text-decoration-none"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;