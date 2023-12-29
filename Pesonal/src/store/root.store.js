import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { menuBranchReducer } from './menu-branch/menu-branch.slice';
import { cartReducer } from './cart/cart.slice';
import { dialogReducer } from './dialog/dialog.slice';

export const rootStore = configureStore({
  reducer: {
    cart: cartReducer,
    dialog: dialogReducer,
    menuBranch: menuBranchReducer,
    // Add other reducers if you have them
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, thunk: false }),
});
