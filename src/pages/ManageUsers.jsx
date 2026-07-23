import { useEffect, useState } from "react";

import {
    getAllUsers,
    deleteUser
} from "../services/userService";


function ManageUsers() {


    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    const usersPerPage = 5;



    useEffect(() => {

        loadUsers();

    }, []);



    const loadUsers = async () => {

        try {

            const response = await getAllUsers();

            setUsers(response.data);


        } catch(error) {

            console.error(error);

            alert("Failed to load users");

        }

    };



    const handleDelete = async (id) => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        if(!confirmDelete){

            return;

        }



        try {

            await deleteUser(id);

            alert("User deleted successfully");

            loadUsers();


        } catch(error) {

            console.error(error);

            alert("Failed to delete user");

        }

    };




    const filteredUsers = users.filter((user)=>{


        const firstName =
            user.firstName?.toLowerCase() || "";


        const lastName =
            user.lastName?.toLowerCase() || "";


        const email =
            user.email?.toLowerCase() || "";


        const phone =
            user.phone?.toLowerCase() || "";


        const role =
            user.role?.name?.toLowerCase() || "";



        const searchText =
            search.toLowerCase();



        return (

            firstName.includes(searchText) ||

            lastName.includes(searchText) ||

            email.includes(searchText) ||

            phone.includes(searchText) ||

            role.includes(searchText)

        );


    });




    const indexOfLastUser =
        currentPage * usersPerPage;



    const indexOfFirstUser =
        indexOfLastUser - usersPerPage;



    const currentUsers =
        filteredUsers.slice(
            indexOfFirstUser,
            indexOfLastUser
        );



    const totalPages =
        Math.ceil(
            filteredUsers.length / usersPerPage
        );




    return (

        <div className="container mt-5">


            <h2 className="mb-4">
                Manage Users
            </h2>



            <input

                type="text"

                className="form-control mb-4"

                placeholder="Search by name, email, phone or role..."

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

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Role</th>

                        <th>Action</th>

                    </tr>


                </thead>



                <tbody>


                {

                    currentUsers.map((user)=>(


                        <tr key={user.id}>


                            <td>
                                {user.id}
                            </td>


                            <td>
                                {user.firstName}
                            </td>


                            <td>
                                {user.lastName}
                            </td>


                            <td>
                                {user.email}
                            </td>


                            <td>
                                {user.phone}
                            </td>


                            <td>
                                {user.role?.name}
                            </td>


                            <td>


                                <button

                                    className="btn btn-danger btn-sm"

                                    onClick={() =>
                                        handleDelete(user.id)
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


export default ManageUsers;