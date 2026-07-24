import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiShoppingCart,
  FiPackage,
  FiMapPin,
  FiUser,
  FiArrowRight,
  FiHome
} from "react-icons/fi";

import "../styles/customerDashboard.css";

function CustomerDashboard() {

  const navigate = useNavigate();

  return (

    <div className="customer-dashboard">

      {/* Hero */}

      <div className="dashboard-hero">

        <div>

          <span className="hero-badge">
            👋 Welcome Back
          </span>

          <h1>
            Customer Dashboard
          </h1>

          <p>
            Fresh groceries from nearby stores delivered to your doorstep.
          </p>

        </div>

        <button
          className="btn btn-light btn-lg"
          onClick={() => navigate("/stores")}
        >
          Shop Now
        </button>

      </div>

      {/* Stats */}

      <div className="row g-4 mb-5">

        <div className="col-lg-3 col-md-6">

          <div className="stats-card">

            <FiShoppingBag className="stats-icon"/>

            <h3>Stores</h3>

            <p>Browse nearby stores</p>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="stats-card">

            <FiPackage className="stats-icon"/>

            <h3>Products</h3>

            <p>Fresh grocery items</p>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="stats-card">

            <FiShoppingCart className="stats-icon"/>

            <h3>Cart</h3>

            <p>Ready for checkout</p>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="stats-card">

            <FiPackage className="stats-icon"/>

            <h3>Orders</h3>

            <p>Track deliveries</p>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <h2 className="section-title">
        Quick Actions
      </h2>

      <div className="row g-4">

        <div className="col-lg-4 col-md-6">

          <div className="action-card">

            <FiShoppingBag className="action-icon"/>

            <h4>Stores</h4>

            <p>Browse nearby grocery stores.</p>

            <button
              className="btn btn-success"
              onClick={() => navigate("/stores")}
            >
              Open
              <FiArrowRight/>
            </button>

          </div>

        </div>

        <div className="col-lg-4 col-md-6">

          <div className="action-card">

            <FiPackage className="action-icon"/>

            <h4>Products</h4>

            <p>Explore all products.</p>

            <button
              className="btn btn-success"
              onClick={() => navigate("/products")}
            >
              Open
              <FiArrowRight/>
            </button>

          </div>

        </div>

        <div className="col-lg-4 col-md-6">

          <div className="action-card">

            <FiShoppingCart className="action-icon"/>

            <h4>Cart</h4>

            <p>Review your shopping cart.</p>

            <button
              className="btn btn-success"
              onClick={() => navigate("/cart")}
            >
              Open
              <FiArrowRight/>
            </button>

          </div>

        </div>

        <div className="col-lg-4 col-md-6">

          <div className="action-card">

            <FiPackage className="action-icon"/>

            <h4>Orders</h4>

            <p>Track your recent orders.</p>

            <button
              className="btn btn-success"
              onClick={() => navigate("/orders")}
            >
              Open
            </button>

          </div>

        </div>

        <div className="col-lg-4 col-md-6">

          <div className="action-card">

            <FiMapPin className="action-icon"/>

            <h4>Addresses</h4>

            <p>Manage delivery addresses.</p>

            <button
              className="btn btn-success"
              onClick={() => navigate("/addresses")}
            >
              Open
            </button>

          </div>

        </div>

        <div className="col-lg-4 col-md-6">

          <div className="action-card">

            <FiUser className="action-icon"/>

            <h4>Profile</h4>

            <p>Manage your account.</p>

            <button
              className="btn btn-success"
              onClick={() => navigate("/profile")}
            >
              Open
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CustomerDashboard;