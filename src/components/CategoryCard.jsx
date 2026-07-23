import React from "react";


function CategoryCard({image,name}){


return(

<div className="category-card">

<img src={image}/>

<p>{name}</p>


</div>

)

}


export default CategoryCard;