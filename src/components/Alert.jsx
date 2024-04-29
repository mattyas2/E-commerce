/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Alert = ({ message, type = 'error', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Cambiado a 5000 milisegundos (5 segundos)

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const alertClasses = `fixed top-0 left-0 w-[96%] z-50 mx-10 mt-2 max-sm:mx-0 ${
    isVisible ? 'block' : 'hidden'
  } ${type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
    px-4 py-2 md:py-4 md:px-6 rounded-xl shadow-md`;
  return (
    <div
      className={alertClasses}
      role="alert"
    
    >
      <p className="flex justify-between items-center ">
        {message}
        <svg
          onClick={handleClose}
          className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
        </svg>
      </p>
    </div>
  );
};

export default Alert;
