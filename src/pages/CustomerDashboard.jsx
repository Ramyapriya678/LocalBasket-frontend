import { useNavigate } from "react-router-dom";


function CustomerDashboard() {


    const navigate = useNavigate();



    return (

        <div className="container mt-5">


            <h1 className="mb-5">
                Welcome to LocalBasket
            </h1>



            <div className="row">


                {/* Stores */}

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center p-4">

                        <h2>
                            🛍️ Stores
                        </h2>

                        <p>
                            Browse nearby stores
                        </p>


                        <button

                            className="btn btn-success"

                            onClick={() =>
                                navigate("/stores")
                            }

                        >

                            View Stores

                        </button>


                    </div>

                </div>





                {/* Products */}

                <div className="col-md-6 mb-4">


                    <div className="card shadow text-center p-4">


                        <h2>
                            🥦 Products
                        </h2>


                        <p>
                            Browse all products
                        </p>


                        <button

                            className="btn btn-primary"

                            onClick={() =>
                                navigate("/products")
                            }

                        >

                            View Products

                        </button>


                    </div>


                </div>





                {/* Cart */}

                <div className="col-md-6 mb-4">


                    <div className="card shadow text-center p-4">


                        <h2>
                            🛒 Cart
                        </h2>


                        <p>
                            View your shopping cart
                        </p>


                        <button

                            className="btn btn-warning"

                            onClick={() =>
                                navigate("/cart")
                            }

                        >

                            Open Cart

                        </button>


                    </div>


                </div>





                {/* Orders */}

                <div className="col-md-6 mb-4">


                    <div className="card shadow text-center p-4">


                        <h2>
                            📦 Orders
                        </h2>


                        <p>
                            Your recent orders
                        </p>


                        <button

                            className="btn btn-info"

                            onClick={() =>
                                navigate("/orders")
                            }

                        >

                            View Orders

                        </button>


                    </div>


                </div>




                {/* Profile */}

                <div className="col-md-6 mb-4">


                    <div className="card shadow text-center p-4">


                        <h2>
                            👤 Profile
                        </h2>


                        <p>
                            Manage your account
                        </p>


                        <button

                            className="btn btn-secondary"

                            onClick={() =>
                                navigate("/profile")
                            }

                        >

                            View Profile

                        </button>


                    </div>


                </div>



                {/* Address */}

                <div className="col-md-6 mb-4">


                    <div className="card shadow text-center p-4">


                        <h2>
                            🏠 Address
                        </h2>


                        <p>
                            Manage delivery addresses
                        </p>


                        <button

                            className="btn btn-dark"

                            onClick={() =>
                                navigate("/addresses")
                            }

                        >

                            Manage Address

                        </button>


                    </div>


                </div>



            </div>


        </div>

    );

}


export default CustomerDashboard;