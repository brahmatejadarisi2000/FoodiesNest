import React from 'react';

export default function Modal({ title, open, children }) {
  console.log(title);
  if (!open) {
    return null;
  }
  return (
    <div className="overlay">
      <div className="modal">
        {title && <div>{title}</div>}
        {children}
      </div>
    </div>
  );
}
