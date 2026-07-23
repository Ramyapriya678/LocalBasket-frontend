import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

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

            console.log("LOGIN RESPONSE:");
            console.log(JSON.stringify(response.data, null, 2));

            // Save JWT Token
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Save User Id
            localStorage.setItem(
                "userId",
                response.data.userId
            );

            // Save Role
            localStorage.setItem(
                "role",
                response.data.role
            );
// Save Store ID
if (response.data.storeId) {
    localStorage.setItem(
        "storeId",
        response.data.storeId
    );
}
            // Save Delivery Partner ID
if (response.data.deliveryPartnerId) {
    localStorage.setItem(
        "deliveryPartnerId",
        response.data.deliveryPartnerId
    );
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

        <div className="container mt-5">

            <h2>User Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;
