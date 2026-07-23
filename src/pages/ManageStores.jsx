import { useEffect, useState } from "react";

import {
    getAllStores,
    deleteStore
} from "../services/storeService";


function ManageStores() {


    const [stores, setStores] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    const storesPerPage = 5;



    useEffect(() => {

        loadStores();

    }, []);



    const loadStores = async () => {

        try {

            const response = await getAllStores();

            setStores(response.data);


        } catch(error) {

            console.error(error);

            alert("Failed to load stores");

        }

    };



    const handleDelete = async (id) => {


        if(!window.confirm("Delete this store?")){

            return;

        }



        try {

            await deleteStore(id);

            alert("Store deleted successfully");

            loadStores();


        } catch(error) {

            console.error(error);

            alert("Failed to delete store");

        }

    };




    const filteredStores = stores.filter((store)=>{


        const storeName =
            store.storeName?.toLowerCase() || "";


        const owner =
            `${store.owner?.firstName || ""} ${store.owner?.lastName || ""}`
            .toLowerCase();


        const email =
            store.email?.toLowerCase() || "";


        const phone =
            store.phone?.toLowerCase() || "";


        const status =
            store.status?.toLowerCase() || "";



        const searchText =
            search.toLowerCase();



        return (

            storeName.includes(searchText) ||

            owner.includes(searchText) ||

            email.includes(searchText) ||

            phone.includes(searchText) ||

            status.includes(searchText)

        );


    });




    const indexOfLastStore =
        currentPage * storesPerPage;


    const indexOfFirstStore =
        indexOfLastStore - storesPerPage;


    const currentStores =
        filteredStores.slice(
            indexOfFirstStore,
            indexOfLastStore
        );


    const totalPages =
        Math.ceil(
            filteredStores.length / storesPerPage
        );




    return (

        <div className="container mt-5">


            <h2 className="mb-4">
                Manage Stores
            </h2>



            <input

                type="text"

                className="form-control mb-4"

                placeholder="Search by store name, owner, email, phone or status..."

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

                        <th>Store Name</th>

                        <th>Owner</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>



                <tbody>


                {

                    currentStores.map((store)=>(


                        <tr key={store.id}>


                            <td>
                                {store.id}
                            </td>


                            <td>
                                {store.storeName}
                            </td>


                            <td>
                                {store.owner?.firstName}{" "}
                                {store.owner?.lastName}
                            </td>


                            <td>
                                {store.email}
                            </td>


                            <td>
                                {store.phone}
                            </td>


                            <td>


                                {
                                    store.status === "APPROVED" &&

                                    <span className="badge bg-success">
                                        APPROVED
                                    </span>
                                }


                                {
                                    store.status === "PENDING" &&

                                    <span className="badge bg-warning text-dark">
                                        PENDING
                                    </span>
                                }


                                {
                                    store.status === "REJECTED" &&

                                    <span className="badge bg-danger">
                                        REJECTED
                                    </span>
                                }


                            </td>


                            <td>

                                <button

                                    className="btn btn-danger btn-sm"

                                    onClick={() =>
                                        handleDelete(store.id)
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


export default ManageStores;