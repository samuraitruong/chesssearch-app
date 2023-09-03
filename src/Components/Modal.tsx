import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
export function Modal({ children, onClose }: any) {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'hidden';
    return () => {
      const body = document.querySelector('body');
      if (body) body.style.overflow = 'auto';
    };
  }, []);
  const handleClose = () => {
    // Call the onClose function when the modal is closed
    onClose();
  };
  return (
    <div className="modal-container">
      <div className="modal-content">
        <a className="close-button" onClick={handleClose}>
          <AiOutlineClose />
        </a>

        {children}
      </div>
    </div>
  );
}
