import React, { useState } from "react";
import { useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../Slice/productSlice";
import { addProduct } from "../Slice/cartSlice";
import { toast } from "react-hot-toast";


function DecimalStarRating({decimalRating}){

    return(
        <i className="bi bi-star-fill decimal-star">
            <div className="cover" style={{width: `${decimalRating}rem`}}></div>
        </i> 
    )
}

function StarRating({rating}){
    return(
        <>
        {
            new Array(Math.floor(rating)).fill(0).map((_, index) => (
                <i key={index} className="bi bi-star-fill"></i>
            ))
        }
        </>
    )
}

export default function Product(){
    const {productId} = useParams();
    const product = useSelector((state) => selectProductById(state, productId));

    const dispatch = useDispatch();
    const [itemCount, setItemCount] = useState(0);

    const increaseItemCount = () => {
        if(itemCount < product.rating.count)setItemCount(itemCount + 1);
    }
    
    const decreaseItemCount =() => {
        if(itemCount > 0)setItemCount(itemCount - 1);
    }

    const handleAddCart = (product) => {
        if(itemCount > 0){
            const newProduct = {...product, quantity: itemCount};
            dispatch(addProduct(newProduct));
            toast.success("Added to Cart");
        }else {
            toast.error("Please Select the Quantity");
        }
    }

    return(
        <div>
            <h2 className="product-title">{product.title}</h2>
            <div className="product-content">
                <img src={product.image} alt={product.image}></img>
                <div className="product-info-wrapper">
                    <p>{product.description}</p>
                    <div className="product-rating">
                        <p>
                            Rating: {product.rating.rate}
                        </p>
                        <StarRating rating={product.rating.rate}></StarRating>
                        <DecimalStarRating decimalRating={Math.ceil(product.rating.rate) - product.rating.rate}></DecimalStarRating>
                    </div>
                    <p>Qty: {product.rating.count}</p>
                    <strong>
                        <p>Price: {product.price}</p>
                    </strong>
                    <div className="quantity-wrapper">
                        <i className="bi bi-plus" onClick={increaseItemCount}></i>
                        <p>{itemCount}</p>
                        <i className="bi bi-dash" onClick={decreaseItemCount}></i>
                    </div>
                    <button className="btn" onClick={() => handleAddCart(product)}>Add to Cart</button>
                </div>
                
            </div>
        </div>
    )
}