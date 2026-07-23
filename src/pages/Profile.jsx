import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/userService";
import "../styles/profile.css";

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

        <div className="profile-page">

            <div className="profile-card">

                <h2>👤 My Profile</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className="profile-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className="profile-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="profile-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="profile-input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="update-btn"
                    >
                        Update Profile
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Profile;