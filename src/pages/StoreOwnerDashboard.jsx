import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  FaStore,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
  FaPlus,
  FaClipboardList,
} from "react-icons/fa";

import "./StoreOwnerDashboard.css";

function StoreOwnerDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const ownerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/store-owner/dashboard/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);

      localStorage.setItem("storeId", response.data.storeId);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="owner-dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h2>Store Owner Dashboard</h2>

          <p>
            Welcome back! Here's your business overview.
          </p>
        </div>

        <div className="dashboard-actions">

          <Link
            to="/add-store-product"
            className="action-btn green"
          >
            <FaPlus />
            Add Product
          </Link>

          <Link
            to="/my-store-products"
            className="action-btn orange"
          >
            <FaBoxOpen />
            Products
          </Link>

          <Link
            to="/store-orders"
            className="action-btn blue"
          >
            <FaClipboardList />
            Orders
          </Link>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="stats-grid">

        <div className="stat-card">
          <FaStore className="stat-icon green" />
          <h4>{dashboard.storeName}</h4>
          <p>Store Name</p>
        </div>

        <div className="stat-card">
          <FaBoxOpen className="stat-icon blue" />
          <h4>{dashboard.totalProducts}</h4>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <FaWarehouse className="stat-icon orange" />
          <h4>{dashboard.availableProducts}</h4>
          <p>Available Stock</p>
        </div>

        <div className="stat-card">
          <FaWarehouse className="stat-icon red" />
          <h4>{dashboard.outOfStockProducts}</h4>
          <p>Out Of Stock</p>
        </div>

        <div className="stat-card">
          <FaShoppingCart className="stat-icon purple" />
          <h4>{dashboard.totalOrders}</h4>
          <p>Total Orders</p>
        </div>

        <div className="stat-card">
          <FaClock className="stat-icon yellow" />
          <h4>{dashboard.pendingOrders}</h4>
          <p>Pending Orders</p>
        </div>

        <div className="stat-card">
          <FaCheckCircle className="stat-icon green" />
          <h4>{dashboard.completedOrders}</h4>
          <p>Completed Orders</p>
        </div>

        <div className="stat-card revenue-card">
          <FaRupeeSign className="stat-icon white" />
          <h4>₹ {dashboard.totalRevenue}</h4>
          <p>Total Revenue</p>
        </div>

      </div>

            {/* Dashboard Bottom Section */}

      <div className="bottom-grid">

        {/* Business Summary */}

        <div className="summary-card">

          <h3>Business Summary</h3>

          <div className="summary-row">
            <span>Store Name</span>
            <strong>{dashboard.storeName}</strong>
          </div>

          <div className="summary-row">
            <span>Total Revenue</span>
            <strong>₹ {dashboard.totalRevenue}</strong>
          </div>

          <div className="summary-row">
            <span>Total Products</span>
            <strong>{dashboard.totalProducts}</strong>
          </div>

          <div className="summary-row">
            <span>Total Orders</span>
            <strong>{dashboard.totalOrders}</strong>
          </div>

        </div>

        {/* Performance Overview */}

        <div className="performance-card">

          <h3>Performance Overview</h3>

          <div className="performance-grid">

            <div>
              <h4>{dashboard.completedOrders}</h4>
              <p>Completed Orders</p>
            </div>

            <div>
              <h4>{dashboard.pendingOrders}</h4>
              <p>Pending Orders</p>
            </div>

            <div>
              <h4>{dashboard.availableProducts}</h4>
              <p>Available Products</p>
            </div>

            <div>
              <h4>{dashboard.outOfStockProducts}</h4>
              <p>Out Of Stock</p>
            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="activity-card">

          <h3>Recent Activity</h3>

          <ul>

            <li>✅ {dashboard.completedOrders} Orders Completed</li>

            <li>🟡 {dashboard.pendingOrders} Orders Pending</li>

            <li>📦 {dashboard.availableProducts} Products Available</li>

            <li>❌ {dashboard.outOfStockProducts} Products Out Of Stock</li>

            <li>💰 Revenue Generated ₹ {dashboard.totalRevenue}</li>

          </ul>

        </div>

        {/* Quick Actions */}

        <div className="quick-section">

          <h3>Quick Actions</h3>

          <div className="quick-grid">

            <Link
              to="/add-store-product"
              className="quick-card"
            >
              <FaPlus />
              <span>Add Product</span>
            </Link>

            <Link
              to="/my-store-products"
              className="quick-card"
            >
              <FaBoxOpen />
              <span>Manage Products</span>
            </Link>

            <Link
              to="/store-orders"
              className="quick-card"
            >
              <FaShoppingCart />
              <span>View Orders</span>
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default StoreOwnerDashboard;