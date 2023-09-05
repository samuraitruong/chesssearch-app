import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
export function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'hidden';
    return () => {
      const body = document.querySelector('body');
      if (body) body.style.overflow = 'auto';
    };
  }, []);
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-7 rounded-lg shadow-lg bg-white">
        <a
          className="close-button absolute top-3 right-3 text-lg cursor-pointer hover:text-red-500"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </a>

        {children}
      </div>
    </div>
  );
}
