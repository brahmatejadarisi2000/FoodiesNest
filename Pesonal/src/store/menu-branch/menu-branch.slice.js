import { createSlice } from '@reduxjs/toolkit';
import { initialMenuBranch } from './menu-branch.initial';

export const menuBranchSlice = createSlice({
  name: 'menuBranch',
  initialState: initialMenuBranch,
  reducers: {
    setMenuBranch: (state, action) => action.payload,
    setSelectedCategory: (state, action) => ({ ...state, selectedCategory: action.payload }),
    setIsOpen: (state, action) => ({ ...state, isOpen: action.payload }),
  },
});

export const { setMenuBranch, setSelectedCategory, setIsOpen } = menuBranchSlice.actions;

export const menuBranchReducer = menuBranchSlice.reducer;
