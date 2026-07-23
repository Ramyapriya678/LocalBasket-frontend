import { useEffect, useState } from "react";

import {
    getAllProducts,
    deleteProduct
} from "../services/productService";


function ManageProducts() {


    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    const productsPerPage = 5;



    useEffect(() => {

        loadProducts();

    }, []);



    const loadProducts = async () => {

        try {

            const response = await getAllProducts();

            setProducts(response.data);


        } catch(error) {

            console.error(error);

            alert("Failed to load products");

        }

    };



    const handleDelete = async (id) => {


        if(!window.confirm("Delete this product?")){

            return;

        }



        try {

            await deleteProduct(id);

            alert("Product deleted successfully");

            loadProducts();


        } catch(error) {

            console.error(error);

            alert("Failed to delete product");

        }

    };




    const filteredProducts = products.filter((product)=>{


        const name =
            product.productName?.toLowerCase() || "";


        const category =
            product.category?.categoryName?.toLowerCase() || "";


        const description =
            product.description?.toLowerCase() || "";



        const searchText =
            search.toLowerCase();



        return (

            name.includes(searchText) ||

            category.includes(searchText) ||

            description.includes(searchText)

        );


    });




    const indexOfLastProduct =
        currentPage * productsPerPage;


    const indexOfFirstProduct =
        indexOfLastProduct - productsPerPage;


    const currentProducts =
        filteredProducts.slice(
            indexOfFirstProduct,
            indexOfLastProduct
        );



    const totalPages =
        Math.ceil(
            filteredProducts.length / productsPerPage
        );




    return (

        <div className="container mt-5">


            <h2 className="mb-4">
                Manage Products
            </h2>



            <input

                type="text"

                className="form-control mb-4"

                placeholder="Search by product name, category or description..."

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

                        <th>Product Name</th>

                        <th>Category</th>

                        <th>Description</th>

                        <th>Action</th>

                    </tr>

                </thead>



                <tbody>


                {

                    currentProducts.map((product)=>(


                        <tr key={product.id}>


                            <td>
                                {product.id}
                            </td>


                            <td>
                                {product.productName}
                            </td>


                            <td>
                                {product.category?.categoryName}
                            </td>


                            <td>
                                {product.description}
                            </td>


                            <td>

                                <button

                                    className="btn btn-danger btn-sm"

                                    onClick={() =>
                                        handleDelete(product.id)
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


export default ManageProducts;