import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import StoreList from "./pages/StoreList";
import ProductList from "./pages/ProductList";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Payments from "./pages/Payments";
import Delivery from "./pages/Delivery";

import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import Payment from "./pages/Payment";

import NotFound from "./pages/NotFound";


function App() {

  return (

    <BrowserRouter>

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


        {/* Store */}
        <Route 
          path="/stores" 
          element={<StoreList />} 
        />


        <Route
          path="/stores/:storeId/products"
          element={<ProductList />}
        />



        {/* Customer Pages */}
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
          path="/payments" 
          element={<Payments />} 
        />


        <Route 
          path="/delivery" 
          element={<Delivery />} 
        />

        <Route
    path="/orders/:id"
    element={<OrderDetails />}
/>

        <Route
    path="/delivery-dashboard"
    element={<DeliveryDashboard />}
/>
        <Route path="/payment" element={<Payment />} />

        {/* 404 */}
        <Route 
          path="*" 
          element={<NotFound />} 
        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;