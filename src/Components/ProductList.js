import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, fetchProducts } from "../Slice/productSlice";
import SearchList from "./SearchList";
import { Link } from "react-router-dom";
import { addProduct } from "../Slice/cartSlice";
import { toast } from "react-hot-toast";

export default function ProductList(){
    const products = useSelector(selectAllProducts);
    const status = useSelector((state) => state.product.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchProducts());
        }
    }, [status, dispatch])


    const categorys = [...new Set( products.map(obj => obj.category)) ]
    const productCategorys = categorys.map((category) => (
        <option key={category} value={category}>
            {category}
        </option>
    ))

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [openSearchList, setOpenSearchList] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        let searchResult = null;
        if(category.length !== 0){
            searchResult = products.filter((product) => product.category === category)
        }
        if(name.length !== 0){
            searchResult = products.filter((product) => {
                return product.title.toLowerCase().includes(name.toLowerCase());
            })
        }
        setSearchedProduct(searchResult);
        setOpenSearchList(true);
    }

    const handleClose = () => {
        setOpenSearchList(false);
    }

    const handleBuyProduct = (product) => {
        const newProduct = {...product, quantity: 1};
        dispatch(addProduct(newProduct));
        toast.success("Added to Cart")
    }

    return(
        <div>
            <form className="search-product-form">
                <div className="search-wrapper">
                <i className="bi bi-search"></i>
                <input className="search" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Search Products"></input>
                </div>
                <select className="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Category</option>
                    {productCategorys}
                </select>
                <button className="search-btn" type="submit" onClick={handleSubmit}>Search</button>
                <SearchList openSearchList={openSearchList} searchedProduct={searchedProduct} handleClose={handleClose}></SearchList>
            </form>
            <div className="product-list">
            {
                products.map((product) => {
                    return (
                        <div key={product.id} className="product-wrapper">
                            <Link className="product" to={`/product/${product.id}`}>
                                <div className="stock-check" style={{background: `${product.rating.count > 0 ? "green": "red"}`}}>
                                    { product.rating.count > 0 ? "🥳In Stock" : "😭Out off Stock"}
                                    </div>
                                <p >{product.title}</p>
                                <img alt={`${product.title}`} style={{width: "fit-content", maxWidth: "180px", margin: "1rem", height: "120px"}} src={product.image}></img>
                                <strong>
                                    <p>Price: $ {product.price}</p>
                                    </strong>
                            </Link>
                                <button className="btn" style={{margin: ".5rem"}} onClick={() => {handleBuyProduct(product)}} >Buy</button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}