import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    return (

        <div className="container mt-5">

            <h2>Welcome to LocalBasket 🎉</h2>

            <button
                className="btn btn-primary mt-4"
                onClick={() => navigate("/stores")}
            >
                Browse Stores
            </button>

        </div>

    );

}

export default Dashboard;