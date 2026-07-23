import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStores } from "../services/storeService";

function StoreList() {

    const [stores, setStores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {

        try {

            const response = await getAllStores();

            console.log("Full Response:", response);
            console.log("API Data:", response.data);

            setStores(response.data);

        } catch (error) {

            console.error("API Error:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

            alert("Failed to load stores.");

        }

    };

    console.log("Stores State:", stores);

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Available Stores</h2>

            <div className="row">

                {stores.length > 0 ? (

                    stores.map((store) => (

                        <div className="col-md-4 mb-4" key={store.id}>

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {store.storeName}
                                    </h5>

                                    <p>
                                        <strong>Description:</strong><br />
                                        {store.description}
                                    </p>

                                    <p>
                                        <strong>Email:</strong><br />
                                        {store.email}
                                    </p>

                                    <p>
                                        <strong>Phone:</strong><br />
                                        {store.phone}
                                    </p>

                                    <p>
                                        <strong>Status:</strong><br />
                                        {store.status}
                                    </p>

                                   <button
    className="btn btn-success w-100"
    onClick={() =>
        navigate(`/stores/${store.id}/products`)
    }
>
    View Products
</button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="col-12 text-center">

                        <h5>No Stores Available</h5>

                    </div>

                )}

            </div>

        </div>

    );

}

export default StoreList;