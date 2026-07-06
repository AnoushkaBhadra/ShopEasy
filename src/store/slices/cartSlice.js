import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    items: [], 
    total: 0,
}

const cartSlice = createSlice({
    name: "cart", 
    initialState, 
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find( item => item.id === product.id);
            if(existingItem) { 
                existingItem.quantity+=1; 
            }
            else{
                state.items.push({
                    ...product, 
                    quantity: 1,
                })
            }

            state.total+= product.price;
        }, 
        removeFromCart: (state, action) => {
            const id = action.payload;

            const item = state.items.find(item => item.id === product.id);
            if(!item) return ; 

            state.total -= item.price * item.quantity;

            state.items = state.items.filter( item => item.id !== id);
        }, 

        increaseQuantity: (state, action) => {
            const id = action.payload; 
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity += 1;
                state.total += item.price;
            }
        }, 

        decreaseQuantity: (state, action) => {
            const id = action.payload;

            const item = state.items.find(item => item.id === id);

            if (!item) return;

            item.quantity -= 1;
            state.total -= item.price;

            if (item.quantity === 0) {
                state.items = state.items.filter(
                    item => item.id !== id
                );
            }
        }, 
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    }  
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;