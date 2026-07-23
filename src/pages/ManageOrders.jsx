import { useEffect, useState } from "react";

import {
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from "../services/orderService";


function ManageOrders() {


    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    const ordersPerPage = 5;



    useEffect(() => {

        loadOrders();

    }, []);



    const loadOrders = async () => {

        try {

            const response = await getAllOrders();

            setOrders(response.data);


        } catch(error) {

            console.error(error);

            alert("Failed to load orders");

        }

    };



    const handleStatusChange = async (id, status) => {

        try {

            await updateOrderStatus(id, status);

            loadOrders();


        } catch(error) {

            console.error(error);

            alert("Failed to update status");

        }

    };



    const handleDelete = async (id) => {


        if(!window.confirm("Delete this order?")){

            return;

        }


        try {

            await deleteOrder(id);

            alert("Order deleted successfully");

            loadOrders();


        } catch(error) {

            console.error(error);

            alert("Failed to delete order");

        }

    };




    const filteredOrders = orders.filter((order)=>{


        const customer =

            `${order.user?.firstName || ""} ${order.user?.lastName || ""}`
            .toLowerCase();



        const store =

            order.store?.storeName?.toLowerCase() || "";



        const status =

            order.status?.toLowerCase() || "";



        const searchText =
            search.toLowerCase();



        return (

            customer.includes(searchText) ||

            store.includes(searchText) ||

            status.includes(searchText)

        );


    });




    const indexOfLastOrder =
        currentPage * ordersPerPage;



    const indexOfFirstOrder =
        indexOfLastOrder - ordersPerPage;



    const currentOrders =
        filteredOrders.slice(
            indexOfFirstOrder,
            indexOfLastOrder
        );



    const totalPages =
        Math.ceil(
            filteredOrders.length / ordersPerPage
        );




    return (

        <div className="container mt-5">


            <h2 className="mb-4">
                Manage Orders
            </h2>



            <input

                type="text"

                className="form-control mb-4"

                placeholder="Search by customer, store or status..."

                value={search}

                onChange={(e)=>{

                    setSearch(e.target.value);

                    setCurrentPage(1);

                }}

            />



            <table className="table table-bordered table-hover">


                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Customer</th>

                        <th>Store</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Delete</th>

                    </tr>

                </thead>



                <tbody>


                {

                    currentOrders.map((order)=>(


                        <tr key={order.id}>


                            <td>
                                {order.id}
                            </td>


                            <td>

                                {order.user?.firstName}{" "}
                                {order.user?.lastName}

                            </td>


                            <td>

                                {order.store?.storeName}

                            </td>


                            <td>

                                ₹{order.totalAmount}

                            </td>


                            <td>


                                {
                                    order.status === "PLACED" &&

                                    <span className="badge bg-warning text-dark">
                                        🟡 PLACED
                                    </span>
                                }


                                {
                                    order.status === "CONFIRMED" &&

                                    <span className="badge bg-primary">
                                        🔵 CONFIRMED
                                    </span>
                                }


                                {
                                    order.status === "PACKED" &&

                                    <span className="badge bg-info text-dark">
                                        🟠 PACKED
                                    </span>
                                }


                                {
                                    order.status === "OUT_FOR_DELIVERY" &&

                                    <span className="badge bg-secondary">
                                        🟣 OUT FOR DELIVERY
                                    </span>
                                }


                                {
                                    order.status === "DELIVERED" &&

                                    <span className="badge bg-success">
                                        🟢 DELIVERED
                                    </span>
                                }



                                <select

                                    className="form-select mt-2"

                                    value={order.status}

                                    onChange={(e)=>
                                        handleStatusChange(
                                            order.id,
                                            e.target.value
                                        )
                                    }

                                >

                                    <option value="PLACED">
                                        PLACED
                                    </option>

                                    <option value="CONFIRMED">
                                        CONFIRMED
                                    </option>

                                    <option value="PACKED">
                                        PACKED
                                    </option>

                                    <option value="OUT_FOR_DELIVERY">
                                        OUT_FOR_DELIVERY
                                    </option>

                                    <option value="DELIVERED">
                                        DELIVERED
                                    </option>


                                </select>


                            </td>



                            <td>

                                <button

                                    className="btn btn-danger btn-sm"

                                    onClick={() =>
                                        handleDelete(order.id)
                                    }

                                >

                                    Delete

                                </button>


                            </td>


                        </tr>


                    ))

                }


                </tbody>


            </table>




            {
                totalPages > 1 &&


                <div className="text-center mt-4">


                    <button

                        className="btn btn-secondary me-2"

                        disabled={currentPage === 1}

                        onClick={() =>
                            setCurrentPage(currentPage - 1)
                        }

                    >

                        Previous

                    </button>




                    {

                        Array.from(
                            {length: totalPages},
                            (_,index)=>index+1
                        )
                        .map(page=>(


                            <button

                                key={page}

                                className={
                                    "btn me-2 " +
                                    (
                                        currentPage === page
                                        ?
                                        "btn-primary"
                                        :
                                        "btn-outline-primary"
                                    )
                                }

                                onClick={() =>
                                    setCurrentPage(page)
                                }

                            >

                                {page}

                            </button>


                        ))

                    }



                    <button

                        className="btn btn-secondary"

                        disabled={
                            currentPage === totalPages
                        }

                        onClick={() =>
                            setCurrentPage(currentPage + 1)
                        }

                    >

                        Next

                    </button>


                </div>

            }


        </div>

    );

}


export default ManageOrders;