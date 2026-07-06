import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    search: "",
    error: "",
    category: "All",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
            state.loading = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        searchProducts: (state, action) => {
            const searchText = action.payload.toLowerCase();

            state.search = action.payload;

            state.filteredProducts = state.products.filter(product =>
                product.title.toLowerCase().includes(searchText)
            );
        },

        filterProducts: (state, action) => {
            const category = action.payload;

            state.category = category;

            if (category === "All") {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    product => product.category === category
                );
            }
        },

        clearProducts: (state) => {
            state.products = [];
            state.filteredProducts = [];
            state.search = "";
            state.category = "All";
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setProducts,
    setLoading,
    searchProducts,
    filterProducts,
    clearProducts,
    setError,
} = productSlice.actions;

export default productSlice.reducer;