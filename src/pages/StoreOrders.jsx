import { useEffect, useState } from "react";
import "./StoreOrders.css";

import {
    getOrdersByStore,
    updateOrderStatus
} from "../services/orderService";

import {
    FaShoppingBag,
    FaSearch,
    FaUser,
    FaRupeeSign,
    FaCalendarAlt,
    FaBoxOpen,
    FaCheckCircle,
    FaTruck,
    FaClipboardCheck
} from "react-icons/fa";

function StoreOrders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    const storeId = localStorage.getItem("storeId");

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const response = await getOrdersByStore(storeId);

            setOrders(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const changeStatus = async (id, status) => {

        try {

            await updateOrderStatus(id, status);

            loadOrders();

        }
        catch (error) {

            console.log(error);

        }

    };

    const filteredOrders = orders.filter(order =>

        order.id.toString().includes(search) ||

        order.user.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        order.user.lastName
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="orders-page">

            {/* Header */}

            <div className="orders-header">

                <div>

                    <h2>Store Orders</h2>

                    <p>
                        Manage customer orders efficiently.
                    </p>

                </div>

            </div>

            {/* Search */}

            <div className="orders-search">

                <FaSearch className="search-icon"/>

                <input

                    type="text"

                    placeholder="Search Order ID or Customer..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div>

            {/* Summary */}

            <div className="orders-summary">

                <div className="summary-card">

                    <h3>{orders.length}</h3>

                    <span>Total Orders</span>

                </div>

                <div className="summary-card">

                    <h3>

                        {

                            orders.filter(o=>o.status==="PLACED").length

                        }

                    </h3>

                    <span>Placed</span>

                </div>

                <div className="summary-card">

                    <h3>

                        {

                            orders.filter(o=>o.status==="PACKED").length

                        }

                    </h3>

                    <span>Packed</span>

                </div>

                <div className="summary-card">

                    <h3>

                        {

                            orders.filter(o=>o.status==="DELIVERED").length

                        }

                    </h3>

                    <span>Delivered</span>

                </div>

            </div>

            {/* Orders */}

            <div className="orders-grid">

            {

                filteredOrders.length===0 ?

                (

                    <h4>No Orders Found</h4>

                )

                :

                filteredOrders.map((order)=>(

                <div

                    className="order-card"

                    key={order.id}

                >

                    <div className="order-top">

                        <div>

                            <h3>

                                <FaShoppingBag />

                                {" "}Order #{order.id}

                            </h3>

                        </div>

                        <span className={`status ${order.status.toLowerCase()}`}>

                            {order.status}

                        </span>

                    </div>

                    <div className="order-info">

                        <p>

                            <FaUser />

                            Customer :

                            {order.user.firstName}

                            {" "}

                            {order.user.lastName}

                        </p>

                        <p>

                            <FaRupeeSign />

                            Amount :

                            ₹ {order.totalAmount}

                        </p>

                        <p>

                            <FaCalendarAlt />

                            {order.orderDate}

                        </p>

                    </div>

                    <div className="products-list">

                        <h4>

                            <FaBoxOpen />

                            Products

                        </h4>
                                                {

                            order.orderItems.map((item)=>(

                                <div
                                    className="product-item"
                                    key={item.id}
                                >

                                    <span>

                                        {item.storeProduct.product.productName}

                                    </span>

                                    <strong>

                                        Qty : {item.quantity}

                                    </strong>

                                </div>

                            ))

                        }

                    </div>

                    <div className="action-buttons">

                        {

                            order.status==="PLACED" &&

                            <button

                                className="confirm-btn"

                                onClick={()=>changeStatus(order.id,"CONFIRMED")}

                            >

                                <FaClipboardCheck />

                                Confirm

                            </button>

                        }

                        {

                            order.status==="CONFIRMED" &&

                            <button

                                className="pack-btn"

                                onClick={()=>changeStatus(order.id,"PACKED")}

                            >

                                <FaBoxOpen />

                                Pack Order

                            </button>

                        }

                        {

                            order.status==="PACKED" &&

                            <button

                                className="delivery-btn"

                                onClick={()=>changeStatus(order.id,"OUT_FOR_DELIVERY")}

                            >

                                <FaTruck />

                                Send Delivery

                            </button>

                        }

                        {

                            order.status==="OUT_FOR_DELIVERY" &&

                            <button

                                className="deliver-btn"

                                onClick={()=>changeStatus(order.id,"DELIVERED")}

                            >

                                <FaCheckCircle />

                                Mark Delivered

                            </button>

                        }

                    </div>

                </div>

                ))

            }

            </div>

        </div>

    );

}

export default StoreOrders;