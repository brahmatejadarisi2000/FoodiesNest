import React from "react";

export default function Modal({ title, open, children }) {
  if (!open) {
    return null;
  }
  return (
    <div className='overlay'>
      <div className='modal'>
        {title && <div className='dialog-title'>{title}</div>}
        {children}
      </div>
    </div>
  );
}
