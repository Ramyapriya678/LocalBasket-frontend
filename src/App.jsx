import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import StoreList from "./pages/StoreList";
import ProductList from "./pages/ProductList";

import Products from "./pages/Products";
import Cart from "./pages/Cart";

import Delivery from "./pages/Delivery";

import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import DeliveryDashboard from "./pages/DeliveryDashboard";
import Payment from "./pages/Payment";

import CustomerDashboard from "./pages/CustomerDashboard";
import Profile from "./pages/Profile";
import Address from "./pages/Address";

import ManageStores from "./pages/ManageStores";
import ManageUsers from "./pages/ManageUsers";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";

import ProtectedRoute from "./components/ProtectedRoute";

import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import MyStoreProducts from "./pages/MyStoreProducts";
import AddStoreProduct from "./pages/AddStoreProduct";
import StoreOrders from "./pages/StoreOrders";
import AssignDelivery from "./pages/AssignDelivery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import NotFound from "./pages/NotFound";


function App() {


    return (

        <BrowserRouter>

            <Navbar />

            <div style={{ minHeight: "80vh" }}>

            <Routes>


                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />



                {/* Authentication */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />



                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />



                {/* Stores */}

                <Route
                    path="/stores"
                    element={<StoreList />}
                />


                <Route
                    path="/stores/:storeId/products"
                    element={<ProductList />}
                />



                {/* Customer */}

                <Route
                    path="/products"
                    element={<Products />}
                />


                <Route
                    path="/cart"
                    element={<Cart />}
                />


                <Route
                    path="/orders"
                    element={<MyOrders />}
                />


                <Route
                    path="/orders/:id"
                    element={<OrderDetails />}
                />



                {/* Payment */}

                <Route
                    path="/payment"
                    element={<Payment />}
                />



                {/* Delivery */}

                <Route
                    path="/delivery"
                    element={<Delivery />}
                />


                <Route
                    path="/delivery-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["DELIVERY_PARTNER"]}>
                            <DeliveryDashboard />
                        </ProtectedRoute>
                    }
                />



                {/* Customer Dashboard */}

                <Route
                    path="/customer-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />



                {/* Profile */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />


                <Route
                    path="/addresses"
                    element={<Address />}
                />



                {/* Admin */}

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/manage-users"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/manage-stores"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageStores />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/manage-products"
                    element={<ManageProducts />}
                />


                <Route
                    path="/manage-orders"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageOrders />
                        </ProtectedRoute>
                    }
                />



                {/* Store Owner */}

                <Route
                    path="/store-owner-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                            <StoreOwnerDashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/add-store-product"
                    element={
                        <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                            <AddStoreProduct />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/my-store-products"
                    element={
                        <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                            <MyStoreProducts />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/store-orders"
                    element={
                        <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
                            <StoreOrders />
                        </ProtectedRoute>
                    }
                />
            <Route
    path="/assign-delivery"
    element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AssignDelivery />
        </ProtectedRoute>
    }
/>


                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />


            </Routes>

            </div>

            <Footer />

        </BrowserRouter>

    );

}


export default App;