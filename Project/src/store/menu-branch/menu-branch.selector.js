import { createSelector } from '@reduxjs/toolkit';

export const getMenuBranch = state => state.menuBranch;

export const getMenuBranchSelector = createSelector(getMenuBranch, results => results);
