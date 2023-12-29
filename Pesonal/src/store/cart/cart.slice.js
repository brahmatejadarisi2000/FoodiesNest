import { createSlice } from '@reduxjs/toolkit';
import { initialCart } from './cart.initial';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addItemToCart: (state, action) => {
      const { itemName, itemPrice, restaurantName, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.itemName === itemName && item.restaurantName === restaurantName
      );

      if (existingItemIndex !== -1) {
        if (quantity === 0) {
          state.items.splice(existingItemIndex, 1); // Remove the item if quantity is 0
        } else {
          state.items[existingItemIndex] = action.payload; // Update the existing item
        }
      } else if (quantity !== 0) {
        state.items.push(action.payload); // Add a new item if it doesn't exist
      }

      return state;
    },
    removeItemFromCart: state => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
