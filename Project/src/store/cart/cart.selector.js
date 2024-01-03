import { createSelector } from '@reduxjs/toolkit';

export const getCartItems = state => state.cart;

export const getCartItemsSelector = createSelector(getCartItems, results => results.items);

export const getCartPriceSelector = createSelector(getCartItems, results => {
  if (results.items) {
    // Use reduce only if results is defined
    return results.items.reduce((acc, item) => acc + (item.quantity * item.itemPrice) / 1000, 0);
  } else {
    // If results is undefined, return a default value or handle the situation accordingly
    return 0; // Default to 0, for example
  }
});

export const getCartCountSelector = createSelector(getCartItems, results => {
  // Check if results is defined
  if (results.items) {
    // Use reduce only if results is defined
    return results.items.reduce((acc, item) => acc + item.quantity, 0);
  } else {
    // If results is undefined, return a default value or handle the situation accordingly
    return 0; // Default to 0, for example
  }
});
