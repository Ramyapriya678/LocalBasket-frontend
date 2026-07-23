import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllStores } from "../services/storeService";

import "../styles/stores.css";

function Stores() {

    const navigate = useNavigate();

    const [stores, setStores] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        fetchStores();

    }, []);

    const fetchStores = async () => {

        try {

            const response = await getAllStores();

            setStores(response.data);

        } catch (error) {

            console.error("Store Error:", error);

            setError("Failed to load stores");

        }

    };

    return (

        <div className="stores-page">

            <h2>🛍️ Nearby Stores</h2>

            {
                error &&
                <p className="error">{error}</p>
            }

            <div className="store-grid">

                {
                    stores.length > 0 ?

                        stores.map((store) => (

                            <div
                                className="store-card"
                                key={store.id}
                            >

                                <h3>{store.storeName}</h3>

                                <p>
                                    <strong>Owner:</strong> {store.ownerName}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {store.phoneNumber}
                                </p>

                                <p>
                                    <strong>Address:</strong> {store.address}
                                </p>

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        navigate(`/products/${store.id}`)
                                    }
                                >
                                    View Products
                                </button>

                            </div>

                        ))

                        :

                        <p>No Stores Available</p>
                }

            </div>

        </div>

    );

}

export default Stores;