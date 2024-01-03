import React from 'react';

import { getDialogModalDataSelector } from '../store/dialog/dialog.selector';
import { useSelector } from 'react-redux';
import Dialog from '../components/dialog';

export function FeaturesDialog() {
  const dialogProps = useSelector(getDialogModalDataSelector);

  if (!dialogProps.open) return null;

  return <Dialog {...dialogProps} />;
}

export default FeaturesDialog;
