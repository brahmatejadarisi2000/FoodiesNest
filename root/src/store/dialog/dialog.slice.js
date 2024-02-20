import { createSlice } from '@reduxjs/toolkit';

import { initialDialogModal } from './dialog.initial';

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialDialogModal,
  reducers: {
    setDialogModal: (state, action) => {
      return action.payload;
    },
    closeDialogModal: state => {
      state.open = false;
    },
  },
});

export const { setDialogModal, closeDialogModal } = dialogSlice.actions;

export const dialogReducer = dialogSlice.reducer;
