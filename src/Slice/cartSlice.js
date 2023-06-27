import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    status: "idle",
    error: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action){
            const existingProduct = state.products.find((product) => product.id === action.payload.id);
            if(existingProduct){
                existingProduct.quantity += action.payload.quantity;
            }else {
                state.products.push(action.payload);
            }
        },
        removeProduct(state, action){
            console.log(action.payload);
            state.products = state.products.filter((product) => product.id !== action.payload);
            console.log(state.products);
        }
    }
})

export const {addProduct, removeProduct} = cartSlice.actions;

export default cartSlice.reducer;

// export const getProductCountById = (state, productId) => state.cart.products.filter()