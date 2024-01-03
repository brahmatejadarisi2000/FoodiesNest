
  
import { createSelector } from '@reduxjs/toolkit';
  
const getIsLoading = state => state.loading;

export const getIsLoadingSelector = createSelector([getIsLoading], results => results.isLoading);