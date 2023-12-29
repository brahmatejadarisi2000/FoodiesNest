import { createSelector } from '@reduxjs/toolkit';

const getDialogModalData = state => state.dialog;

export const getDialogModalDataSelector = createSelector(getDialogModalData, results => results);
