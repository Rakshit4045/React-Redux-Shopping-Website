import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products/')
    const data = await response.json();
    return data;
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    const response = await fetch('https://fakestoreapi.com/products/' + id,{
        method:"DELETE"
    })
    const data = await response.json();
    return data;
})

const initialState = {
    products: [],
    status: 'idle',
    error: null
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        searchProduct(state, action){
            const { name, category } = action.payload;
            if(category.length !== 0){
                state.products = state.products.filter((product) => {
                    return product.category === category;
                })
            }
            if(name.length !== 0){
                state.products = state.products.filter((product) => {
                    return product.title.toLowerCase().includes(name.toLowerCase());
                })
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.products = state.products.concat(action.payload);
            }).addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const {id} = action.payload;
                state.products = state.products.filter((product) => {
                    return product.id !== id
                })
            })
    }
})

export const {searchProduct} = productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.product.products;

export const selectProductById = (state, productId) => state.product.products.find((product) => {
    return product.id === parseInt(productId);
});