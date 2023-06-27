import React from "react";
import { Link } from "react-router-dom";

function SearchProduct({searchedProduct}){
    return(
        <div className="search-product-wrapper">
            {
                searchedProduct.map((product) => {
                    return(
                        <Link to={`/product/${product.id}`} key={product.id}>
                            <div className="search-product">
                                <img alt={product.image} className="search-product-img" src={product.image}></img>
                                <div className="search-product-title">{product.title}</div>
                                <div className="search-product-price">$ {product.price}</div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default function SearchList({openSearchList, searchedProduct, handleClose}){

    return(
        <>
        {
            openSearchList === true ? ( 
                <div className="search-list">
                    <i onClick={() => {handleClose()}} className="bi bi-x-circle-fill search-list-cancel"></i>
                    {
                        searchedProduct ? 
                        (<SearchProduct searchedProduct={searchedProduct}></SearchProduct>):
                        (<p>No Product Found</p>)
                    }
                </div>
            )
            :
            null
        }
        </>
    )
}