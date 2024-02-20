// Import necessary libraries and styles
import React from "react";
import Modal from "./Modal";

export function Dialog({ onCancel, onClose, onConfirm, open, texts }) {
  const { cancelText, messageBody, confirmText, title } = texts;

  if (!open) return null;

  return (
    <Modal title={title} open={open} onClose={onCancel}>
      <div className='dialog-content'>
        <p className='dialog-message-body'>{messageBody}</p>
      </div>
      <div className='button-container'>
        {onClose && (
          <div className='custom-button' onClick={onClose}>
            {cancelText || "NO"}
          </div>
        )}
        {onConfirm && (
          <div className='custom-button' onClick={onConfirm}>
            {confirmText || "OK"}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Dialog;
