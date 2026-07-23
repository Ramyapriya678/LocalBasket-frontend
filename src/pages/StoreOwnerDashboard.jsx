import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


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
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            console.log("Dashboard Data:", response.data);


            setDashboard(response.data);


            localStorage.setItem(
                "storeId",
                response.data.storeId
            );


        }
        catch(error) {

            console.log(
                "Dashboard Error:",
                error
            );

        }

    };



    if(!dashboard){

        return (

            <h3 className="text-center mt-5">
                Loading...
            </h3>

        );

    }



    return (

        <div className="container mt-5">


            <h2 className="mb-4">
                Store Owner Dashboard
            </h2>



            {/* Navigation Buttons */}

            <div className="mb-4">


                <Link
                    to="/store-owner-dashboard"
                    className="btn btn-primary me-3"
                >
                    Dashboard
                </Link>



                <Link
                    to="/add-store-product"
                    className="btn btn-success me-3"
                >
                    Add Products
                </Link>



                <Link
                    to="/my-store-products"
                    className="btn btn-warning me-3"
                >
                    My Products
                </Link>



                <Link
                    to="/store-orders"
                    className="btn btn-info"
                >
                    Orders
                </Link>


            </div>





            <div className="row">



                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h5>
                            Store Name
                        </h5>

                        <h3>
                            {dashboard.storeName}
                        </h3>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h5>
                            Total Products
                        </h5>

                        <h3>
                            {dashboard.totalProducts}
                        </h3>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h5>
                            Available Products
                        </h5>

                        <h3>
                            {dashboard.availableProducts}
                        </h3>

                    </div>

                </div>


            </div>





            <div className="row mt-4">


                <div className="col-md-4">

                    <div className="card shadow p-4">


                        <h5>
                            Out Of Stock
                        </h5>


                        <h3>
                            {dashboard.outOfStockProducts}
                        </h3>


                    </div>

                </div>


            </div>






            <div className="row mt-4">



                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h5>
                            Total Orders
                        </h5>

                        <h3>
                            {dashboard.totalOrders}
                        </h3>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h5>
                            Pending Orders
                        </h5>

                        <h3>
                            {dashboard.pendingOrders}
                        </h3>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h5>
                            Completed Orders
                        </h5>

                        <h3>
                            {dashboard.completedOrders}
                        </h3>

                    </div>

                </div>


            </div>






            <div className="row mt-4">


                <div className="col-md-4">


                    <div className="card shadow p-4">


                        <h5>
                            Total Revenue
                        </h5>


                        <h3>
                            ₹ {dashboard.totalRevenue}
                        </h3>


                    </div>


                </div>


            </div>



        </div>

    );

}


export default StoreOwnerDashboard;