import { createSlice } from '@reduxjs/toolkit';

import { initialLoadingModal } from './loading.initial';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingModal,
  reducers: {
    setLoading: (state, action) => {
     state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
