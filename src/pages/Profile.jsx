import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/userService";

function Profile() {

    const userId = localStorage.getItem("userId");

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response = await getUserById(userId);
            setUser(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load profile");
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(userId, user);
            alert("Profile Updated Successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="container mt-4">

            <h2>My Profile</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Update Profile
                </button>

            </form>

        </div>
    );
}

export default Profile;