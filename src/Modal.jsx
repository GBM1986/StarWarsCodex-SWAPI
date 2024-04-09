// Modal.jsx
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-close-btn">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
