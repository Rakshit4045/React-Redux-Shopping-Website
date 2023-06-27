import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Product from './Components/Product';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import {useSelector} from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function App() {
  const cartSize = useSelector((state) => state.cart.products.reduce((total, product) => product.quantity + total, 0));

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="App">
      <Toaster 
        position="top-center"></Toaster>
      <Router>
      <nav className='navbar'>
        <div><strong>
          <Link to="/" style={{color: "white"}}>
          Shopper's Stop
          </Link>
          </strong></div>
        <div>
          <Link to="/cart" style={{color: "white"}}>
            <i className="bi bi-bag-fill cart-size">
              <span>{cartSize}</span>
            </i>
          </Link>
        </div>
      </nav>
        <Routes>
          <Route path="/" element={<ProductList></ProductList>}></Route>
          <Route path="/product/:productId" element={<Product></Product>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </Router>
      <i onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}} className="bi bi-arrow-up up-btn"></i>
    </div>
  );
}

export default App;
