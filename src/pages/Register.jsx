import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {

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

        console.log("Sending User:", user);

        try {

            const response = await registerUser(user);

            alert("Registration Successful");

            console.log(response.data);

        } catch (error) {

            console.error("Error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

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
        <div className="container mt-5">

            <h2>User Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    className="form-control mb-3"
                    name="firstName"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    name="lastName"
                    placeholder="Last Name"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    name="phone"
                    placeholder="Phone Number"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;