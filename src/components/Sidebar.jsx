import React from "react";
import {
    FaTh,
    FaList,
    FaHeart,
    FaShoppingCart,
    FaComments,
    FaFire,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/dashboard.css";


function Sidebar() {

    return (
        <div className="sidebar">

            <h2 className="logo">
                🌿 LocalBasket
            </h2>


            <div className="menu active">
                <FaTh />
                <span>Dashboard</span>
            </div>


            <div className="menu">
                <FaList />
                <span>Categories</span>
            </div>


            <div className="menu">
                <FaHeart />
                <span>Favourite</span>
            </div>


            <div className="menu">
                <FaShoppingCart />
                <span>Orders</span>
            </div>


            <div className="menu">
                <FaComments />
                <span>Messages</span>
            </div>


            <div className="menu">
                <FaFire />
                <span>Top Deals</span>
            </div>


            <div className="menu">
                <FaCog />
                <span>Settings</span>
            </div>


            <div className="logout">
                <FaSignOutAlt/>
                Logout
            </div>


        </div>
    );
}


export default Sidebar;