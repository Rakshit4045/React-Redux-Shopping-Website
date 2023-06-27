import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slice/cartSlice';
import productReducer from './Slice/productSlice';

export default configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer
    },
})