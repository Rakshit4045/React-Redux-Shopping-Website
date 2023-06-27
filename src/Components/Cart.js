import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { removeProduct } from "../Slice/cartSlice";

export default function Cart(){
    const cartItems = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const totalAmount = cartItems.reduce((total, product) => product.quantity*product.price + total, 0);

    const handleClick = () => {
        if(cartItems.length > 0){
            toast.success("Order placed Successfully");
        }else{
            toast.error("Please Add Item to Cart")
        }
    }

    const handleRemoveItem = (id) => {
        dispatch(removeProduct(id));
        toast.success("Item removed Successfully",{
            icon: "🗑️"
        });
    }

    return(
        <div className="cart-item-wrapper">
            <p>Subtotal: ${Math.ceil(totalAmount)}</p>
            <button className="proceed-buy-btn" onClick={handleClick} style={{background: "yellow", color: "black"}}>Proceed to Buy</button>
            <div className="item-wrapper">
            {
                cartItems.map((item) => {
                    return(
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.image}></img>
                            <div style={{ height: "100%", display:"flex", flexDirection: "column", alignItems: "start", justifyContent: "space-between", textAlign: "left"}}>
                                <p>{item.title}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                                <p>Total: ${item.price*item.quantity}</p>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove from Cart</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}